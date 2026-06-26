from django.db import models
from django.conf import settings
from categories.models import Category

class Event(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('cancelled', 'Cancelled'),
    ]

    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='events'
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='events'
    )
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    time = models.CharField(max_length=100)
    location = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    available_tickets = models.PositiveIntegerField(default=0)
    banner = models.ImageField(upload_to='event_banners/', blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'event'
        ordering = ['-date', '-created_at']

    def __str__(self):
        return self.title
