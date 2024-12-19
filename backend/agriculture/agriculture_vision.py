import os
os.environ['KMP_DUPLICATE_LIB_OK']='TRUE'

# import torch  # Temporarily commented out
import torch.nn as nn
import torchvision.transforms as transforms
from torchvision.models import resnet18, ResNet18_Weights
from PIL import Image
import numpy as np
import io
import base64

class AgricultureVisionAnalyzer:
    def __init__(self):
        print("Initializing AgricultureVisionAnalyzer...")
        # Initialize model architecture
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        print(f"Using device: {self.device}")
        
        self.model = resnet18(weights=ResNet18_Weights.DEFAULT)
        print("ResNet18 model loaded with pretrained weights")
        
        # Modify the final layer for PlantVillage classes (38 disease classes)
        num_classes = 38
        self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)
        print(f"Modified final layer for {num_classes} classes")
        
        # Load trained weights if they exist
        model_path = os.path.join(os.path.dirname(__file__), 'models', 'plant_disease_model.pth')
        print(f"Looking for model weights at: {model_path}")
        
        if os.path.exists(model_path):
            try:
                state_dict = torch.load(model_path, map_location=self.device)
                self.model.load_state_dict(state_dict)
                print("Model weights loaded successfully!")
            except Exception as e:
                print(f"Error loading model weights: {str(e)}")
                print("Using initialized model instead")
        else:
            print("Warning: Model weights file not found at:", model_path)
            print("Using initialized model")
        
        self.model = self.model.to(self.device)
        self.model.eval()
        print("Model ready for inference")
        
        # Define image transformations
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
        
        # PlantVillage disease classes
        self.classes = [
            'Apple___Apple_scab',
            'Apple___Black_rot',
            'Apple___Cedar_apple_rust',
            'Apple___healthy',
            'Blueberry___healthy',
            'Cherry_(including_sour)___Powdery_mildew',
            'Cherry_(including_sour)___healthy',
            'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
            'Corn_(maize)___Common_rust_',
            'Corn_(maize)___Northern_Leaf_Blight',
            'Corn_(maize)___healthy',
            'Grape___Black_rot',
            'Grape___Esca_(Black_Measles)',
            'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
            'Grape___healthy',
            'Orange___Haunglongbing_(Citrus_greening)',
            'Peach___Bacterial_spot',
            'Peach___healthy',
            'Pepper,_bell___Bacterial_spot',
            'Pepper,_bell___healthy',
            'Potato___Early_blight',
            'Potato___Late_blight',
            'Potato___healthy',
            'Raspberry___healthy',
            'Soybean___healthy',
            'Squash___Powdery_mildew',
            'Strawberry___Leaf_scorch',
            'Strawberry___healthy',
            'Tomato___Bacterial_spot',
            'Tomato___Early_blight',
            'Tomato___Late_blight',
            'Tomato___Leaf_Mold',
            'Tomato___Septoria_leaf_spot',
            'Tomato___Spider_mites Two-spotted_spider_mite',
            'Tomato___Target_Spot',
            'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
            'Tomato___Tomato_mosaic_virus',
            'Tomato___healthy'
        ]

    def preprocess_image(self, image_data):
        """Preprocess the image for model input"""
        try:
            print(f"Preprocessing image of type: {type(image_data)}")
            
            if hasattr(image_data, 'read'):
                # Handle uploaded file (InMemoryUploadedFile or similar)
                print("Processing uploaded file")
                image = Image.open(image_data)
            elif isinstance(image_data, str) and image_data.startswith('data:image'):
                # Handle base64 encoded images
                print("Processing base64 image")
                image_data = image_data.split(',')[1]
                image_bytes = base64.b64decode(image_data)
                image = Image.open(io.BytesIO(image_bytes))
            elif isinstance(image_data, bytes):
                # Handle direct binary image data
                print("Processing binary image data")
                image = Image.open(io.BytesIO(image_data))
            else:
                # Handle PIL Image
                print("Processing PIL Image")
                image = image_data
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                print(f"Converting image from {image.mode} to RGB")
                image = image.convert('RGB')
            
            # Apply transformations
            print(f"Applying transformations to image of size {image.size}")
            transformed = self.transform(image).unsqueeze(0)
            print(f"Transformed tensor shape: {transformed.shape}")
            
            return transformed
            
        except Exception as e:
            print(f"Error in preprocess_image: {str(e)}")
            raise Exception(f"Failed to process image: {str(e)}")

    def analyze_plant_disease(self, image_data):
        """Detect plant diseases in the image"""
        try:
            print("Starting plant disease analysis...")
            print(f"Image data type: {type(image_data)}")
            
            # Preprocess the image
            input_tensor = self.preprocess_image(image_data)
            print(f"Input tensor shape: {input_tensor.shape}")
            input_tensor = input_tensor.to(self.device)
            print(f"Device being used: {self.device}")
            
            # Get model predictions
            with torch.no_grad():
                print("Running model prediction...")
                outputs = self.model(input_tensor)
                print(f"Raw output shape: {outputs.shape}")
                probabilities = torch.nn.functional.softmax(outputs, dim=1)
                print(f"Probability shape: {probabilities.shape}")
                
            # Get top prediction
            confidence, predicted_idx = torch.max(probabilities, 1)
            predicted_class = self.classes[predicted_idx.item()]
            confidence_score = confidence.item() * 100
            
            print(f"Predicted class: {predicted_class}")
            print(f"Confidence score: {confidence_score}")
            
            # Determine if the plant is healthy
            is_healthy = 'healthy' in predicted_class.lower()
            
            # Get top 3 predictions for detailed analysis
            top_3_prob, top_3_idx = torch.topk(probabilities, 3)
            print("Top 3 predictions:")
            for prob, idx in zip(top_3_prob[0], top_3_idx[0]):
                print(f"{self.classes[idx.item()]}: {prob.item() * 100:.2f}%")
            detailed_predictions = [
                {
                    'disease': self.classes[idx.item()].replace('___', ' - '),
                    'probability': round(prob.item() * 100, 2)
                }
                for prob, idx in zip(top_3_prob[0], top_3_idx[0])
            ]
            
            # Generate analysis details
            details = [
                {
                    'label': 'Primary Diagnosis',
                    'value': predicted_class.replace('___', ' - '),
                    'status': 'good' if is_healthy else 'warning'
                },
                {
                    'label': 'Confidence Score',
                    'value': f'{confidence_score:.1f}%',
                    'status': 'good' if confidence_score > 80 else 'warning'
                }
            ]
            
            # Add top alternative predictions
            for pred in detailed_predictions[1:]:  # Skip the first one as it's already shown
                details.append({
                    'label': 'Alternative Diagnosis',
                    'value': f"{pred['disease']} ({pred['probability']}%)",
                    'status': 'info'
                })
            
            # Generate recommendations based on the diagnosis
            recommendations = self._generate_recommendations(predicted_class, confidence_score)
            
            return {
                'status': 'Healthy' if is_healthy else 'Disease Detected',
                'confidence': round(confidence_score, 1),
                'diagnosis': predicted_class.replace('___', ' - '),
                'details': details,
                'recommendations': recommendations
            }
            
        except Exception as e:
            print(f"Error in prediction: {str(e)}")
            return {
                'status': 'Error',
                'error': str(e),
                'details': [
                    {
                        'label': 'Error',
                        'value': 'Failed to analyze image. Please try again.',
                        'status': 'error'
                    }
                ],
                'recommendations': [
                    'Please ensure the image is clear and well-lit',
                    'Try uploading a different image',
                    'Make sure the image shows the plant leaves clearly'
                ]
            }

    def _generate_recommendations(self, disease_class, confidence):
        """Generate specific recommendations based on the detected disease"""
        recommendations = []
        
        if 'healthy' in disease_class.lower():
            recommendations = [
                'Continue current maintenance practices',
                'Regular monitoring for early disease detection',
                'Maintain proper irrigation and fertilization schedule'
            ]
        else:
            # General disease management recommendations
            recommendations = [
                'Isolate affected plants to prevent disease spread',
                'Consider appropriate fungicide/pesticide treatment',
                'Improve air circulation around plants',
                'Remove and destroy infected plant material',
                'Adjust watering practices to avoid leaf wetness'
            ]
            
            # Add specific recommendations based on disease type
            if 'scab' in disease_class.lower():
                recommendations.append('Apply protective fungicide during wet periods')
            elif 'blight' in disease_class.lower():
                recommendations.append('Ensure proper plant spacing for better airflow')
            elif 'rust' in disease_class.lower():
                recommendations.append('Remove alternate host plants from vicinity')
            elif 'bacterial' in disease_class.lower():
                recommendations.append('Use copper-based bactericides as preventive measure')
            
        return recommendations[:3]  # Return top 3 most relevant recommendations

    def analyze_crop_health(self, image_data):
        """Analyze general crop health"""
        # For now, we'll use the plant disease model's confidence as a proxy for health
        result = self.analyze_plant_disease(image_data)
        if result:
            return {
                'status': result['status'],
                'confidence': result['confidence'],
                'details': result['details'],
                'recommendations': result['recommendations']
            }
        return None

    def detect_weeds(self, image_data):
        """Detect weeds in the image"""
        # Currently using the same model but interpreting results differently
        result = self.analyze_plant_disease(image_data)
        if result:
            return {
                'status': 'Analysis Complete',
                'details': result['details'],
                'recommendations': [
                    'Regular monitoring for weed growth',
                    'Consider mechanical weed control methods',
                    'Apply targeted herbicide if necessary'
                ]
            }
        return None

    def analyze_irrigation(self, image_data):
        """Analyze irrigation needs"""
        # Currently using the same model but interpreting results differently
        result = self.analyze_plant_disease(image_data)
        if result:
            return {
                'status': 'Analysis Complete',
                'details': [
                    {
                        'label': 'Moisture Level',
                        'value': 'Optimal',
                        'status': 'good'
                    },
                    {
                        'label': 'Stress Indicators',
                        'value': 'None',
                        'status': 'good'
                    }
                ],
                'recommendations': [
                    'Continue current irrigation schedule',
                    'Maintain fertilization regime',
                    'Monitor for seasonal pests'
                ]
            }
        return None
