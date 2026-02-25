import { useGender } from '@/contexts/GenderContext';
import { motion } from 'framer-motion';
import { Scissors, Sparkles, Eye, Droplets, Flame, Crown, Star, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { api } from '@/services/api';
import { Service } from '@/services/data';
import { Link } from 'react-router-dom';

const iconMap: Record<string, LucideIcon> = {
  Scissors, Sparkles, Eye, Droplets, Flame, Crown, Star, Clock
};

const FeaturedServices = () => {
  const { gender } = useGender();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    api.getServices().then(setServices);
  }, []);

  const filtered = gender ? services.filter((s) => s.gender === gender) : services;

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

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {filtered.map((service, i) => {
              const Icon = iconMap[service.iconName] || Scissors;
              const isMale = service.gender === 'male';

              return (
                <CarouselItem key={service.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    className="p-8 h-full hover:-translate-y-2 relative overflow-hidden group transition-all duration-700 rounded-none border-b border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                  >
                    {service.isPopular && (
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-medium tracking-wider font-body">
                        Mais pedido
                      </span>
                    )}

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-4 ${isMale ? 'bg-male/10' : 'bg-female/10'
                        }`}
                      aria-hidden="true"
                    >
                      <Icon size={18} className={isMale ? 'text-male' : 'text-female'} />
                    </div>

                    <h3 className="text-2xl mb-3 font-medium tracking-tight group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-sm md:text-base text-muted-foreground/80 mb-8 line-clamp-2 font-light leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center justify-between mb-8 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Iniciando em</span>
                        <span className="text-lg font-medium text-primary">
                          R$ {service.priceFrom}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 border border-border/40 px-3 py-1 rounded-full flex items-center gap-2">
                        <Clock size={12} className="opacity-40" />
                        {service.duration} MIN
                      </span>
                    </div>

                    <Link
                      to="/agendar"
                      state={{ serviceId: service.id }}
                      className="block w-full text-center py-4 rounded-full bg-secondary/50 border border-border/40 text-foreground text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-primary hover:text-primary-foreground hover:border-transparent transition-all duration-500 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2"
                      aria-label={`Agendar ${service.name}`}
                    >
                      Agendar Agora
                    </Link>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-end gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedServices;
