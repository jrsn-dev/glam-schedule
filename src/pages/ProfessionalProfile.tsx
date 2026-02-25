import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfessionalProfile = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 px-4 max-w-7xl mx-auto">
        <motion.div
          className="text-center max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl md:text-5xl mb-4 text-foreground">
            Perfil do Profissional
          </h1>
          <p className="text-dim text-base">
            Página de perfil para <span className="text-primary">{slug}</span> — em breve.
          </p>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfessionalProfile;
