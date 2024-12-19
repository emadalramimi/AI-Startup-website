from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import CaseStudy
from .serializers import CaseStudySerializer
from rest_framework.parsers import MultiPartParser, FormParser
import json
from rest_framework.exceptions import ValidationError
from rest_framework import serializers

# Create your views here.

class CaseStudyViewSet(viewsets.ModelViewSet):
    queryset = CaseStudy.objects.all()
    serializer_class = CaseStudySerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        try:
            # Log full request data for debugging
            print("\n=== Case Study Creation Request ===")
            print("Full Request Data:", dict(request.data))
            print("Request FILES:", request.FILES)
            
            # Create serializer with processed data
            serializer = self.get_serializer(data=request.data)
            
            # Detailed validation check
            try:
                serializer.is_valid(raise_exception=True)
            except serializers.ValidationError as ve:
                print("\n=== Validation Errors ===")
                print("Detailed Errors:", ve.detail)
                return Response(
                    {
                        "status": "error",
                        "message": "Validation error",
                        "errors": ve.detail,
                        "received_data": dict(request.data)
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Proceed with creation if valid
            self.perform_create(serializer)
            
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        
        except Exception as e:
            print("\n=== Unexpected Error ===")
            import traceback
            print(traceback.format_exc())
            return Response(
                {
                    "status": "error",
                    "message": str(e),
                    "traceback": traceback.format_exc()
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get_object(self):
        """
        Returns the object the view is displaying.
        """
        queryset = self.get_queryset()
        # Lookup by ID
        obj = get_object_or_404(queryset, id=self.kwargs.get('pk'))
        self.check_object_permissions(self.request, obj)
        return obj

    def update(self, request, *args, **kwargs):
        try:
            # Get the case study instance
            instance = self.get_object()
            
            # Create serializer with processed data
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            
            # Handle image upload during update
            if 'image' in request.FILES:
                serializer.validated_data['image'] = request.FILES['image']
            
            self.perform_update(serializer)
            return Response(serializer.data)
        except Exception as e:
            print(f"Error updating case study: {str(e)}")  # Add logging
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def perform_update(self, serializer):
        # Save the instance with the updated data
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        except CaseStudy.DoesNotExist:
            return Response(
                {"detail": "Case study not found"},
                status=status.HTTP_404_NOT_FOUND
            )
