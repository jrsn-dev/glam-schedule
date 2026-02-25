import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { Professional } from "@/services/data";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
    Edit3,
    Trash2,
    UserPlus,
    Star,
    Search,
    XCircle,
    X,
    Upload,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProfessionalFormModal = ({ isOpen, onClose, professional, onSuccess }: any) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Professional>>(
        professional || {
            name: "",
            specialty: "",
            rating: 5.0,
            reviewCount: 0,
            appointmentCount: 0,
            nextAvailable: "Hoje",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2000&auto=format&fit=crop"
        }
    );

    useEffect(() => {
        if (professional) setFormData(professional);
        else setFormData({
            name: "",
            specialty: "",
            rating: 5.0,
            reviewCount: 0,
            appointmentCount: 0,
            nextAvailable: "Hoje",
            image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=2000&auto=format&fit=crop"
        });
    }, [professional, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Adjust image if female
            const finalData = { ...formData };
            if (!professional && formData.gender === 'female') {
                finalData.image = "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2000&auto=format&fit=crop";
            }
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar profissional.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-xl bg-card border border-white/10 p-8 glass-panel overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-display italic text-foreground">{professional ? 'Editar' : 'Novo'} <span className="text-primary">Profissional</span></h2>
                            <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Nome Completo</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Gênero</label>
                                    <select
                                        value={formData.gender || ""}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none transition-all appearance-none"
                                        required
                                    >
                                        <option value="" disabled className="bg-zinc-900 text-foreground">Selecione o gênero</option>
                                        <option value="male" className="bg-zinc-900 text-foreground">Masculino</option>
                                        <option value="female" className="bg-zinc-900 text-foreground">Feminino</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Rating</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        min="0"
                                        max="5"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Avaliações</label>
                                    <input
                                        type="number"
                                        value={formData.reviewCount}
                                        onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Atendimentos</label>
                                    <input
                                        type="number"
                                        value={formData.appointmentCount}
                                        onChange={(e) => setFormData({ ...formData, appointmentCount: parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-4">
                                <button type="button" onClick={onClose} className="px-8 py-3 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-white transition-colors">Cancelar</button>
                                <button type="submit" disabled={loading} className="btn-premium flex items-center gap-2 !py-3 !px-10">
                                    {loading ? <Loader2 className="animate-spin" size={14} /> : professional ? 'Salvar Alterações' : 'Cadastrar Profissional'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const ProfessionalsManager = () => {
    const { user } = useAuth();
    const [professionals, setProfessionals] = useState<Professional[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPro, setSelectedPro] = useState<Professional | null>(null);

    useEffect(() => {
        fetchProfessionals();
    }, []);

    const fetchProfessionals = async () => {
        setLoading(true);
        try {
            const data = await api.getProfessionals();
            setProfessionals(data);
        } catch (error) {
            toast.error("Erro ao carregar profissionais.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (!confirm("Remover este profissional permanentemente?")) return;
        try {
            await api.deleteProfessional(slug);
            toast.success("Profissional removido.");
            setProfessionals(professionals.filter(p => p.slug !== slug));
        } catch (error) {
            toast.error("Erro ao remover profissional.");
        }
    };

    const handleEdit = (pro: Professional) => {
        setSelectedPro(pro);
        setIsModalOpen(true);
    };

    const handleNew = () => {
        setSelectedPro(null);
        setIsModalOpen(true);
    };

    const filteredPros = professionals.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const isLimitReached = !user?.is_staff && professionals.length >= 3;

    return (
        <AdminLayout
            title="Gestão de Profissionais"
            subtitle="Gerencie sua equipe, especialidades e disponibilidade."
        >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1 group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nome ou especialidade..."
                        className="w-full bg-white/5 border border-white/10 rounded-none py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleNew}
                        disabled={!loading && isLimitReached}
                        className="btn-premium flex items-center gap-2 !py-4 !px-8 text-[10px] uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <UserPlus size={16} />
                        Novo Profissional
                    </button>
                    {!user?.is_staff && (
                        <p className={`text-[9px] uppercase tracking-widest text-center font-bold ${isLimitReached ? 'text-rose-500' : 'text-muted-foreground'}`}>
                            Limite: {professionals.length} de 3 profissionais
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <AnimatePresence>
                    {filteredPros.map((pro, i) => (
                        <motion.div
                            key={pro.slug}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 border border-white/5 hover:border-primary/20 transition-all duration-300 group"
                        >
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                                <div className="w-20 h-20 bg-primary/10 flex items-center justify-center text-primary font-display text-2xl font-bold border border-primary/20 shadow-glow group-hover:scale-105 transition-transform shrink-0">
                                    {pro.initials}
                                </div>

                                <div className="flex-1 min-w-0 text-center sm:text-left">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                                        <h3 className="text-lg font-medium text-foreground truncate">{pro.name}</h3>
                                        <div className="flex items-center justify-center sm:justify-end gap-1 text-primary">
                                            <Star size={12} className="fill-primary" />
                                            <span className="text-xs font-bold">{pro.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-primary uppercase tracking-[0.2em] font-bold mb-3">{pro.specialty}</p>

                                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-[10px] text-muted-foreground uppercase tracking-widest">
                                        <span>{pro.reviewCount} Avaliações</span>
                                        <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                                        <span>{pro.appointmentCount} Atendimentos</span>
                                    </div>
                                </div>

                                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto justify-center sm:justify-start">
                                    <button onClick={() => handleEdit(pro)} className="flex-1 sm:flex-none p-3 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all flex justify-center">
                                        <Edit3 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(pro.slug)} className="flex-1 sm:flex-none p-3 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all flex justify-center">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Disponível: {pro.nextAvailable}</span>
                                </div>
                                <div className="text-[10px] uppercase tracking-widest font-bold text-primary">Ativo no Site</div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {!loading && filteredPros.length === 0 && (
                <div className="glass-panel p-20 text-center border border-white/5">
                    <XCircle size={40} className="text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-sm uppercase tracking-widest text-muted-foreground">Nenhum profissional encontrado.</p>
                </div>
            )}

            <ProfessionalFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                professional={selectedPro}
                onSuccess={fetchProfessionals}
            />
        </AdminLayout>
    );
};

export default ProfessionalsManager;
