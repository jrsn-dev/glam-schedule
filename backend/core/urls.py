from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceViewSet, ProfessionalViewSet, BookingViewSet, login_view, UserViewSet, ProfessionalGalleryViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'professionals', ProfessionalViewSet)
router.register(r'bookings', BookingViewSet)
router.register(r'users', UserViewSet)
router.register(r'gallery', ProfessionalGalleryViewSet)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('', include(router.urls)),
]
