import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-white/5 py-12 px-6">
    <div className="content-container flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-8">
        <span className="font-display text-xl tracking-[0.2em] text-foreground font-bold">
          GLAM<span className="text-primary tracking-normal">.</span>
        </span>
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/agendar" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Agendar</Link>
          <Link to="/profissionais" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Profissionais</Link>
        </nav>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram size={18} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <MessageCircle size={18} />
          </a>
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50 font-bold">
          © 2025 GLAM EXPERIENCE · SMART BOOKING
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
