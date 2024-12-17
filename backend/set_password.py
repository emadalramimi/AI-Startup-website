import os
import django
import sys

# Add the project directory to the sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User

try:
    # Try to get the admin user
    user = User.objects.get(username='admin')
except User.DoesNotExist:
    # If admin user doesn't exist, create it
    user = User.objects.create_superuser('admin', 'admin@example.com', 'admin')
    print("Admin user created successfully!")
else:
    # If admin user exists, update the password
    user.set_password('admin')
    user.save()
    print("Admin password updated successfully!")
