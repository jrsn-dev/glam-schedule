import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, User, Lock, ArrowRight, Home, Loader2 } from "lucide-react";
import { api } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import { useGender } from "@/contexts/GenderContext";
import SEO from "@/components/SEO";
import { toast } from "sonner";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const { setGender } = useGender();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/painel");
        }
        setGender(null);
    }, [setGender, isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.login(username, password);
            login(response.user, response.token);
            toast.success("Login realizado com sucesso!");
            navigate("/painel");
        } catch (error) {
            toast.error("Erro ao autenticar. Verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6 bg-[#020202]">
            <div className="content-container flex items-center justify-center">
                <SEO
                    title="Login Administrativo | GLAM."
                    description="Área restrita para profissionais e administradores do sistema GLAM."
                />

                {/* Background Glow */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md relative z-10"
                >
                    <div className="glass-panel p-10 border border-primary/20 shadow-2xl">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 rounded-none bg-primary/10 flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-glow">
                                <LogIn size={28} className="text-primary" />
                            </div>
                            <span className="glam-section-label uppercase tracking-[0.3em] !mb-4 block">Acesso Restrito</span>
                            <h1 className="text-3xl font-light italic text-foreground tracking-tight">
                                Área do <span className="text-primary">Profissional</span>
                            </h1>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">
                                    Usuário
                                </label>
                                <div className="relative group">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-none py-4 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-light"
                                        placeholder="admin"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground ml-1">
                                    Senha
                                </label>
                                <div className="relative group">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-none py-4 pl-12 pr-4 text-sm text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-light"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-premium w-full flex items-center justify-center gap-3 !py-5 uppercase text-[10px] tracking-[0.3em] font-bold mt-4"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        Entrar no Painel
                                        <ArrowRight size={14} />
                                    </>
                                )}
                            </button>
                        </form>

                        <Link
                            to="/"
                            className="flex items-center justify-center gap-2 mt-10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Home size={12} />
                            Voltar para o Início
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
