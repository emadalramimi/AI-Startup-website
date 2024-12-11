from rest_framework import serializers
from core.models import Service, CaseStudy, TeamMember, ContactMessage

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'description', 'icon', 'created_at', 'updated_at']
        read_only_fields = ['slug', 'created_at', 'updated_at']

class CaseStudySerializer(serializers.ModelSerializer):
    class Meta:
        model = CaseStudy
        fields = ['id', 'title', 'slug', 'description', 'challenge', 'solution', 
                 'results', 'image', 'client_name', 'client_industry', 
                 'created_at', 'updated_at']
        read_only_fields = ['slug', 'created_at', 'updated_at']

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = ['id', 'name', 'position', 'bio', 'image', 'linkedin_url', 
                 'github_url', 'order', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'company', 'message', 'created_at', 'is_read']
        read_only_fields = ['created_at', 'is_read']