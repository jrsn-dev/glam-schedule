import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useGender } from '@/contexts/GenderContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { gender, setGender } = useGender();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-lg' : ''}`}
      style={{
        background: 'rgba(10, 10, 11, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(42, 42, 50, 0.5)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display text-[22px] tracking-[0.15em] text-foreground">
            GLAM
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-dim hover:text-primary transition-colors duration-200">
              Início
            </Link>
            <Link to="/profissionais" className="text-sm text-dim hover:text-primary transition-colors duration-200">
              Profissionais
            </Link>
            <a href="#sobre" className="text-sm text-dim hover:text-primary transition-colors duration-200">
              Sobre
            </a>

            <div className="flex items-center gap-1 rounded-full border border-border p-1">
              <button
                onClick={() => setGender(gender === 'male' ? null : 'male')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  gender === 'male'
                    ? 'bg-male text-background'
                    : 'text-dim hover:text-foreground'
                }`}
              >
                ♂
              </button>
              <button
                onClick={() => setGender(gender === 'female' ? null : 'female')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  gender === 'female'
                    ? 'bg-female text-background'
                    : 'text-dim hover:text-foreground'
                }`}
              >
                ♀
              </button>
            </div>

            <Link
              to="/profissionais"
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              Agendar →
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <Link
              to="/profissionais"
              className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium"
            >
              Agendar
            </Link>
            <button className="text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
            style={{ background: 'rgba(10, 10, 11, 0.95)', backdropFilter: 'blur(20px)' }}
          >
            <div className="px-4 py-6 space-y-4">
              <Link to="/" className="block text-sm text-dim" onClick={() => setMenuOpen(false)}>
                Início
              </Link>
              <Link to="/profissionais" className="block text-sm text-dim" onClick={() => setMenuOpen(false)}>
                Profissionais
              </Link>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => { setGender(gender === 'male' ? null : 'male'); setMenuOpen(false); }}
                  className={`flex-1 py-2 rounded-full text-sm border transition-all ${
                    gender === 'male'
                      ? 'bg-male text-background border-transparent'
                      : 'border-border text-dim'
                  }`}
                >
                  ♂ Masculino
                </button>
                <button
                  onClick={() => { setGender(gender === 'female' ? null : 'female'); setMenuOpen(false); }}
                  className={`flex-1 py-2 rounded-full text-sm border transition-all ${
                    gender === 'female'
                      ? 'bg-female text-background border-transparent'
                      : 'border-border text-dim'
                  }`}
                >
                  ♀ Feminino
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
