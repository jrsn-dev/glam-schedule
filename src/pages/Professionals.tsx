import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Professional } from '@/services/data';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

const Professionals = () => {
  const [pros, setPros] = useState<Professional[]>([]);

  useEffect(() => {
    api.getProfessionals().then(setPros);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO
        title="Nossos Profissionais"
        description="Conheça nossos profissionais especialistas em beleza e bem-estar. Agende seu horário online."
      />
      <Navbar />
      <div className="pt-28 pb-20 px-4 max-w-7xl mx-auto">
        <motion.div
          className="text-center max-w-lg mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl mb-4 text-foreground">
            Nossos Profissionais
          </h1>
          <p className="text-dim text-base">
            Especialistas prontos para transformar seu visual e cuidar de você.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pros.map((pro) => (
            <motion.div
              key={pro.id}
              className="glam-card overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="h-48 bg-muted flex items-center justify-center text-4xl font-display text-primary">
                {pro.initials}
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl mb-1">{pro.name}</h3>
                <p className="text-primary text-xs uppercase tracking-widest mb-4">{pro.specialty}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="text-warning fill-warning" size={16} />
                  <span className="font-bold">{pro.rating}</span>
                  <span className="text-muted-foreground text-sm">({pro.reviewCount} avaliações)</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-dim mb-6">
                  <Clock size={16} />
                  <span>Próxima: {pro.nextAvailable}</span>
                </div>
                <Link
                  to={`/profissional/${pro.slug}`}
                  className="block w-full text-center py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-transform hover:scale-[1.02]"
                >
                  Ver Perfil e Agendar
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Professionals;
