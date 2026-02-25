import os
import django
import sys
from datetime import datetime, timedelta

# Build paths inside the project
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from core.models import Service, Professional

def seed():
    print("Creating admin user...")
    if not User.objects.filter(username='admin').exists():
        admin = User.objects.create_superuser('admin', 'admin@glam.com', 'admin123')
        from core.models import UserProfile
        UserProfile.objects.get_or_create(user=admin, gender='neutral')
    else:
        admin = User.objects.get(username='admin')
        from core.models import UserProfile
        UserProfile.objects.get_or_create(user=admin, gender='neutral')
    
    print("Seeding services...")
    services_data = [
        { 'name': 'Corte Clássico', 'description': 'Tesoura e máquina com acabamento perfeito', 'duration': 45, 'price_from': 45, 'gender': 'male', 'icon_name': 'Scissors', 'is_popular': True },
        { 'name': 'Barba Completa', 'description': 'Modelagem com navalha e toalha quente', 'duration': 30, 'price_from': 35, 'gender': 'male', 'icon_name': 'Sparkles' },
        { 'name': 'Corte + Barba', 'description': 'Combo completo para o homem moderno', 'duration': 75, 'price_from': 70, 'gender': 'male', 'icon_name': 'Crown', 'is_popular': True },
        { 'name': 'Hidratação Capilar', 'description': 'Tratamento profundo para fios saudáveis', 'duration': 40, 'price_from': 50, 'gender': 'male', 'icon_name': 'Droplets' },
        { 'name': 'Corte Feminino', 'description': 'Corte personalizado para todos os estilos', 'duration': 45, 'price_from': 60, 'gender': 'female', 'icon_name': 'Scissors', 'is_popular': True },
        { 'name': 'Escova', 'description': 'Modelagem com secador e escova profissional', 'duration': 40, 'price_from': 45, 'gender': 'female', 'icon_name': 'Sparkles' },
        { 'name': 'Progressiva', 'description': 'Alisamento duradouro com tratamento', 'duration': 120, 'price_from': 200, 'gender': 'female', 'icon_name': 'Star' },
        { 'name': 'Design de Sobrancelhas', 'description': 'Design perfeito para o seu rosto', 'duration': 30, 'price_from': 35, 'gender': 'female', 'icon_name': 'Eye', 'is_popular': True },
    ]
    for s in services_data:
        Service.objects.get_or_create(**s)

    print("Seeding professionals...")
    professionals_data = [
        {
            'name': 'Rafael Mendes',
            'slug': 'rafael-mendes',
            'specialty': 'Barbeiro Sênior',
            'bio': 'Especialista em cortes clássicos e barbas modeladas com 10 anos de experiência.',
            'rating': 4.9,
            'review_count': 127,
            'appointment_count': 847,
            'gender': 'male',
            'image': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=400&h=400&fit=crop',
            'next_available': 'Hoje às 15:30',
            'initials': 'RM'
        },
        {
            'name': 'Henrique Silva',
            'slug': 'henrique-silva',
            'specialty': 'Mestre em Navalha',
            'bio': 'Referência em barboterapia e cortes degrade ultra-modernos.',
            'rating': 4.7,
            'review_count': 89,
            'appointment_count': 412,
            'gender': 'male',
            'image': 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&h=400&fit=crop',
            'next_available': 'Amanhã às 09:00',
            'initials': 'HS'
        },
        {
            'name': 'Camila Alves',
            'slug': 'camila-alves',
            'specialty': 'Cabeleireira Especialista',
            'bio': 'Expert em colorimetria e cortes femininos modernos. Transformando visuais com arte.',
            'rating': 4.8,
            'review_count': 156,
            'appointment_count': 934,
            'gender': 'female',
            'image': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&fit=crop',
            'next_available': 'Hoje às 14:00',
            'initials': 'CA'
        },
        {
            'name': 'Juliana Paes',
            'slug': 'juliana-paes',
            'specialty': 'Visagista',
            'bio': 'Doutora em harmonia facial e tratamentos capilares personalizados.',
            'rating': 4.9,
            'review_count': 210,
            'appointment_count': 1102,
            'gender': 'female',
            'image': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&h=400&fit=crop',
            'next_available': 'Segunda às 10:00',
            'initials': 'JP'
        },
    ]
    for p in professionals_data:
        Professional.objects.update_or_create(slug=p['slug'], defaults=p)
    print("Done!")

if __name__ == "__main__":
    seed()
