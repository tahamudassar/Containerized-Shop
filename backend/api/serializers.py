from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from api.models import User,StudyPost, BloodDonationPost, CarpoolPost, Comment ,Like, Share, Material
from django.core.exceptions import ValidationError 
from datetime import datetime


class CreateStudyPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyPost
        fields = ['user', 'community', 'main_topic', 'question_asked', 'link_url', 'image_url']
        

class StudyPostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = StudyPost
        fields = '__all__'  # Include all fields
        extra_fields = ['likes_count']  # Include the likes_count field

    def get_likes_count(self, obj):
        return obj.likes.count()  # Access the related 'likes' queryset
            
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Call the parent class validate method to get the token data
        data = super().validate(attrs)
        user = self.user  # Get the current authenticated user

        # Add custom claims to the JWT payload
        data['role'] = user.role  
        data['username'] = user.username  
        data['email'] = user.email  
        # data['profile_image'] = user.profile_image 

        return data


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=80)
    username = serializers.CharField(max_length=45)
    password = serializers.CharField(min_length=12, write_only=True)

    class Meta:
        model = User
        fields = ["email", "username", "password"]

    def validate(self, attrs):
        # Check if the email is already used
        email_exists = User.objects.filter(email=attrs["email"]).exists()
        if email_exists:
            raise ValidationError("Email has already been used")

        # Check if the username is already taken
        username_exists = User.objects.filter(username=attrs["username"]).exists()
        if username_exists:
            raise ValidationError("Username has already been taken")

        return super().validate(attrs)

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = super().create(validated_data)
        user.set_password(password)
        user.save()

        #Token.objects.create(user=user)

        return user
    

class BloodDonationPostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = BloodDonationPost
        fields = '__all__'  # Include all fields
        extra_fields = ['likes_count']  # Include the likes_count field

    def get_likes_count(self, obj):
        return obj.likes.count()  # Access the related 'likes' queryset

class CreateCarPoolPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarpoolPost
        fields = ['user', 'community', 'pickup_point', 'dropoff_point', 'pickup_time', 'preferred_gender', 'created_at']

class CarpoolPostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = CarpoolPost
        fields = '__all__'  # Include all fields
        extra_fields = ['likes_count']  # Include the likes_count field

    def get_likes_count(self, obj):
        return obj.likes.count()  # Access the related 'likes' queryset



class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['comment_id', 'post', 'user', 'content', 'created_at']
        read_only_fields = ['comment_id', 'created_at']

    def validate_content(self, value):
        """
        Custom validation for the content field.
        """
        if not value.strip():
            raise serializers.ValidationError("Comment content cannot be empty or whitespace.")
        return value
    

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'


class ShareSerializer(serializers.ModelSerializer):
    class Meta:
        model = Share
        fields = ['share_id', 'post_id', 'user_id', 'content', 'created_at']
        read_only_fields = ['share_id', 'created_at']
        
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'username', 'date_of_birth', 'profile_image', 'role']
        
class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ['title','description','file_url']
        