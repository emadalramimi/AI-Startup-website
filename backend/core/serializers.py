from rest_framework import serializers
from .models import Service, CaseStudy, TeamMember, ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'company', 'message', 'created_at', 'is_read']
        read_only_fields = ['created_at', 'is_read']
