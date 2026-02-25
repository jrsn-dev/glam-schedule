import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-unified.jpg';

const Hero = () => {
  return (
    <section className="relative h-[85vh] md:h-[92vh] pt-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="GLAM - Beleza & Barbearia" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-3xl"
        >
          <div className="w-px h-12 bg-primary/50 mx-auto mb-8" />

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light italic text-foreground mb-4 leading-[1.1]">
            Beleza & Estilo
          </h1>
          <h2 className="font-display text-2xl md:text-3xl font-light text-foreground/70 mb-6">
            em um só lugar
          </h2>

          <p className="font-body text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed tracking-wide">
            Agende serviços de barbearia e salão de beleza com os melhores profissionais da cidade. 
            Para ele e para ela — tudo em uma plataforma única.
          </p>

          <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground/60 tracking-[0.2em] uppercase font-body mt-8">
            <span>Barba</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>Cabelo</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>Estética</span>
            <span className="w-1 h-1 rounded-full bg-primary/40" />
            <span>Beleza</span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
