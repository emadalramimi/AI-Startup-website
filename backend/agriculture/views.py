from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .agriculture_vision import AgricultureVisionAnalyzer
import base64
from PIL import Image
import io

@method_decorator(csrf_exempt, name='dispatch')
class AgricultureAnalysisView(APIView):
    def __init__(self):
        super().__init__()
        self.analyzer = AgricultureVisionAnalyzer()

    def post(self, request):
        try:
            image_data = request.data.get('image')
            analysis_type = request.data.get('type', 'plant-disease')

            if not image_data:
                return Response(
                    {'error': 'No image provided'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Process the image based on the analysis type
            if analysis_type == 'plant-disease':
                results = self.analyzer.analyze_plant_disease(image_data)
            elif analysis_type == 'crop-health':
                results = self.analyzer.analyze_crop_health(image_data)
            elif analysis_type == 'weed-detection':
                results = self.analyzer.detect_weeds(image_data)
            elif analysis_type == 'irrigation':
                results = self.analyzer.analyze_irrigation(image_data)
            else:
                return Response(
                    {'error': 'Invalid analysis type'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response(results, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"Error in analyze_plant_disease: {str(e)}")  # Debug log
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
