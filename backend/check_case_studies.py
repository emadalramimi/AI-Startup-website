import os
import django

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from case_studies.models import CaseStudy

# Get all case studies
case_studies = CaseStudy.objects.all()
print(f"\nTotal case studies: {case_studies.count()}\n")

# Print details of each case study
for cs in case_studies:
    print(f"ID: {cs.id}")
    print(f"Title: {cs.title}")
    print(f"Slug: {cs.slug}")
    print("-" * 50)
