from django.urls import path
from api.views import CustomTokenObtainPairView
from . import views  # Import the views from the api app
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from .views import RegisterView, PasswordResetRequestView, ToggleLike
from .views import LatestPostsView, StudyPostListView, BloodDonationPostListView, CarpoolPostListView, CreateStudyPost, CreateCarPoolPost, CreateBloodDonationPost,CreateComment, CreateLike, CreateShare,UserDetailView,UserPostsView,ProfileUpdateView, MaterialListView, UnlikePost, CheckLikeStatus, FetchComments
urlpatterns = [
    #path('hello/', views.hello_world),
    path('token/',CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('jwt/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('register/', RegisterView.as_view(), name='register'),
    path('posts/study/', StudyPostListView.as_view(), name='study-posts'),
    path('posts/latest/', LatestPostsView.as_view(), name='latest-posts'),
    path('posts/blood-donation/', BloodDonationPostListView.as_view(), name='blood-donation-posts'),
    path('posts/carpool/', CarpoolPostListView.as_view(), name='carpool-posts'),
    #path('posts/study/', StudyPostListView.as_view(), name='study-posts'),
    path('posts/blood-donation/', BloodDonationPostListView.as_view(), name='blood-donation-posts'),
    path('posts/carpool/', CarpoolPostListView.as_view(), name='carpool-posts'),
    path('createStudyPost', CreateStudyPost.as_view(), name='create_study_post'),
    path('createCarpoolPost', CreateCarPoolPost.as_view(), name='create_carpool_post'),
    path('createBloodDonationPost', CreateBloodDonationPost.as_view(), name='create_blood_donation_post'),
    path('createComment/', CreateComment.as_view(), name='comments'),
    path('fetchComments/<int:post_id>/', FetchComments.as_view(), name='fetch_comments'),
    path('createLike/', CreateLike.as_view(), name='likes'),
    path('unlikePost/', UnlikePost.as_view(), name='unlike_post'),
    path('checkLikeStatus/', CheckLikeStatus.as_view(), name='check_like_status'),
     path('toggleLike/', ToggleLike.as_view(), name='toggle_like'),
    path('createShare/', CreateShare.as_view(), name='shares'),
    path('userDetail/', UserDetailView.as_view(), name='user-detail'),
    path('userPosts/', UserPostsView.as_view(), name='user-posts'),
    path('updateProfile/<str:update_type>/', ProfileUpdateView.as_view(), name='update-profile'),
    path('passwordReset/', PasswordResetRequestView.as_view(), name="password-reset"),
    path("passwordResetConfirm/<str:token>/", views.PasswordResetConfirmView.as_view(), name="password-reset-confirm"),
    path('materials/', MaterialListView.as_view(), name='materials-list'),
    path('user/<int:user_id>/', UserDetailView.as_view(), name='get-user-details'),
    # path('auth-check/', IsUserAuthed.as_view(), name='auth-check'),
]

