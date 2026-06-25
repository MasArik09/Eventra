from django.urls import path
from categories.api.views import CategoryListCreateView, CategoryDetailUpdateDeleteView

urlpatterns = [
    path('categories', CategoryListCreateView.as_view(), name='category_list_create'),
    path('categories/<int:pk>', CategoryDetailUpdateDeleteView.as_view(), name='category_detail_update_delete'),
]
