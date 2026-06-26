from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOrganizerOrAdmin(BasePermission):
    """
    Permit write access only to organizers and admins.
    Permit read access to anyone for published events, but restricted to the owner/admin for draft/cancelled events.
    """
    def has_permission(self, request, view):
        # Allow anyone to read, but creating requires authentication and being an organizer/admin.
        if request.method in SAFE_METHODS:
            return True
        return (
            request.user 
            and request.user.is_authenticated 
            and (request.user.role in ['organizer', 'admin'] or request.user.is_superuser)
        )

    def has_object_permission(self, request, view, obj):
        # If it's a safe method:
        # - Published events are public.
        # - Draft/cancelled events require being the organizer owner or admin.
        if request.method in SAFE_METHODS:
            if obj.status == 'published':
                return True
            return (
                request.user 
                and request.user.is_authenticated 
                and (request.user == obj.organizer or request.user.role == 'admin' or request.user.is_superuser)
            )

        # Write operations (PUT, PATCH, DELETE) require being the organizer owner or admin.
        return (
            request.user 
            and request.user.is_authenticated 
            and (request.user == obj.organizer or request.user.role == 'admin' or request.user.is_superuser)
        )
