from accounts.models import User, Profile
from django.db import transaction

@transaction.atomic
def register_user(email, password, full_name, role='attendee'):
    if User.objects.filter(email=email).exists():
        raise ValueError("User with this email already exists.")
    
    # Create the user
    user = User.objects.create_user(email=email, password=password, role=role)
    
    # Update the automatically created profile with the full_name
    profile = user.profile
    profile.full_name = full_name
    profile.save()
    
    return user

@transaction.atomic
def update_user_profile(user, full_name=None, avatar_url=None, bio=None):
    profile, _ = Profile.objects.get_or_create(user=user)
    if full_name is not None:
        profile.full_name = full_name
    if avatar_url is not None:
        profile.avatar_url = avatar_url
    if bio is not None:
        profile.bio = bio
    profile.save()
    return profile
