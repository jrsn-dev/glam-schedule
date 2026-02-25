import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-border py-16 px-4 bg-background">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div>
          <span className="font-display text-2xl tracking-[0.1em] text-foreground">GLAM</span>
          <p className="mt-3 text-sm text-dim leading-relaxed">
            Agendamento de serviços de beleza com elegância e praticidade.
          </p>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4 font-body">
            Masculino
          </h4>
          <ul className="space-y-2.5">
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Corte</Link></li>
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Barba</Link></li>
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Hidratação</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4 font-body">
            Feminino
          </h4>
          <ul className="space-y-2.5">
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Cabelo</Link></li>
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Sobrancelha</Link></li>
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Unhas</Link></li>
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Maquiagem</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.15em] uppercase text-muted-foreground mb-4 font-body">
            Empresa
          </h4>
          <ul className="space-y-2.5">
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Sobre nós</Link></li>
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Seja parceiro</Link></li>
            <li><Link to="/" className="text-sm text-dim hover:text-primary transition-colors">Contato</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-muted-foreground">© 2025 GLAM · Todos os direitos reservados</span>
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-dim hover:text-primary hover:border-primary transition-colors"
          >
            <Instagram size={16} />
          </a>
          <a
            href="#"
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-dim hover:text-primary hover:border-primary transition-colors"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
