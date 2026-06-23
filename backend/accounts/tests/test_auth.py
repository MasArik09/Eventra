from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User, Profile

class AuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse('auth_register')
        self.login_url = reverse('auth_login')
        self.profile_url = reverse('user_profile')
        self.refresh_url = reverse('auth_refresh')
        self.logout_url = reverse('auth_logout')

        self.user_data = {
            "email": "test@example.com",
            "password": "password123",
            "confirm_password": "password123",
            "full_name": "Test User"
        }

    def test_registration_success(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        
        self.assertTrue(User.objects.filter(email="test@example.com").exists())
        user = User.objects.get(email="test@example.com")
        self.assertEqual(user.profile.full_name, "Test User")

    def test_registration_password_mismatch(self):
        data = self.user_data.copy()
        data['confirm_password'] = 'differentpassword'
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data['success'])

    def test_registration_duplicate_email(self):
        self.client.post(self.register_url, self.user_data, format='json')
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data['success'])

    def test_login_success(self):
        self.client.post(self.register_url, self.user_data, format='json')
        
        login_data = {
            "email": "test@example.com",
            "password": "password123"
        }
        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access_token', response.data)
        self.assertIn('refresh_token', response.data)

    def test_login_invalid_credentials(self):
        self.client.post(self.register_url, self.user_data, format='json')
        
        login_data = {
            "email": "test@example.com",
            "password": "wrongpassword"
        }
        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_profile_access_authorized(self):
        self.client.post(self.register_url, self.user_data, format='json')
        login_data = {"email": "test@example.com", "password": "password123"}
        login_resp = self.client.post(self.login_url, login_data, format='json')
        token = login_resp.data['access_token']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['data']['email'], "test@example.com")
        self.assertEqual(response.data['data']['profile']['full_name'], "Test User")

    def test_profile_access_unauthorized(self):
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_profile_update(self):
        self.client.post(self.register_url, self.user_data, format='json')
        login_data = {"email": "test@example.com", "password": "password123"}
        login_resp = self.client.post(self.login_url, login_data, format='json')
        token = login_resp.data['access_token']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        
        update_data = {
            "full_name": "Updated Name",
            "bio": "Developer bio details"
        }
        response = self.client.patch(self.profile_url, update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['profile']['full_name'], "Updated Name")
        self.assertEqual(response.data['data']['profile']['bio'], "Developer bio details")

    def test_token_refresh(self):
        self.client.post(self.register_url, self.user_data, format='json')
        login_data = {"email": "test@example.com", "password": "password123"}
        login_resp = self.client.post(self.login_url, login_data, format='json')
        refresh_token = login_resp.data['refresh_token']

        refresh_data = {"refresh_token": refresh_token}
        response = self.client.post(self.refresh_url, refresh_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access_token', response.data)

    def test_logout(self):
        self.client.post(self.register_url, self.user_data, format='json')
        login_data = {"email": "test@example.com", "password": "password123"}
        login_resp = self.client.post(self.login_url, login_data, format='json')
        access_token = login_resp.data['access_token']
        refresh_token = login_resp.data['refresh_token']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        
        logout_data = {"refresh_token": refresh_token}
        response = self.client.post(self.logout_url, logout_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])

        response_ref = self.client.post(self.refresh_url, {"refresh_token": refresh_token}, format='json')
        self.assertEqual(response_ref.status_code, status.HTTP_400_BAD_REQUEST)
