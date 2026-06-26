from rest_framework import serializers
from events.models import Event
from categories.models import Category
from categories.serializers import CategorySerializer
from accounts.serializers import UserSerializer

class EventSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True,
        required=False,
        allow_null=True
    )
    organizer = UserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = [
            'id', 'organizer', 'category', 'category_id', 'title', 'description', 
            'date', 'time', 'location', 'price', 'available_tickets', 'banner', 
            'status', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'organizer', 'status', 'created_at', 'updated_at']

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Harga event tidak boleh bernilai negatif.")
        return value

    def validate_available_tickets(self, value):
        if value < 0:
            raise serializers.ValidationError("Jumlah tiket tersedia tidak boleh bernilai negatif.")
        return value
