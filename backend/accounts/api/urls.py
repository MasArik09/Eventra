from django.urls import path
from accounts.api.views import (
    RegisterView,
    LoginView,
    RefreshTokenView,
    LogoutView,
    UserProfileView,
)

urlpatterns = [
    path('auth/register', RegisterView.as_view(), name='auth_register'),
    path('auth/login', LoginView.as_view(), name='auth_login'),
    path('auth/refresh', RefreshTokenView.as_view(), name='auth_refresh'),
    path('auth/logout', LogoutView.as_view(), name='auth_logout'),
    path('users/me', UserProfileView.as_view(), name='user_profile'),
]
