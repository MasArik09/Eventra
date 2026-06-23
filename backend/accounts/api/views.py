from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.services import register_user, update_user_profile
from accounts.serializers import (
    UserSerializer,
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
)

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                register_user(
                    email=serializer.validated_data['email'],
                    password=serializer.validated_data['password'],
                    full_name=serializer.validated_data['full_name'],
                    role=serializer.validated_data.get('role', 'attendee')
                )
                return Response({
                    "success": True,
                    "message": "Account created successfully"
                }, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({
                    "success": False,
                    "message": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        
        first_error_key = list(serializer.errors.keys())[0]
        first_error_msg = serializer.errors[first_error_key][0]
        return Response({
            "success": False,
            "message": f"{first_error_key}: {first_error_msg}"
        }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class RefreshTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CustomTokenRefreshSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        
        first_error_key = list(serializer.errors.keys())[0]
        first_error_msg = serializer.errors[first_error_key][0]
        return Response({
            "success": False,
            "message": f"{first_error_key}: {first_error_msg}"
        }, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            if not refresh_token:
                return Response({
                    "success": False,
                    "message": "refresh_token is required"
                }, status=status.HTTP_400_BAD_REQUEST)
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({
                "success": True,
                "message": "Token invalidated"
            }, status=status.HTTP_200_OK)
        except Exception:
            return Response({
                "success": False,
                "message": "Invalid token"
            }, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def patch(self, request):
        user = request.user
        full_name = request.data.get('full_name')
        avatar_url = request.data.get('avatar_url')
        bio = request.data.get('bio')
        
        update_user_profile(
            user=user,
            full_name=full_name,
            avatar_url=avatar_url,
            bio=bio
        )
        
        serializer = UserSerializer(user)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)
