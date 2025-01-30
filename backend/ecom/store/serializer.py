from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from store.models import Customer, Product, Order, OrderItem
from django.core.exceptions import ValidationError
from datetime import datetime

class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=80)
    username = serializers.CharField(max_length=45)
    password = serializers.CharField(min_length=12, write_only=True)
    phone = serializers.CharField(max_length=15)

    class Meta:
        model = Customer
        fields = ["email", "username", "password", "phone"]

    def validate(self, attrs):
        # Check if the email is already used
        email_exists = Customer.objects.filter(email=attrs["email"]).exists()
        if email_exists:
            raise ValidationError("Email has already been used")

        # Check if the username is already taken
        username_exists = Customer.objects.filter(username=attrs["username"]).exists()
        if username_exists:
            raise ValidationError("Username has already been taken")
        
        # Check if the phone number is already taken
        phone_exists = Customer.objects.filter(phone=attrs["phone"]).exists()
        if phone_exists:
            raise ValidationError("Phone has already been taken")
        
        return attrs

    def create(self, validated_data):
        user = Customer.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"],
            phone=validated_data["phone"],  # Include the phone field
        )
        return user