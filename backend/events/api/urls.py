from django.urls import path
from events.api.views import (
    EventListCreateView,
    EventDetailUpdateDeleteView,
    OrganizerEventListView,
    EventPublishView,
    EventCancelView
)

urlpatterns = [
    path('events', EventListCreateView.as_view(), name='event_list_create'),
    path('events/managed', OrganizerEventListView.as_view(), name='organizer_event_list'),
    path('events/<int:pk>', EventDetailUpdateDeleteView.as_view(), name='event_detail_update_delete'),
    path('events/<int:pk>/publish', EventPublishView.as_view(), name='event_publish'),
    path('events/<int:pk>/cancel', EventCancelView.as_view(), name='event_cancel'),
]
