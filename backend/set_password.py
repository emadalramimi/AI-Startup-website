from django.contrib.auth.models import User
from django.core.management import setup_environ
import sys
import os

# Add the project directory to the sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from backend import settings

setup_environ(settings)

# Get the admin user and set password
user = User.objects.get(username='admin')
user.set_password('YourNewPassword123!')
user.save()

print("Password set successfully!")
