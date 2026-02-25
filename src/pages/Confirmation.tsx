import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const Confirmation = () => (
  <div className="min-h-screen bg-background flex items-center justify-center px-4">
    <motion.div
      className="text-center max-w-md"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CheckCircle size={64} className="text-success mx-auto mb-6" />
      <h1 className="font-display text-4xl mb-3 text-foreground">
        Agendamento Confirmado!
      </h1>
      <p className="text-dim mb-8">
        Você receberá um lembrete por WhatsApp 1h antes do horário.
      </p>
      <Link
        to="/"
        className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:-translate-y-0.5 transition-all duration-200"
      >
        Voltar ao início
      </Link>
    </motion.div>
  </div>
);

export default Confirmation;
