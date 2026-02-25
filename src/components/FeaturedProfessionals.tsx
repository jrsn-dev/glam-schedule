import { User, Star, ArrowRight, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { api } from '@/services/api';
import { Professional } from '@/services/data';
import { useGender } from '@/contexts/GenderContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FeaturedProfessionals = () => {
  const { gender } = useGender();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getProfessionals().then(setProfessionals);
  }, []);

  // Show all if gender is null, otherwise filter strictly
  const filtered = gender ? professionals.filter(p => p.gender === gender) : professionals;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by one full card width (which is 50% of clientWidth on desktop)
      const scrollAmount = clientWidth / 2;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 border-t border-white/5" id="profissionais">
      <div className="max-w-7xl mx-auto px-6 mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="glam-section-label">TIME DE ELITE</span>
          <h2 className="glam-section-title mt-4">Nossos Mestres</h2>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => scroll('left')}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 group"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-500 group"
            aria-label="Próximo"
          >
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 gap-0"
      >
        {filtered.map((pro, i) => (
          <motion.div
            key={pro.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="min-w-full lg:min-w-[50%] p-4 md:p-8 snap-start group"
          >
            <div className="glass-panel p-8 md:p-10 flex flex-col md:flex-row gap-10 items-center md:items-start group-hover:border-primary/20 transition-all duration-700 relative overflow-hidden h-full">
              {/* Decorative Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-all duration-1000" />

              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-primary/20 transition-all duration-700 shadow-2xl">
                  {pro.image ? (
                    <img
                      src={pro.image}
                      alt={pro.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-4xl font-display text-primary">
                      {pro.initials}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-3 -right-3 w-12 h-12 rounded-full bg-[#050508] border border-white/10 flex items-center justify-center shadow-2xl z-10">
                  <Award size={22} className="text-primary" />
                </div>
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary">{pro.specialty}</span>
                <h3 className="text-3xl md:text-4xl font-display italic tracking-tight group-hover:text-primary transition-colors duration-500">{pro.name}</h3>

                <div className="flex items-center justify-center md:justify-start gap-6 py-4 border-y border-white/5">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-primary fill-primary" />
                    <span className="text-xs font-bold font-body">{pro.rating}</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold">{pro.reviewCount} Avaliações</span>
                </div>

                <p className="text-sm text-balance text-muted-foreground/80 font-light leading-relaxed pt-2 line-clamp-3">
                  {pro.bio || "Especialista em técnicas avançadas e visagismo premium com foco em resultados impecáveis e estilo único."}
                </p>

                <Link
                  to="/agendar"
                  state={{ professionalId: pro.id }}
                  className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-primary pt-6 group/btn transition-all hover:gap-5"
                >
                  Agendar agora
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
