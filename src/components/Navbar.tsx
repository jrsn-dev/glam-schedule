import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles, Scissors } from 'lucide-react';
import { useGender } from '@/contexts/GenderContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { gender, setGender } = useGender();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? "py-4 bg-[#020202]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        : "py-10 bg-transparent"
        }`}
    >
      <div className="content-container px-6 md:px-12 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setGender(null)}
          className="flex items-center gap-2 group relative z-50"
        >
          <span className="font-display text-3xl tracking-[0.3em] text-foreground font-bold group-hover:text-primary transition-all duration-500">
            GLAM<span className="text-primary tracking-normal">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-10">
            <button
              onClick={() => setGender('female')}
              className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 relative py-2 ${gender === 'female' ? 'text-pink-500' : 'text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100'
                }`}
            >
              <Sparkles size={14} className={gender === 'female' ? "animate-pulse" : ""} />
              Para Elas
              {gender === 'female' && (
                <motion.div layoutId="nav-gender-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
              )}
            </button>

            <button
              onClick={() => setGender('male')}
              className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-500 relative py-2 ${gender === 'male' ? 'text-blue-400' : 'text-muted-foreground hover:text-foreground opacity-60 hover:opacity-100'
                }`}
            >
              <Scissors size={14} className={gender === 'male' ? "animate-bounce" : ""} />
              Para Eles
              {gender === 'male' && (
                <motion.div layoutId="nav-gender-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-full bg-white text-[#020202] text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:bg-[#f0f0f0] hover:scale-[1.05] shadow-glow-white"
            >
              Entrar
            </Link>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-6">
          <button
            className="text-foreground p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-40 bg-background/80 md:hidden flex items-center justify-center"
          >
            <div className="text-center space-y-12 uppercase tracking-[0.5em] font-light text-sm">
              <Link to="/" className="block text-2xl" onClick={() => setMenuOpen(false)}>Início</Link>
              <Link to="/profissionais" className="block text-2xl" onClick={() => setMenuOpen(false)}>Profissionais</Link>
              <Link
                to="/login"
                className="block w-full text-2xl uppercase tracking-[0.5em]"
                onClick={() => setMenuOpen(false)}
              >
                Entrar
              </Link>
              <div className="flex flex-col gap-8 pt-8 pt-12 border-t border-white/10">
                <button
                  onClick={() => { setGender('female'); setMenuOpen(false); }}
                  className={`flex items-center justify-center gap-4 tracking-[0.5em] ${gender === 'female' ? 'text-pink-500 font-bold' : 'text-muted-foreground'}`}
                >
                  <Sparkles size={20} />
                  PARA ELAS
                </button>
                <button
                  onClick={() => { setGender('male'); setMenuOpen(false); }}
                  className={`flex items-center justify-center gap-4 tracking-[0.5em] ${gender === 'male' ? 'text-blue-400 font-bold' : 'text-muted-foreground'}`}
                >
                  <Scissors size={20} />
                  PARA ELES
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
