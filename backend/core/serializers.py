from rest_framework import serializers
from .models import Service, Professional, Booking, ProfessionalGallery

class ServiceSerializer(serializers.ModelSerializer):
    priceFrom = serializers.DecimalField(source='price_from', max_digits=10, decimal_places=2)
    iconName = serializers.CharField(source='icon_name', required=False, allow_blank=True, default='Scissors')
    isPopular = serializers.BooleanField(source='is_popular', default=False)

    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'duration', 'priceFrom', 'gender', 'iconName', 'isPopular']

class ProfessionalGallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfessionalGallery
        fields = ['id', 'image', 'created_at']

class ProfessionalSerializer(serializers.ModelSerializer):
    reviewCount = serializers.IntegerField(source='review_count', required=False, default=0)
    appointmentCount = serializers.IntegerField(source='appointment_count', required=False, default=0)
    nextAvailable = serializers.CharField(source='next_available', required=False, default='Hoje')
    gallery = ProfessionalGallerySerializer(many=True, read_only=True)

    class Meta:
        model = Professional
        fields = ['id', 'name', 'slug', 'specialty', 'bio', 'rating', 'reviewCount', 'appointmentCount', 'gender', 'nextAvailable', 'initials', 'image', 'phone', 'email', 'owner', 'gallery']

class BookingSerializer(serializers.ModelSerializer):
    professional_id = serializers.PrimaryKeyRelatedField(source='professional', queryset=Professional.objects.all())
    professional_name = serializers.CharField(source='professional.name', read_only=True)
    professional_slug = serializers.CharField(source='professional.slug', read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(source='service', queryset=Service.objects.all())
    service_name = serializers.CharField(source='service.name', read_only=True)
    date = serializers.DateField(write_only=True)
    time = serializers.CharField(write_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'service_id', 'professional_id', 'professional_name', 'professional_slug', 'service_name', 'client_name', 'client_phone', 'client_email', 'date', 'time', 'date_time', 'status', 'created_at']
        read_only_fields = ['created_at']

    def create(self, validated_data):
        date = validated_data.pop('date', None)
        time_str = validated_data.pop('time', None)
        
        if date and time_str:
            from datetime import datetime
            combined_str = f"{date} {time_str}"
            validated_data['date_time'] = datetime.strptime(combined_str, "%Y-%m-%d %H:%M")
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        date = validated_data.pop('date', None)
        time_str = validated_data.pop('time', None)
        
        if date and time_str:
            from datetime import datetime
            combined_str = f"{date} {time_str}"
            instance.date_time = datetime.strptime(combined_str, "%Y-%m-%d %H:%M")
        elif 'date_time' in validated_data:
            instance.date_time = validated_data.pop('date_time')
            
        return super().update(instance, validated_data)
