from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone
from accounts.models import User
from categories.models import Category
from events.models import Event

class EventAPITests(APITestCase):
    def setUp(self):
        # URLs
        self.list_create_url = reverse('event_list_create')
        self.managed_list_url = reverse('organizer_event_list')

        # Categories
        self.category = Category.objects.create(name="Tech", slug="tech")
        self.other_category = Category.objects.create(name="Music", slug="music")

        # Users
        self.organizer = User.objects.create_user(
            email="organizer@example.com", 
            password="password123", 
            role="organizer"
        )
        self.other_organizer = User.objects.create_user(
            email="other_org@example.com", 
            password="password123", 
            role="organizer"
        )
        self.attendee = User.objects.create_user(
            email="attendee@example.com", 
            password="password123", 
            role="attendee"
        )
        self.admin = User.objects.create_user(
            email="admin@example.com", 
            password="password123", 
            role="admin"
        )

        # Base Event Data
        self.event_data = {
            "title": "Global Tech Summit 2026",
            "description": "Tech conference in Bandung",
            "date": "2026-07-12",
            "time": "09:00 - 17:00",
            "location": "Bandung Convention Center",
            "price": 15.00,
            "available_tickets": 100,
            "category_id": self.category.id
        }

        # Existing Event
        self.existing_event = Event.objects.create(
            organizer=self.organizer,
            category=self.category,
            title="Symphony of Lights & Sound",
            description="Music concert in Jakarta",
            date="2026-06-25",
            time="19:00 - 23:00",
            location="Jakarta Amphitheater",
            price=75.00,
            available_tickets=50,
            status="draft"
        )
        self.detail_url = reverse('event_detail_update_delete', kwargs={'pk': self.existing_event.id})
        self.publish_url = reverse('event_publish', kwargs={'pk': self.existing_event.id})
        self.cancel_url = reverse('event_cancel', kwargs={'pk': self.existing_event.id})

    def test_list_events_public_only_shows_published(self):
        # Current event is draft, shouldn't appear
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(len(response.data['data']['results']), 0)

        # Mark as published
        self.existing_event.status = 'published'
        self.existing_event.save()

        # Should appear now
        response = self.client.get(self.list_create_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']['results']), 1)
        self.assertEqual(response.data['data']['results'][0]['title'], self.existing_event.title)

    def test_list_events_filtering_and_sorting(self):
        # Publish existing event
        self.existing_event.status = 'published'
        self.existing_event.save()

        # Create another published event
        other_event = Event.objects.create(
            organizer=self.organizer,
            category=self.other_category,
            title="Tech Conf 2026",
            description="Django conference",
            date="2026-07-15",
            time="10:00",
            location="Bandung",
            price=0.00,
            available_tickets=20,
            status="published"
        )

        # Test category filter
        response = self.client.get(self.list_create_url, {"category": self.other_category.id})
        self.assertEqual(len(response.data['data']['results']), 1)
        self.assertEqual(response.data['data']['results'][0]['title'], "Tech Conf 2026")

        # Test search filter
        response = self.client.get(self.list_create_url, {"search": "Django"})
        self.assertEqual(len(response.data['data']['results']), 1)
        self.assertEqual(response.data['data']['results'][0]['title'], "Tech Conf 2026")

        # Test is_free filter
        response = self.client.get(self.list_create_url, {"is_free": "true"})
        self.assertEqual(len(response.data['data']['results']), 1)
        self.assertEqual(response.data['data']['results'][0]['title'], "Tech Conf 2026")

        # Test price range
        response = self.client.get(self.list_create_url, {"price_min": 10.00, "price_max": 80.00})
        self.assertEqual(len(response.data['data']['results']), 1)
        self.assertEqual(response.data['data']['results'][0]['title'], "Symphony of Lights & Sound")

        # Test date range
        response = self.client.get(self.list_create_url, {"date_from": "2026-07-01", "date_to": "2026-07-31"})
        self.assertEqual(len(response.data['data']['results']), 1)
        self.assertEqual(response.data['data']['results'][0]['title'], "Tech Conf 2026")

        # Test sorting
        response = self.client.get(self.list_create_url, {"ordering": "price"})
        self.assertEqual(response.data['data']['results'][0]['title'], "Tech Conf 2026") # free first

    def test_create_event_organizer_success(self):
        self.client.force_authenticate(user=self.organizer)
        response = self.client.post(self.list_create_url, self.event_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['data']['title'], self.event_data['title'])
        self.assertEqual(response.data['data']['status'], 'draft') # default status is draft

    def test_create_event_attendee_forbidden(self):
        self.client.force_authenticate(user=self.attendee)
        response = self.client.post(self.list_create_url, self.event_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_event_validation_negative_price(self):
        self.client.force_authenticate(user=self.organizer)
        bad_data = self.event_data.copy()
        bad_data['price'] = -5.00
        response = self.client.post(self.list_create_url, bad_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(response.data['success'])

    def test_create_event_validation_negative_tickets(self):
        self.client.force_authenticate(user=self.organizer)
        bad_data = self.event_data.copy()
        bad_data['available_tickets'] = -10
        response = self.client.post(self.list_create_url, bad_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_event_owner_success(self):
        self.client.force_authenticate(user=self.organizer)
        response = self.client.patch(self.detail_url, {"title": "Updated Title"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['title'], "Updated Title")

    def test_update_event_non_owner_forbidden(self):
        self.client.force_authenticate(user=self.other_organizer)
        response = self.client.patch(self.detail_url, {"title": "Hack Title"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_event_owner_success(self):
        self.client.force_authenticate(user=self.organizer)
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Event.objects.filter(id=self.existing_event.id).exists())

    def test_publish_event_owner_success(self):
        self.client.force_authenticate(user=self.organizer)
        response = self.client.post(self.publish_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['status'], 'published')

    def test_cancel_event_owner_success(self):
        # Must be published first
        self.existing_event.status = 'published'
        self.existing_event.save()

        self.client.force_authenticate(user=self.organizer)
        response = self.client.post(self.cancel_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['status'], 'cancelled')

    def test_managed_events_only_returns_own(self):
        # Create another event owned by other organizer
        Event.objects.create(
            organizer=self.other_organizer,
            category=self.category,
            title="Other Event",
            description="Desc",
            date="2026-07-20",
            time="10:00",
            location="Loc",
            price=0,
            available_tickets=10,
            status="draft"
        )

        self.client.force_authenticate(user=self.organizer)
        response = self.client.get(self.managed_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should only see 1 event (the existing_event)
        self.assertEqual(len(response.data['data']), 1)
        self.assertEqual(response.data['data'][0]['id'], self.existing_event.id)
