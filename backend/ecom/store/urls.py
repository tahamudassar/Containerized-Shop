from django.urls import path
from . import views  # Import the views from the api app
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import RegisterView
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
]
