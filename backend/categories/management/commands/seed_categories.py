from django.core.management.base import BaseCommand
from django.utils.text import slugify
from categories.models import Category

class Command(BaseCommand):
    help = "Seeds default event categories"

    def handle(self, *args, **options):
        defaults = ["Seminar", "Workshop", "Competition", "Webinar", "Conference"]
        self.stdout.write("Melakukan seeding kategori default...")
        for name in defaults:
            slug = slugify(name)
            obj, created = Category.objects.get_or_create(
                slug=slug,
                defaults={"name": name}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Kategori berhasil dibuat: {name}"))
            else:
                self.stdout.write(self.style.WARNING(f"Kategori sudah ada: {name}"))
