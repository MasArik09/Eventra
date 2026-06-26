from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.http import Http404

from events.models import Event
from events.permissions.event_permissions import IsOrganizerOrAdmin
from events.selectors import list_events, get_event_by_id
from events.services import create_event, update_event, delete_event, publish_event, cancel_event
from events.serializers import EventSerializer

class EventListCreateView(APIView):
    permission_classes = [IsOrganizerOrAdmin]

    def get(self, request):
        category_id = request.query_params.get('category')
        search = request.query_params.get('search')
        
        # Convert category_id to int if present
        if category_id:
            try:
                category_id = int(category_id)
            except ValueError:
                category_id = None

        events = list_events(category_id=category_id, search=search, status='published')
        # Pass request context so serializers can build absolute URL for media/banner
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = EventSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            try:
                event = create_event(
                    organizer=request.user,
                    category=serializer.validated_data.get('category'),
                    title=serializer.validated_data['title'],
                    description=serializer.validated_data['description'],
                    date=serializer.validated_data['date'],
                    time=serializer.validated_data['time'],
                    location=serializer.validated_data['location'],
                    price=serializer.validated_data.get('price', 0.00),
                    available_tickets=serializer.validated_data.get('available_tickets', 0),
                    banner=request.FILES.get('banner') or serializer.validated_data.get('banner')
                )
                return Response({
                    "success": True,
                    "data": EventSerializer(event, context={'request': request}).data
                }, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({
                    "success": False,
                    "message": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)

        # Get first validation error message
        first_error_key = list(serializer.errors.keys())[0]
        first_error_msg = serializer.errors[first_error_key][0]
        return Response({
            "success": False,
            "message": f"{first_error_key}: {first_error_msg}"
        }, status=status.HTTP_400_BAD_REQUEST)

class EventDetailUpdateDeleteView(APIView):
    permission_classes = [IsOrganizerOrAdmin]

    def get_object(self, pk):
        try:
            return get_event_by_id(event_id=pk)
        except Event.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        event = self.get_object(pk)
        self.check_object_permissions(request, event)
        serializer = EventSerializer(event, context={'request': request})
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        event = self.get_object(pk)
        self.check_object_permissions(request, event)
        serializer = EventSerializer(event, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            try:
                # Handle banner file from request.FILES
                update_data = {**serializer.validated_data}
                if 'banner' in request.FILES:
                    update_data['banner'] = request.FILES['banner']
                
                updated = update_event(event=event, **update_data)
                return Response({
                    "success": True,
                    "data": EventSerializer(updated, context={'request': request}).data
                }, status=status.HTTP_200_OK)
            except ValueError as e:
                return Response({
                    "success": False,
                    "message": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)

        # Get first validation error message
        first_error_key = list(serializer.errors.keys())[0]
        first_error_msg = serializer.errors[first_error_key][0]
        return Response({
            "success": False,
            "message": f"{first_error_key}: {first_error_msg}"
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        event = self.get_object(pk)
        self.check_object_permissions(request, event)
        delete_event(event=event)
        return Response({
            "success": True,
            "message": "Event berhasil dihapus"
        }, status=status.HTTP_200_OK)

class OrganizerEventListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role not in ['organizer', 'admin'] and not request.user.is_superuser:
            return Response({
                "success": False,
                "message": "Akses ditolak. Hanya untuk Penyelenggara."
            }, status=status.HTTP_403_FORBIDDEN)

        events = list_events(organizer_id=request.user.id)
        serializer = EventSerializer(events, many=True, context={'request': request})
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

class EventPublishView(APIView):
    permission_classes = [IsOrganizerOrAdmin]

    def post(self, request, pk):
        try:
            event = get_event_by_id(event_id=pk)
        except Event.DoesNotExist:
            raise Http404

        self.check_object_permissions(request, event)
        
        try:
            published = publish_event(event=event)
            return Response({
                "success": True,
                "message": "Event berhasil diterbitkan",
                "data": EventSerializer(published, context={'request': request}).data
            }, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({
                "success": False,
                "message": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

class EventCancelView(APIView):
    permission_classes = [IsOrganizerOrAdmin]

    def post(self, request, pk):
        try:
            event = get_event_by_id(event_id=pk)
        except Event.DoesNotExist:
            raise Http404

        self.check_object_permissions(request, event)
        
        try:
            cancelled = cancel_event(event=event)
            return Response({
                "success": True,
                "message": "Event berhasil dibatalkan",
                "data": EventSerializer(cancelled, context={'request': request}).data
            }, status=status.HTTP_200_OK)
        except ValueError as e:
            return Response({
                "success": False,
                "message": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
