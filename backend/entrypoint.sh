#!/bin/sh

# Apply migrations
python manage.py migrate

# Create superuser if it doesn't exist
python manage.py shell <<EOF
from django.contrib.auth import get_user_model

User = get_user_model()
if not User.objects.filter(username="admin").exists():
    User.objects.create_superuser(username="admin", email="admin@admin.com", password="12345678")
    print("Superuser created.")
else:
    print("Superuser already exists.")
EOF

# Start the server
python manage.py runserver 0.0.0.0:8000
