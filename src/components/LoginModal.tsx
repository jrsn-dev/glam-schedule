import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate login for demonstration
        setTimeout(() => {
            setLoading(false);
            localStorage.setItem('glam-auth', 'true');
            toast.success('Acesso autorizado. Bem-vindo ao painel.');
            onClose();
            navigate('/painel');
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop with extreme blur */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
                    />

                    {/* Modal content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-10 overflow-hidden"
                    >
                        {/* Soft glow background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-muted-foreground hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative mb-10 text-center">
                            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary mb-4 block">ÁREA RESTRITA</span>
                            <h2 className="text-4xl font-display italic">Acesse o Painel</h2>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground ml-1">E-mail</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/[0.05] border border-white/5 focus:border-primary/50 outline-none px-12 py-4 text-sm font-light tracking-wide transition-all"
                                        placeholder="profissional@glam.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground ml-1">Senha</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/[0.05] border border-white/5 focus:border-primary/50 outline-none px-12 py-4 text-sm font-light tracking-wide transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-10 btn-premium flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        Entrar no Sistema
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-[10px] text-muted-foreground uppercase tracking-widest font-light">
                            Problemas com acesso? <span className="text-primary cursor-pointer hover:underline underline-offset-4">Suporte</span>
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
