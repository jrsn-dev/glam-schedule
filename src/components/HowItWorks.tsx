import { motion } from 'framer-motion';
import { Scissors, User, CalendarCheck } from 'lucide-react';

const steps = [
  {
    num: 1,
    icon: Scissors,
    title: 'Escolha o Serviço',
    desc: 'Selecione entre cortes, barba, tratamentos e muito mais.'
  },
  {
    num: 2,
    icon: User,
    title: 'Escolha o Profissional',
    desc: 'Agende com seu barbeiro ou estilista favorito.'
  },
  {
    num: 3,
    icon: CalendarCheck,
    title: 'Confirme o Horário',
    desc: 'Escolha a data e horário que melhor se adequa a você.'
  },
];

const HowItWorks = () => (
  <section className="py-24 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <span className="text-primary text-[10px] font-bold tracking-[0.5em] uppercase block mb-4">SIMPLES E RÁPIDO</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Como Funciona</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="glam-card group p-10 text-center flex flex-col items-center border border-white/5 bg-secondary/20"
          >
            <div className="relative mb-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background border border-primary text-primary text-[10px] items-center justify-center flex font-bold shadow-glow z-20">
                {step.num}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-glow">
                <step.icon size={28} />
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4 text-white font-display tracking-tight leading-tight">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px] font-light">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
