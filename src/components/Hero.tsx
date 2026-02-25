import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, User, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { useGender } from '@/contexts/GenderContext';

const Hero = () => {
  const { gender, setGender } = useGender();
  const steps = [
    { icon: Scissors, label: 'Serviço' },
    { icon: User, label: 'Profissional' },
    { icon: Calendar, label: 'Horário' },
    { icon: CheckCircle, label: 'Pronto' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Dynamic Background Image based on Gender Selection */}
      <AnimatePresence mode="wait">
        {!gender ? (
          <motion.div
            key="dual-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0 flex w-full h-full"
          >
            <div className="relative flex-1 h-full overflow-hidden">
              <img src="/src/assets/feme saloon.jpg" className="w-full h-full object-cover" alt="" />
              {/* Left side soft fade */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-transparent opacity-80" />
            </div>

            {/* Absolute Centered Blend Layer */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-64 z-10 bg-gradient-to-r from-transparent via-[#020202] to-transparent" />

            <div className="relative flex-1 h-full overflow-hidden">
              <img src="/src/assets/male saloon.jpg" className="w-full h-full object-cover" alt="" />
              {/* Right side soft fade */}
              <div className="absolute inset-0 bg-gradient-to-l from-[#020202] via-transparent to-transparent opacity-80" />
            </div>
            {/* General Bottom Fade */}
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-[#020202]/20 to-[#020202]" />
          </motion.div>
        ) : (
          <motion.div
            key={gender}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0 w-full h-full"
          >
            <img
              src={gender === 'female' ? "/src/assets/feme saloon.jpg" : "/src/assets/male saloon.jpg"}
              className="w-full h-full object-cover"
              alt=""
            />
            {/* Smooth gradient fade to bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020202]/30 to-[#020202]" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#020202] to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Golden Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-1">
        <motion.div
          animate={{
            opacity: [0.01, 0.03, 0.01],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[160px] rounded-full"
        />
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="glam-section-label group cursor-default">
              SISTEMA INTELIGENTE DE AGENDAMENTO
              <span className="block h-px w-12 bg-primary mt-2 mx-auto transition-all duration-500 group-hover:w-24" />
            </span>

            <h1 className="text-balance mb-16 font-bold leading-tight tracking-tighter sm:text-7xl">
              A Revolução do <span className="text-primary glow-animation">Agendamento</span> <br />
              <span className="font-light">Simples. Rápido.</span> <b>Premium.</b>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex justify-center"
            >
              <Link to="/agendar" className="btn-premium w-full sm:w-auto min-w-[320px] text-lg">
                Começar Experiência
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
