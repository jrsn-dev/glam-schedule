from django.contrib.auth import authenticate, login
from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Service, Professional, Booking, ProfessionalGallery
from .serializers import ServiceSerializer, ProfessionalSerializer, BookingSerializer, ProfessionalGallerySerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        return Response({
            'success': True,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff or user.is_superuser,
                'gender': getattr(user, 'profile', None).gender if hasattr(user, 'profile') else 'neutral'
            },
            'token': 'glam_token_mock_123' # Mock token for testing
        })
    return Response({'error': 'Credenciais inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def get_queryset(self):
        gender = self.request.query_params.get('gender')
        if gender:
            return self.queryset.filter(gender=gender)
        return self.queryset

class ProfessionalViewSet(viewsets.ModelViewSet):
    queryset = Professional.objects.all()
    serializer_class = ProfessionalSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff or user.username == 'admin':
                return self.queryset
            return self.queryset.filter(owner=user)
        return self.queryset

    def perform_create(self, serializer):
        user = self.request.user
        if not (user.is_staff or user.username == 'admin'):
            count = Professional.objects.filter(owner=user).count()
            if count >= 3:
                from rest_framework.exceptions import ValidationError
                raise ValidationError("Você atingiu o limite de 3 profissionais.")
            serializer.save(owner=user)
        else:
            serializer.save()

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def upload_gallery_image(self, request, slug=None):
        professional = self.get_object()
        image = request.FILES.get('image')
        if not image:
            return Response({'error': 'Image is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        gallery_item = ProfessionalGallery.objects.create(professional=professional, image=image)
        return Response(ProfessionalGallerySerializer(gallery_item).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def unavailable_slots(self, request, slug=None):
        professional = self.get_object()
        date_str = request.query_params.get('date') # YYYY-MM-DD
        if not date_str:
            return Response({'error': 'Date is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        from datetime import datetime, timedelta
        try:
            target_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        except ValueError:
            return Response({'error': 'Invalid date format'}, status=status.HTTP_400_BAD_REQUEST)

        # Get all bookings for this professional on this date
        bookings = Booking.objects.filter(
            professional=professional,
            date_time__date=target_date,
            status__in=['pending', 'confirmed']
        )

        unavailable_slots = []
        for booking in bookings:
            start_time = booking.date_time
            duration = booking.service.duration
            end_time = start_time + timedelta(minutes=duration)
            
            # Divide slots into 30 min intervals
            current = start_time
            while current < end_time:
                unavailable_slots.append(current.strftime("%H:%M"))
                current += timedelta(minutes=30)
        
        return Response({'unavailable_slots': list(set(unavailable_slots))})

class ProfessionalGalleryViewSet(viewsets.ModelViewSet):
    queryset = ProfessionalGallery.objects.all()
    serializer_class = ProfessionalGallerySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        # Ensure only owner can delete gallery images
        if instance.professional.owner == self.request.user or self.request.user.is_staff:
            instance.delete()
        else:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You don't have permission to delete this image.")

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_queryset(self):
        professional_slug = self.request.query_params.get('professional_slug')
        if professional_slug:
            return self.queryset.filter(professional__slug=professional_slug)
        return self.queryset

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

from django.contrib.auth.models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
