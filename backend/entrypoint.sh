#!/bin/sh

# Apply migrations
python manage.py migrate

# Create superuser if it doesn't exist
echo "from django.contrib.auth import get_user_model; \
User = get_user_model(); \
User.objects.filter(username='admin').exists() or \
User.objects.create_superuser('admin', 'admin@example.com', '12345678')" | python manage.py shell

# Start the server
python manage.py runserver 0.0.0.0:8000
