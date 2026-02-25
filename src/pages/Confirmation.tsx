import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Confirmation = () => (
  <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

    <motion.div
      className="text-center max-w-lg relative z-10"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-10 border border-primary/20 shadow-glow">
        <CheckCircle size={40} className="text-primary" />
      </div>

      <span className="glam-section-label !mb-6">SUCESSO</span>
      <h1 className="text-4xl md:text-5xl font-light italic mb-6 text-foreground leading-tight">
        Agendamento <br />Confirmado com <span className="text-primary italic">Êxito</span>
      </h1>

      <p className="text-muted-foreground/80 mb-12 font-light leading-relaxed text-balance">
        Tudo pronto para sua transformação. Você receberá uma confirmação detalhada e um lembrete via <span className="text-foreground font-medium">WhatsApp</span> antes do horário agendado.
      </p>

      <Link
        to="/"
        className="btn-premium !py-5 !px-12 text-[10px] uppercase tracking-[0.3em] font-bold mx-auto"
      >
        Retornar ao Início
      </Link>
    </motion.div>
  </div>
);

export default Confirmation;
