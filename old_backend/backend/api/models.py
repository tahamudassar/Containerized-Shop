from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser has to have is_staff being True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser has to have is_superuser being True")

        return self.create_user(email=email, password=password, **extra_fields)


class User(AbstractUser):
    email = models.CharField(max_length=80, unique=True,null=False,blank=False)
    username = models.CharField(max_length=45,null=False,blank=False)
    date_of_birth = models.DateField(null=True)
    profile_image = models.URLField(null=True, blank=True)  # New field for profile image URL
    ROLE_CHOICES = [
        ("admin", "Admin"),
        ("user", "User"),
    ]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="user")
    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username
    


class Community(models.Model):
    community_id = models.AutoField(primary_key=True)  # Unique identifier for each community
    name = models.CharField(max_length=100, unique=True,null=False,blank=False)  # Name of the community
    description = models.TextField()  # Brief description of the community

    def __str__(self):
        return self.name

class Post(models.Model):
    post_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #post_type = models.CharField(max_length=10, choices=[('link', 'Link'), ('image', 'Image'), ('text', 'Text')])
    created_at = models.DateTimeField(default=timezone.now)
    community = models.ForeignKey(Community, on_delete=models.CASCADE)
    link_url = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)  
    class Meta:
        abstract = False  # This makes it an abstract base class

    def __str__(self):
        return f"Post by {self.user.username} in {self.community.name}"


class StudyPost(Post):
    main_topic = models.CharField(max_length=255,null=False,blank=False)
    question_asked = models.TextField(null=False,blank=False)

    def __str__(self):
        return self.main_topic 

class BloodDonationPost(Post):
    blood_type_required = models.CharField(max_length=3,null=False,blank=False)  # e.g., A+, B-
    required_within = models.CharField(max_length=50)  # e.g., "1 week"
    urgency = models.CharField(
        max_length=20,
        choices=[("Low", "low"), ("Medium", "medium"), ("High", "high")],
        default="Medium",
    )

    def __str__(self):
        return f"BloodDonationPost: {self.blood_type_required} blood needed urgently"

class CarpoolPost(Post):
    capacity = models.PositiveIntegerField(null=False,blank=False)
    dropoff_point = models.CharField(max_length=255,null=False,blank=False)
    pickup_point = models.CharField(max_length=255,null=False,blank=False)
    pickup_time = models.DateTimeField(max_length=255,null=False,blank=False)
    preferred_gender = models.CharField(max_length=255,null=False,blank=False)
    def __str__(self):
        return f"CarpoolPost: {self.from_location} to {self.to_location}" 


class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)  
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(null=False,blank=False)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Comment by {self.user.username} on Post {self.post.post_id}"



class Like(models.Model):
    like_id = models.AutoField(primary_key=True)  # Unique identifier for each like
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')  # Link to the liked post
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='likes')  # Link to the user who liked the post
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the like was created

    def __str__(self):
        return f"Like by {self.user_id.username} on post {self.post_id.post_id}"
    
class Share(models.Model):
    share_id = models.AutoField(primary_key=True)  # Unique identifier for each share
    post_id = models.ForeignKey('Post', on_delete=models.CASCADE, related_name='shares')  # Link to the shared post
    user_id = models.ForeignKey('User', on_delete=models.CASCADE, related_name='shares')
    content = models.TextField(null=True,blank=True)  # Optional content to add to the share
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the share was created

    def __str__(self):
        return f"Share by {self.user_id.username} on post {self.post_id.post_id}"
    


class Follow(models.Model):
    follower = models.ForeignKey('User', on_delete=models.CASCADE, related_name='following')  # The user who is following
    followed_user = models.ForeignKey('User', on_delete=models.CASCADE, related_name='followers')  # The user who is being followed
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp of when the follow action occurred

    class Meta:
        unique_together = ('follower', 'followed_user')  # Ensures a user can't follow another user more than once

    def __str__(self):
        return f"{self.follower.username} follows {self.followed_user.username}"
    

class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('friend_request', 'Friend Request'),
        ('like', 'Like'),
        ('comment', 'Comment'),
        ('share', 'Share'),
    ]

    notification_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('api.User', on_delete=models.CASCADE, related_name='notifications')
    type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES)
    post = models.ForeignKey('Post', on_delete=models.CASCADE, null=True, blank=True)  # Nullable, links to Post
    from_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='sent_notifications')  # Nullable, identifies who triggered the notification
    created_at = models.DateTimeField(default=timezone.now)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Notification for {self.user.username} - {self.type} from {self.from_user.username if self.from_user else 'N/A'}"
    

class Material(models.Model):
    material_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)  # Title of the resource
    description = models.TextField(blank = True, null = True)  # Description of the material
    file_url = models.URLField()  # URL to the file or resource
    created_at = models.DateTimeField(default=timezone.now)  # Timestamp when the material was added
    

    def __str__(self):
        return self.title