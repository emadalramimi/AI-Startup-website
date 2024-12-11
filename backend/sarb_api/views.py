from django.shortcuts import render
from rest_framework import viewsets, permissions
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
    lookup_field = 'slug'
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
