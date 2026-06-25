from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from categories.models import Category

class CategoryAPITests(APITestCase):
    def setUp(self):
        self.list_url = reverse('category_list_create')
        
        # Buat pengguna
        self.admin_user = User.objects.create_user(email="admin@example.com", password="password123", role="admin")
        self.attendee_user = User.objects.create_user(email="attendee@example.com", password="password123", role="attendee")
        
        # Kategori default
        self.cat = Category.objects.create(name="Seminar", slug="seminar")
        self.detail_url = reverse('category_detail_update_delete', kwargs={'pk': self.cat.id})

    def test_list_categories_public(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(len(response.data['data']), 1)
        self.assertEqual(response.data['data'][0]['name'], "Seminar")

    def test_create_category_admin_success(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.post(self.list_url, {"name": "Workshop"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['data']['name'], "Workshop")
        self.assertEqual(response.data['data']['slug'], "workshop")

    def test_create_category_non_admin_forbidden(self):
        self.client.force_authenticate(user=self.attendee_user)
        response = self.client.post(self.list_url, {"name": "Workshop"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_category_admin_success(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.patch(self.detail_url, {"name": "Advanced Seminar"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['name'], "Advanced Seminar")
        self.assertEqual(response.data['data']['slug'], "advanced-seminar")

    def test_delete_category_admin_success(self):
        self.client.force_authenticate(user=self.admin_user)
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Category.objects.filter(id=self.cat.id).exists())
