import os
os.environ['KMP_DUPLICATE_LIB_OK']='TRUE'

import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from torchvision.models import resnet18, ResNet18_Weights

def create_model():
    print("Creating plant disease detection model...")
    
    # Create models directory if it doesn't exist
    model_dir = os.path.join(os.path.dirname(__file__), 'models')
    os.makedirs(model_dir, exist_ok=True)
    output_path = os.path.join(model_dir, 'plant_disease_model.pth')

    # Initialize model with pretrained weights
    model = resnet18(weights=ResNet18_Weights.DEFAULT)
    
    # Modify the final layer for our classes (38 plant disease classes)
    num_classes = 38
    model.fc = nn.Linear(model.fc.in_features, num_classes)
    
    # Move model to GPU if available
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    model = model.to(device)
    
    # Save the model
    try:
        torch.save(model.state_dict(), output_path)
        print(f"Model successfully created and saved to: {output_path}")
        
        # Verify the model file
        if os.path.exists(output_path) and os.path.getsize(output_path) > 0:
            print("Model file verification successful!")
            return True
    except Exception as e:
        print(f"Error saving model: {str(e)}")
        return False

if __name__ == "__main__":
    create_model()
