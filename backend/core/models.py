from django.db import models
from django.contrib.auth.models import User

class Service(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    name = models.CharField(max_length=100)
    description = models.TextField()
    duration = models.IntegerField(help_text="Duration in minutes")
    price_from = models.DecimalField(max_digits=10, decimal_places=2)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    icon_name = models.CharField(max_length=50)
    is_popular = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} ({self.gender})"

class Professional(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    specialty = models.CharField(max_length=100)
    bio = models.TextField()
    rating = models.FloatField(default=0.0)
    review_count = models.IntegerField(default=0)
    appointment_count = models.IntegerField(default=0)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    next_available = models.CharField(max_length=100)
    initials = models.CharField(max_length=5)
    image = models.ImageField(upload_to='professionals/', null=True, blank=True)
    phone = models.CharField(max_length=20, default='', blank=True)
    email = models.EmailField(default='', blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='professionals', null=True, blank=True)

    def __str__(self):
        return self.name

class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('rejected', 'Rejected'),
    ]
    professional = models.ForeignKey(Professional, on_delete=models.CASCADE, related_name='bookings')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='bookings')
    client_name = models.CharField(max_length=100)
    client_phone = models.CharField(max_length=20, default='')
    client_email = models.EmailField()
    date_time = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Booking: {self.client_name} with {self.professional.name} for {self.service.name}"

class ProfessionalGallery(models.Model):
    professional = models.ForeignKey(Professional, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='gallery/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Gallery Image for {self.professional.name}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female'), ('neutral', 'Neutral')], default='neutral')

    def __str__(self):
        return f"Profile of {self.user.username}"
