import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Professional, Service } from '@/services/data';
import { Star, Clock, ChevronLeft, Calendar, Image as ImageIcon } from 'lucide-react';

const ProfessionalProfile = () => {
  const { slug } = useParams();
  const [pro, setPro] = useState<Professional | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      api.getProfessionalBySlug(slug).then(p => {
        if (p) {
          setPro(p);
          api.getServices(p.gender).then(setServices);
        }
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-primary">Carregando...</div>;
  if (!pro) return <div className="min-h-screen flex items-center justify-center">Profissional não encontrado.</div>;

  return (
    <div className="min-h-screen">
      <SEO
        title={`${pro.name} - ${pro.specialty}`}
        description={pro.bio}
      />
      <Navbar />

      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <Link to="/profissionais" className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary mb-12 transition-all group">
          <ChevronLeft size={18} className="translate-x-0 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Lista de Profissionais</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Header Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="glam-card p-10 text-center lg:sticky lg:top-32"
            >
              <div className="w-28 h-28 rounded-full bg-primary/5 flex items-center justify-center text-3xl font-light font-display text-primary mx-auto mb-8 border border-primary/20">
                {pro.initials}
              </div>
              <h1 className="text-3xl mb-2 font-light italic">{pro.name}</h1>
              <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-8 font-bold">{pro.specialty}</p>

              <div className="flex items-center justify-center gap-3 mb-10 py-3 border-y border-border/40">
                <Star className="text-primary fill-primary" size={14} />
                <span className="text-lg font-medium">{pro.rating}</span>
                <span className="text-muted-foreground text-[10px] uppercase tracking-widest px-2">({pro.reviewCount} Reviews)</span>
              </div>

              <div className="text-left space-y-8">
                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-3 text-muted-foreground">Essência</h4>
                  <p className="text-sm text-foreground/80 leading-relaxed font-light">
                    {pro.bio}
                  </p>
                </div>

                <div>
                  <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-3 text-muted-foreground">Próxima Sessão</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={16} className="text-primary/60" />
                    <span className="font-medium">{pro.nextAvailable}</span>
                  </div>
                </div>

                {pro.gallery && pro.gallery.length > 0 && (
                  <div className="pt-8 mt-8 border-t border-border/40">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] mb-6 text-muted-foreground flex items-center gap-2">
                      <ImageIcon size={12} className="text-primary" /> Portfólio
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {pro.gallery.map((img: any) => (
                        <div key={img.id} className="aspect-square rounded-lg overflow-hidden border border-white/5 hover:border-primary/40 transition-all group">
                          <img src={img.image} alt="Trabalho" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <span className="glam-section-label">CURADORIA DE SERVIÇOS</span>
              <h2 className="text-4xl font-light italic mt-2">Nossas Especialidades</h2>
            </div>

            <div className="space-y-6">
              {services.map((service, idx) => (
                <motion.div
                  key={service.id}
                  className="glam-card p-8 flex flex-col md:flex-row md:items-center justify-between group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex-1 mb-6 md:mb-0">
                    <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">{service.name}</h3>
                    <p className="text-sm text-muted-foreground/80 mb-4 max-w-lg font-light leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Valor</span>
                        <span className="text-primary font-medium">R$ {service.priceFrom}</span>
                      </div>
                      <div className="flex flex-col border-l border-border/60 pl-6">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Duração</span>
                        <span className="flex items-center gap-2 text-sm">
                          <Clock size={14} className="opacity-40" />
                          {service.duration} min
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/agendar"
                    state={{ serviceId: service.id, professionalId: pro.id }}
                    className="btn-premium !px-10 !py-4 text-[10px] uppercase tracking-[0.2em] w-full md:w-auto text-center"
                  >
                    Agendar Horário
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;
