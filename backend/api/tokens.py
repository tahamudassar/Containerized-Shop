from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


def create_jwt_pair_for_user(user: User):
    refresh = RefreshToken.for_user(user)

    tokens = {"access": str(refresh.access_token), "refresh": str(refresh)}

    return tokens