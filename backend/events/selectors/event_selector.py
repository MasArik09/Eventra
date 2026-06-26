from django.db.models import QuerySet, Q
from events.models import Event

def list_events(*, category_id: int = None, search: str = None, organizer_id: int = None, status: str = None) -> QuerySet[Event]:
    """
    Selects a filtered list of events.
    """
    queryset = Event.objects.select_related('organizer', 'category').all()

    if organizer_id is not None:
        queryset = queryset.filter(organizer_id=organizer_id)
        
    if status is not None:
        queryset = queryset.filter(status=status)
    elif organizer_id is None:
        # Default to showing only published events to the public
        queryset = queryset.filter(status='published')

    if category_id is not None:
        queryset = queryset.filter(category_id=category_id)

    if search:
        queryset = queryset.filter(
            Q(title__icontains=search) | 
            Q(description__icontains=search) | 
            Q(location__icontains=search)
        )

    return queryset

def get_event_by_id(*, event_id: int) -> Event:
    """
    Retrieves a single event by ID.
    """
    return Event.objects.select_related('organizer', 'category').get(id=event_id)
