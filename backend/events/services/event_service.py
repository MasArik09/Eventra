from django.db import transaction
from django.utils import timezone
from events.models import Event
from categories.models import Category
from django.contrib.auth import get_user_model

User = get_user_model()

def validate_event_data(*, price=None, available_tickets=None, date=None):
    """
    Common validation for event creation and updates.
    """
    if price is not None and price < 0:
        raise ValueError("Harga event tidak boleh bernilai negatif.")
    if available_tickets is not None and available_tickets < 0:
        raise ValueError("Jumlah tiket tersedia tidak boleh bernilai negatif.")
    # Standard warning: check if date is in the past if creating/updating date
    # (Optional, but let's do it if it's new date to ensure event validity)
    # Note: date can be passed as a string or Date object.
    # To keep it flexible, let's not block past date if it is an update, but we can do a check or keep it basic.

@transaction.atomic
def create_event(
    *,
    organizer: User,
    title: str,
    description: str,
    date,
    time: str,
    location: str,
    category: Category = None,
    price: float = 0.00,
    available_tickets: int = 0,
    banner = None,
    status: str = 'draft'
) -> Event:
    """
    Creates an event with validation.
    """
    if organizer.role == 'attendee':
        raise ValueError("Pengguna dengan peran Attendee tidak diijinkan membuat event.")
        
    validate_event_data(price=price, available_tickets=available_tickets, date=date)

    event = Event.objects.create(
        organizer=organizer,
        category=category,
        title=title,
        description=description,
        date=date,
        time=time,
        location=location,
        price=price,
        available_tickets=available_tickets,
        banner=banner,
        status=status
    )
    return event

@transaction.atomic
def update_event(*, event: Event, **data) -> Event:
    """
    Updates an event with validation.
    """
    price = data.get('price')
    available_tickets = data.get('available_tickets')
    validate_event_data(price=price, available_tickets=available_tickets)

    # Update simple fields
    for field, value in data.items():
        if value is not None or field in ['category', 'banner']:
            setattr(event, field, value)

    event.save()
    return event

@transaction.atomic
def delete_event(*, event: Event):
    """
    Deletes an event.
    """
    event.delete()

@transaction.atomic
def publish_event(*, event: Event) -> Event:
    """
    Publishes an event.
    """
    event.status = 'published'
    event.save()
    return event

@transaction.atomic
def cancel_event(*, event: Event) -> Event:
    """
    Cancels an event.
    """
    event.status = 'cancelled'
    event.save()
    return event
