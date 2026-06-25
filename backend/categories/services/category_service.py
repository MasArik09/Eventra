from django.db import transaction
from django.utils.text import slugify
from categories.models import Category

@transaction.atomic
def create_category(*, name: str, slug: str = None) -> Category:
    if not slug:
        slug = slugify(name)
    if Category.objects.filter(slug=slug).exists() or Category.objects.filter(name=name).exists():
        raise ValueError("Kategori dengan nama atau slug ini sudah ada.")
    return Category.objects.create(name=name, slug=slug)

@transaction.atomic
def update_category(*, category: Category, name: str = None, slug: str = None) -> Category:
    if name is not None:
        category.name = name
    if slug is not None:
        category.slug = slug
    elif name is not None and not slug:
        category.slug = slugify(name)
        
    # Periksa batasan keunikan jika diubah
    if Category.objects.exclude(id=category.id).filter(name=category.name).exists():
        raise ValueError("Kategori dengan nama ini sudah ada.")
    if Category.objects.exclude(id=category.id).filter(slug=category.slug).exists():
        raise ValueError("Kategori dengan slug ini sudah ada.")
        
    category.save()
    return category

@transaction.atomic
def delete_category(*, category: Category):
    category.delete()
