import os
import django

# Set the Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from case_studies.models import CaseStudy

# List all case studies
case_studies = CaseStudy.objects.all()
for cs in case_studies:
    print(f'ID: {cs.id}, Title: {cs.title}')
