import { useGender } from '@/contexts/GenderContext';
import { motion } from 'framer-motion';
import { Star, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

interface Professional {
  id: string;
  name: string;
  slug: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  appointmentCount: number;
  gender: 'male' | 'female';
  nextAvailable: string;
  initials: string;
}

const professionals: Professional[] = [
  { id: '1', name: 'Rafael Mendes', slug: 'rafael-mendes', specialty: 'Barbeiro Sênior', rating: 4.9, reviewCount: 127, appointmentCount: 847, gender: 'male', nextAvailable: 'Hoje às 15:30', initials: 'RM' },
  { id: '2', name: 'Lucas Costa', slug: 'lucas-costa', specialty: 'Barbeiro', rating: 4.7, reviewCount: 89, appointmentCount: 523, gender: 'male', nextAvailable: 'Amanhã às 09:00', initials: 'LC' },
  { id: '3', name: 'André Santos', slug: 'andre-santos', specialty: 'Especialista em Barba', rating: 4.8, reviewCount: 103, appointmentCount: 612, gender: 'male', nextAvailable: 'Hoje às 17:00', initials: 'AS' },
  { id: '4', name: 'Camila Alves', slug: 'camila-alves', specialty: 'Cabeleireira', rating: 4.8, reviewCount: 156, appointmentCount: 934, gender: 'female', nextAvailable: 'Hoje às 14:00', initials: 'CA' },
  { id: '5', name: 'Juliana Lima', slug: 'juliana-lima', specialty: 'Maquiadora', rating: 4.9, reviewCount: 98, appointmentCount: 445, gender: 'female', nextAvailable: 'Amanhã às 10:30', initials: 'JL' },
  { id: '6', name: 'Beatriz Rocha', slug: 'beatriz-rocha', specialty: 'Nail Designer', rating: 4.7, reviewCount: 72, appointmentCount: 388, gender: 'female', nextAvailable: 'Hoje às 16:00', initials: 'BR' },
];

const FeaturedProfessionals = () => {
  const { gender } = useGender();
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = gender ? professionals.filter((p) => p.gender === gender) : professionals;

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="glam-section-label">PROFISSIONAIS</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex items-end justify-between">
            <h2 className="glam-section-title">Quem cuida de você</h2>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-dim hover:text-primary hover:border-primary transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-dim hover:text-primary hover:border-primary transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide -mx-4 px-4"
        >
          {filtered.map((pro, i) => {
            const isMale = pro.gender === 'male';
            return (
              <motion.div
                key={pro.id}
                className="glam-card min-w-[280px] max-w-[320px] snap-start flex-shrink-0 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div
                  className={`h-48 flex items-center justify-center relative ${
                    isMale ? 'bg-male/5' : 'bg-female/5'
                  }`}
                >
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-display ${
                      isMale ? 'bg-male/20 text-male' : 'bg-female/20 text-female'
                    }`}
                  >
                    {pro.initials}
                  </div>
                  <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-success" title="Disponível" />
                </div>

                <div className="p-5">
                  <h3 className="font-display text-xl mb-0.5">{pro.name}</h3>
                  <span
                    className={`text-[11px] tracking-[0.15em] uppercase font-medium ${
                      isMale ? 'text-male' : 'text-female'
                    }`}
                  >
                    {pro.specialty}
                  </span>

                  <div className="flex items-center gap-1.5 mt-3">
                    <Star size={14} className="text-warning fill-warning" />
                    <span className="text-sm font-medium">{pro.rating}</span>
                    <span className="text-xs text-muted-foreground">({pro.reviewCount})</span>
                  </div>

                  <p className="text-xs text-muted-foreground mt-1.5">
                    {pro.appointmentCount} atendimentos realizados
                  </p>

                  <div className="flex items-center gap-1 mt-3 text-xs text-dim">
                    <Clock size={12} />
                    <span>Próximo: {pro.nextAvailable}</span>
                  </div>

                  <Link
                    to={`/profissional/${pro.slug}`}
                    className="mt-4 block w-full text-center py-2.5 rounded-lg border border-primary/60 text-primary text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  >
                    Ver perfil
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/profissionais"
            className="text-sm text-primary hover:underline underline-offset-4 transition-all"
          >
            Ver todos os profissionais →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
