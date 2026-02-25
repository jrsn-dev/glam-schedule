import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => (
  <section className="py-24 px-6 relative overflow-hidden">
    <div
      className="absolute inset-0 bg-elevated"
      style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
    <motion.div
      className="relative max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-display text-4xl md:text-5xl italic mb-4 text-foreground">
        Pronto para se cuidar?
      </h2>
      <p className="text-dim text-base md:text-lg mb-10">
        Reserve seu horário em menos de 2 minutos
      </p>
      <Link
        to="/agendar"
        className="btn-premium !py-5 !px-12 text-[10px] uppercase tracking-[0.3em] font-bold"
      >
        Agendar agora — é grátis
      </Link>
    </motion.div>
  </section>
);

export default CTASection;
