from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from categories.permissions.category_permissions import IsAdminOrReadOnly
from categories.selectors import list_categories
from categories.services import create_category, update_category, delete_category
from categories.serializers import CategorySerializer
from django.shortcuts import get_object_or_404

class CategoryListCreateView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request):
        categories = list_categories()
        serializer = CategorySerializer(categories, many=True)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            try:
                category = create_category(name=serializer.validated_data['name'])
                return Response({
                    "success": True,
                    "data": CategorySerializer(category).data
                }, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({
                    "success": False,
                    "message": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
        
        first_error_key = list(serializer.errors.keys())[0]
        first_error_msg = serializer.errors[first_error_key][0]
        return Response({
            "success": False,
            "message": f"{first_error_key}: {first_error_msg}"
        }, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetailUpdateDeleteView(APIView):
    permission_classes = [IsAdminOrReadOnly]

    def get(self, request, pk):
        category = get_object_or_404(list_categories(), pk=pk)
        serializer = CategorySerializer(category)
        return Response({
            "success": True,
            "data": serializer.data
        }, status=status.HTTP_200_OK)

    def patch(self, request, pk):
        category = get_object_or_404(list_categories(), pk=pk)
        serializer = CategorySerializer(data=request.data, partial=True)
        if serializer.is_valid():
            try:
                updated = update_category(
                    category=category,
                    name=serializer.validated_data.get('name')
                )
                return Response({
                    "success": True,
                    "data": CategorySerializer(updated).data
                }, status=status.HTTP_200_OK)
            except ValueError as e:
                return Response({
                    "success": False,
                    "message": str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
                
        first_error_key = list(serializer.errors.keys())[0]
        first_error_msg = serializer.errors[first_error_key][0]
        return Response({
            "success": False,
            "message": f"{first_error_key}: {first_error_msg}"
        }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = get_object_or_404(list_categories(), pk=pk)
        delete_category(category=category)
        return Response({
            "success": True,
            "message": "Kategori berhasil dihapus"
        }, status=status.HTTP_200_OK)
