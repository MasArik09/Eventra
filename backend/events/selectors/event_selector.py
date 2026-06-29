from django.db.models import QuerySet, Q
from events.models import Event

def list_events(
    *,
    category_id: int = None,
    search: str = None,
    organizer_id: int = None,
    status: str = None,
    date_from: str = None,
    date_to: str = None,
    price_min: float = None,
    price_max: float = None,
    is_free: bool = None,
    ordering: str = None
) -> QuerySet[Event]:
    """
    Selects a filtered and sorted list of events.
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

    # Rentang Tanggal
    if date_from:
        queryset = queryset.filter(date__gte=date_from)
    if date_to:
        queryset = queryset.filter(date__lte=date_to)

    # Rentang Harga
    if price_min is not None:
        queryset = queryset.filter(price__gte=price_min)
    if price_max is not None:
        queryset = queryset.filter(price__lte=price_max)

    # Event Gratis/Berbayar
    if is_free is not None:
        if is_free:
            queryset = queryset.filter(price=0.0)
        else:
            queryset = queryset.filter(price__gt=0.0)

    # Pengurutan (Sorting)
    allowed_orderings = ['date', '-date', 'price', '-price', 'title', '-title', 'created_at', '-created_at']
    if ordering in allowed_orderings:
        queryset = queryset.order_by(ordering)

    return queryset

def get_event_by_id(*, event_id: int) -> Event:
    """
    Retrieves a single event by ID.
    """
    return Event.objects.select_related('organizer', 'category').get(id=event_id)
