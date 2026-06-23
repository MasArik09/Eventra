from accounts.models import User, Profile

def get_user_by_email(email):
    return User.objects.filter(email=email).first()

def get_user_profile(user):
    return Profile.objects.filter(user=user).first()
