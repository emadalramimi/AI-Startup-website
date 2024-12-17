from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from core.models import Service, CaseStudy, TeamMember, ContactMessage
from .serializers import (
    ServiceSerializer, CaseStudySerializer,
    TeamMemberSerializer, ContactMessageSerializer
)
from drf_spectacular.utils import extend_schema, OpenApiParameter

@extend_schema(tags=['services'])
class ServiceViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing AI/ML services.
    
    list:
        Get a list of all available services.
    
    retrieve:
        Get detailed information about a specific service.
        
    create:
        Create a new service (admin only).
        
    update:
        Update an existing service (admin only).
        
    delete:
        Delete a service (admin only).
    """
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    lookup_field = 'pk'  # Change to primary key (ID) lookup
    lookup_value_regex = r'\d+'  # Ensure only numeric IDs are accepted
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@extend_schema(tags=['case-studies'])
class CaseStudyViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing case studies.
    
    list:
        Get a list of all case studies.
    
    retrieve:
        Get detailed information about a specific case study.
        
    create:
        Create a new case study (admin only).
        
    update:
        Update an existing case study (admin only).
        
    delete:
        Delete a case study (admin only).
    """
    queryset = CaseStudy.objects.all()
    serializer_class = CaseStudySerializer
    lookup_field = 'slug'
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

@extend_schema(tags=['team'])
class TeamMemberViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing team members.
    
    list:
        Get a list of all team members.
    
    retrieve:
        Get detailed information about a specific team member.
        
    create:
        Add a new team member (admin only).
        
    update:
        Update an existing team member's information (admin only).
        
    delete:
        Remove a team member (admin only).
    """
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, request, *args, **kwargs):
        print("Received data:", request.data)
        print("Received files:", request.FILES)
        try:
            # Handle the image file separately if it exists
            image = request.FILES.get('image')
            data = request.data.dict() if hasattr(request.data, 'dict') else request.data
            
            if image:
                data['image'] = image
            
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            print("Error creating team member:", str(e))
            return Response(
                {"error": True, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

    def update(self, request, *args, **kwargs):
        print("Update data:", request.data)
        print("Update files:", request.FILES)
        try:
            instance = self.get_object()
            
            # Convert request data to mutable dictionary
            data = request.data.dict() if hasattr(request.data, 'dict') else dict(request.data)
            
            # Handle image file
            if 'image' in request.FILES:
                data['image'] = request.FILES['image']
            elif 'image' in data and not data['image']:
                # If image field is empty, remove it to keep existing image
                data.pop('image')
            
            # Remove empty fields
            data = {k: v for k, v in data.items() if v not in [None, '', 'undefined', 'null']}
            
            print("Processed data for update:", data)
            
            serializer = self.get_serializer(instance, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            
            return Response(serializer.data)
        except Exception as e:
            print("Error updating team member:", str(e))
            return Response(
                {"error": True, "message": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

@extend_schema(tags=['contact'])
class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing contact messages.
    
    list:
        Get a list of all contact messages (admin only).
    
    create:
        Submit a new contact message (public).
        
    retrieve:
        Get details of a specific message (admin only).
        
    update:
        Update message status (admin only).
        
    delete:
        Delete a message (admin only).
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAdminUser()]
