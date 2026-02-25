import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Professionals = () => (
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
          Nossos Profissionais
        </h1>
        <p className="text-dim text-base">
          Em breve você poderá explorar todos os nossos profissionais e agendar diretamente.
        </p>
      </motion.div>
    </div>
    <Footer />
  </div>
);

export default Professionals;
