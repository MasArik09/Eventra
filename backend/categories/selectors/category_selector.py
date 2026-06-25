from django.db.models import QuerySet
from categories.models import Category

def list_categories() -> QuerySet[Category]:
    return Category.objects.all()

def get_category_by_id(*, category_id: int) -> Category:
    return Category.objects.get(id=category_id)

def get_category_by_slug(*, slug: str) -> Category:
    return Category.objects.get(slug=slug)
