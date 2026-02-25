import { LucideIcon, Scissors, Sparkles, Eye, Droplets, Crown, Star } from 'lucide-react';

export interface Service {
    id: string;
    name: string;
    description: string;
    duration: number;
    priceFrom: number;
    gender: 'male' | 'female';
    iconName: string; // Store icon name as string for easier serialization
    isPopular?: boolean;
}

export interface Professional {
    id: string;
    name: string;
    slug: string;
    specialty: string;
    bio: string;
    rating: number;
    reviewCount: number;
    appointmentCount: number;
    gender: 'male' | 'female';
    nextAvailable: string;
    initials: string;
    image?: string;
    phone?: string;
    email?: string;
    gallery?: Array<{ id: number; image: string; created_at: string }>;
    owner?: number;
}

export const services: Service[] = [
    { id: 'm1', name: 'Corte Clássico', description: 'Tesoura e máquina com acabamento perfeito', duration: 45, priceFrom: 45, gender: 'male', iconName: 'Scissors', isPopular: true },
    { id: 'm2', name: 'Barba Completa', description: 'Modelagem com navalha e toalha quente', duration: 30, priceFrom: 35, gender: 'male', iconName: 'Sparkles' },
    { id: 'm3', name: 'Corte + Barba', description: 'Combo completo para o homem moderno', duration: 75, priceFrom: 70, gender: 'male', iconName: 'Crown', isPopular: true },
    { id: 'm4', name: 'Hidratação Capilar', description: 'Tratamento profundo para fios saudáveis', duration: 40, priceFrom: 50, gender: 'male', iconName: 'Droplets' },
    { id: 'f1', name: 'Corte Feminino', description: 'Corte personalizado para todos os estilos', duration: 45, priceFrom: 60, gender: 'female', iconName: 'Scissors', isPopular: true },
    { id: 'f2', name: 'Escova', description: 'Modelagem com secador e escova profissional', duration: 40, priceFrom: 45, gender: 'female', iconName: 'Sparkles' },
    { id: 'f3', name: 'Progressiva', description: 'Alisamento duradouro com tratamento', duration: 120, priceFrom: 200, gender: 'female', iconName: 'Star' },
    { id: 'f5', name: 'Design de Sobrancelhas', description: 'Design perfeito para o seu rosto', duration: 30, priceFrom: 35, gender: 'female', iconName: 'Eye', isPopular: true },
];

export const professionals: Professional[] = [
    {
        id: '1',
        name: 'Rafael Mendes',
        slug: 'rafael-mendes',
        specialty: 'Barbeiro Sênior',
        bio: 'Especialista em cortes clássicos e barbas modeladas com 10 anos de experiência.',
        rating: 4.9,
        reviewCount: 127,
        appointmentCount: 847,
        gender: 'male',
        nextAvailable: 'Hoje às 15:30',
        initials: 'RM',
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2000&auto=format&fit=crop"
    },
    {
        id: '4',
        name: 'Camila Alves',
        slug: 'camila-alves',
        specialty: 'Cabeleireira Especialista',
        bio: 'Expert em colorimetria e cortes femininos modernos. Transformando visuais com arte.',
        rating: 4.8,
        reviewCount: 156,
        appointmentCount: 934,
        gender: 'female',
        nextAvailable: 'Hoje às 14:00',
        initials: 'CA',
        image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2000&auto=format&fit=crop"
    },
];
