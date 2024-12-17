from rest_framework import serializers
from django.utils.text import slugify
from .models import CaseStudy
import json

class CaseStudySerializer(serializers.ModelSerializer):
    slug = serializers.CharField(required=False)  # Make slug optional
    order = serializers.IntegerField(required=False)
    client_name = serializers.CharField(required=True)  # Make client name required
    client_industry = serializers.CharField(required=True)  # Make client industry required
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = CaseStudy
        fields = ['id', 'title', 'slug', 'description', 'client_name', 'client_industry',
                 'challenge', 'solution', 'results', 'image', 'order']

    def to_internal_value(self, data):
        # Create a mutable copy of the data
        mutable_data = data.copy() if hasattr(data, 'copy') else dict(data)
        
        return super().to_internal_value(mutable_data)

    def validate(self, data):
        # Generate slug from title if not provided
        if 'title' in data and not data.get('slug'):
            data['slug'] = slugify(data['title'])

        # Set default order if not provided
        if 'order' not in data:
            last_order = CaseStudy.objects.all().order_by('-order').first()
            data['order'] = (last_order.order + 1) if last_order else 1

        # Ensure required fields are present
        required_fields = {
            'title': 'Title is required',
            'description': 'Description is required',
            'client_name': 'Client name is required',
            'client_industry': 'Client industry is required'
        }
        
        for field, message in required_fields.items():
            if field not in data:
                raise serializers.ValidationError({field: message})
        
        return data

    def create(self, validated_data):
        # Ensure technologies is a list
        if 'technologies' not in validated_data:
            validated_data['technologies'] = []
        
        # Handle image separately
        image = validated_data.pop('image', None)
        instance = super().create(validated_data)
        
        if image:
            instance.image = image
            instance.save()
        
        return instance

    def update(self, instance, validated_data):
        # Ensure technologies is a list
        if 'technologies' in validated_data:
            tech_value = validated_data['technologies']
            validated_data['technologies'] = [
                str(tech).strip() 
                for tech in tech_value 
                if tech and str(tech).strip()
            ]
        
        # Handle image separately
        image = validated_data.pop('image', None)
        
        # Update all other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        # Update image if provided
        if image:
            instance.image = image
        
        instance.save()
        return instance

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        # Ensure technologies is always a list
        ret['technologies'] = ret.get('technologies', [])
        if not isinstance(ret['technologies'], list):
            ret['technologies'] = []
        return ret
