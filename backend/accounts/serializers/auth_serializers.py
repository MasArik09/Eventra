from rest_framework import serializers
from accounts.models import User, Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['full_name', 'avatar_url', 'bio']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'role', 'profile']

class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    full_name = serializers.CharField(max_length=255)
    role = serializers.ChoiceField(choices=[('attendee', 'Attendee'), ('organizer', 'Organizer')], default='attendee')

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return data

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Rename default keys to match API Spec
        data['access_token'] = data.pop('access')
        data['refresh_token'] = data.pop('refresh')
        return data

class CustomTokenRefreshSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()

    def validate(self, attrs):
        refresh_token = attrs.get('refresh_token')
        from rest_framework_simplejwt.tokens import RefreshToken
        try:
            refresh = RefreshToken(refresh_token)
            data = {
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh)
            }
            # Attempt to blacklist the old refresh token if rotation is on, or we can leave it
            return data
        except Exception:
            raise serializers.ValidationError({"refresh_token": "Invalid or expired refresh token"})
