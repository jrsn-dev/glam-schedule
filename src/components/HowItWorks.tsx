import { motion } from 'framer-motion';

const steps = [
  { num: '01', title: 'Escolha o serviço', desc: 'Filtre por gênero e especialidade para encontrar exatamente o que precisa.' },
  { num: '02', title: 'Selecione o horário', desc: 'Veja a agenda disponível do profissional e escolha o melhor momento.' },
  { num: '03', title: 'Confirme e aguarde', desc: 'Receba confirmação instantânea e lembrete por WhatsApp.' },
];

const HowItWorks = () => (
  <section className="py-20 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="glam-section-label">COMO FUNCIONA</span>
        <h2 className="glam-section-title mt-3">Simples, rápido e elegante</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <span className="font-display text-7xl font-light text-primary/10 block mb-2">
              {step.num}
            </span>
            <h3 className="text-base font-medium mb-2 font-body">{step.title}</h3>
            <p className="text-sm text-dim leading-relaxed">{step.desc}</p>

            {i < 2 && (
              <div className="hidden md:block absolute top-10 -right-4 w-8 border-t border-dashed border-border" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
