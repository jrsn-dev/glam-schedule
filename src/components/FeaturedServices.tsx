import { useGender } from '@/contexts/GenderContext';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, Eye, Droplets, Flame, Crown, Star, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  priceFrom: number;
  gender: 'male' | 'female';
  icon: LucideIcon;
  isPopular?: boolean;
}

const services: Service[] = [
  { id: 'm1', name: 'Corte Clássico', description: 'Tesoura e máquina com acabamento perfeito', duration: 45, priceFrom: 45, gender: 'male', icon: Scissors, isPopular: true },
  { id: 'm2', name: 'Barba Completa', description: 'Modelagem com navalha e toalha quente', duration: 30, priceFrom: 35, gender: 'male', icon: Sparkles },
  { id: 'm3', name: 'Corte + Barba', description: 'Combo completo para o homem moderno', duration: 75, priceFrom: 70, gender: 'male', icon: Crown, isPopular: true },
  { id: 'm4', name: 'Hidratação Capilar', description: 'Tratamento profundo para fios saudáveis', duration: 40, priceFrom: 50, gender: 'male', icon: Droplets },
  { id: 'm5', name: 'Pigmentação de Barba', description: 'Cobertura de falhas e uniformização', duration: 45, priceFrom: 60, gender: 'male', icon: Eye },
  { id: 'm6', name: 'Sobrancelha Masculina', description: 'Design limpo e natural', duration: 15, priceFrom: 20, gender: 'male', icon: Eye },
  { id: 'm7', name: 'Relaxamento', description: 'Alisamento suave e controle de volume', duration: 60, priceFrom: 80, gender: 'male', icon: Sparkles },
  { id: 'm8', name: 'Hot Towel', description: 'Tratamento facial com toalha quente', duration: 20, priceFrom: 25, gender: 'male', icon: Flame },
  { id: 'f1', name: 'Corte Feminino', description: 'Corte personalizado para todos os estilos', duration: 45, priceFrom: 60, gender: 'female', icon: Scissors, isPopular: true },
  { id: 'f2', name: 'Escova', description: 'Modelagem com secador e escova profissional', duration: 40, priceFrom: 45, gender: 'female', icon: Sparkles },
  { id: 'f3', name: 'Progressiva', description: 'Alisamento duradouro com tratamento', duration: 120, priceFrom: 200, gender: 'female', icon: Star },
  { id: 'f4', name: 'Coloração', description: 'Cor vibrante e duradoura para seus fios', duration: 90, priceFrom: 150, gender: 'female', icon: Sparkles },
  { id: 'f5', name: 'Design de Sobrancelhas', description: 'Design perfeito para o seu rosto', duration: 30, priceFrom: 35, gender: 'female', icon: Eye, isPopular: true },
  { id: 'f6', name: 'Manicure', description: 'Cuidado completo para suas unhas', duration: 40, priceFrom: 30, gender: 'female', icon: Crown },
  { id: 'f7', name: 'Maquiagem Social', description: 'Look perfeito para qualquer ocasião', duration: 60, priceFrom: 120, gender: 'female', icon: Sparkles },
  { id: 'f8', name: 'Limpeza de Pele', description: 'Pele renovada e radiante', duration: 50, priceFrom: 80, gender: 'female', icon: Droplets },
];

const FeaturedServices = () => {
  const { gender } = useGender();

  const filtered = gender
    ? services.filter((s) => s.gender === gender)
    : services.filter((_, i) => i < 8);

  return (
    <section className="py-20 px-4" id="servicos">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="glam-section-label">SERVIÇOS</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <h2 className="glam-section-title">Escolha o que você precisa</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((service, i) => {
            const Icon = service.icon;
            const isMale = service.gender === 'male';

            return (
              <motion.div
                key={service.id}
                className="glam-card p-6 hover:-translate-y-1 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                {service.isPopular && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-medium tracking-wider">
                    Mais pedido
                  </span>
                )}

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${
                    isMale ? 'bg-male/10' : 'bg-female/10'
                  }`}
                >
                  <Icon size={18} className={isMale ? 'text-male' : 'text-female'} />
                </div>

                <h3 className="font-display text-xl mb-1">{service.name}</h3>
                <p className="text-[13px] text-muted-foreground mb-4 line-clamp-2">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm text-primary font-medium">
                    a partir de R$ {service.priceFrom}
                  </span>
                  <span className="text-xs text-muted-foreground bg-elevated px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock size={10} />
                    {service.duration} min
                  </span>
                </div>

                <button className="w-full py-2.5 rounded-lg border border-primary/60 text-primary text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                  Agendar
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
