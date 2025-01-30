from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate

from .serializer import RegisterSerializer
from .models import Customer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Create a new user group
            group, created = Group.objects.get_or_create(name='customer')
            user.groups.add(group)
            return Response(
                {
                    "message": "User created successfully",
                    "user": {
                        "email": user.email,
                        "username": user.username,
                        "phone": user.phone,
                    },
                },
                status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)