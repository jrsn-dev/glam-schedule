import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { Service } from "@/services/data";
import { toast } from "sonner";
import {
    Plus,
    Edit3,
    Trash2,
    Search,
    XCircle,
    Tag,
    Clock,
    DollarSign,
    X,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ServiceFormModal = ({ isOpen, onClose, service, onSuccess }: any) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Service>>(
        service || { name: "", description: "", priceFrom: 0, duration: 30, gender: 'female' }
    );

    useEffect(() => {
        if (service) setFormData(service);
        else setFormData({ name: "", description: "", priceFrom: 0, duration: 30, gender: 'female' });
    }, [service, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (service) {
                await api.updateService(service.id, formData);
                toast.success("Serviço atualizado com sucesso.");
            } else {
                await api.createService(formData as Service);
                toast.success("Serviço cadastrado com sucesso.");
            }
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Erro ao salvar serviço.");
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
                            <h2 className="text-2xl font-display italic text-foreground">{service ? 'Editar' : 'Novo'} <span className="text-primary">Serviço</span></h2>
                            <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Nome do Serviço</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Descrição Curta</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Preço Base (R$)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.priceFrom}
                                        onChange={(e) => setFormData({ ...formData, priceFrom: parseFloat(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Duração (min)</label>
                                    <input
                                        type="number"
                                        required
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground">Público</label>
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-foreground focus:border-primary/50 outline-none transition-all appearance-none"
                                    >
                                        <option value="female" className="bg-zinc-900 text-foreground">Feminino</option>
                                        <option value="male" className="bg-zinc-900 text-foreground">Masculino</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Ícone (Nome Lucide)</label>
                                    <input
                                        type="text"
                                        value={formData.iconName || 'Scissors'}
                                        onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                        placeholder="Ex: Scissors, Sparkles..."
                                    />
                                </div>
                                <div className="flex items-center gap-3 pt-6">
                                    <input
                                        type="checkbox"
                                        id="isPopular"
                                        checked={formData.isPopular}
                                        onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                                        className="w-4 h-4 accent-primary"
                                    />
                                    <label htmlFor="isPopular" className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold cursor-pointer">Popular</label>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-4">
                                <button type="button" onClick={onClose} className="px-8 py-3 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-white transition-colors">Cancelar</button>
                                <button type="submit" disabled={loading} className="btn-premium flex items-center gap-2 !py-3 !px-10">
                                    {loading ? <Loader2 className="animate-spin" size={14} /> : service ? 'Salvar Alterações' : 'Cadastrar Serviço'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const ServicesManager = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        setLoading(true);
        try {
            const data = await api.getServices();
            setServices(data);
        } catch (error) {
            toast.error("Erro ao carregar serviços.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Remover este serviço do catálogo?")) return;
        try {
            await api.deleteService(id);
            toast.success("Serviço removido.");
            setServices(services.filter(s => s.id !== id));
        } catch (error) {
            toast.error("Erro ao remover serviço.");
        }
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    const handleNew = () => {
        setSelectedService(null);
        setIsModalOpen(true);
    };

    const filteredServices = services.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout
            title="Gestão de Serviços"
            subtitle="Configure o catálogo de experiências oferecidas."
        >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1 group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por nome do serviço..."
                        className="w-full bg-white/5 border border-white/10 rounded-none py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                </div>
                <button onClick={handleNew} className="btn-premium flex items-center gap-2 !py-4 !px-8 text-[10px] uppercase tracking-widest font-bold">
                    <Plus size={16} />
                    Novo Serviço
                </button>
            </div>

            <div className="glass-panel overflow-hidden border border-white/5">
                {/* Desktop View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Serviço</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Público</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Duração</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Preço Base</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence>
                                {filteredServices.map((service) => (
                                    <motion.tr
                                        key={service.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-white/2 transition-colors group"
                                    >
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                    <Tag size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{service.name}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate max-w-xs">{service.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${service.gender === 'male' ? 'bg-blue-500/10 text-blue-400' : 'bg-rose-500/10 text-rose-400'
                                                }`}>
                                                {service.gender === 'male' ? 'Masculino' : 'Feminino'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2 text-sm text-foreground">
                                                <Clock size={14} className="text-primary" />
                                                {service.duration} min
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 font-display">
                                            <div className="flex items-center gap-1 text-sm text-foreground">
                                                <DollarSign size={14} className="text-primary" />
                                                {(service.priceFrom || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => handleEdit(service)} className="p-2.5 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all duration-300">
                                                    <Edit3 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(service.id)} className="p-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="lg:hidden divide-y divide-white/5">
                    <AnimatePresence>
                        {filteredServices.map((service) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="p-6 space-y-4"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                            <Tag size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{service.name}</p>
                                            <span className={`inline-block px-2 py-0.5 text-[8px] uppercase tracking-widest font-bold mt-1 ${service.gender === 'male' ? 'bg-blue-500/10 text-blue-400' : 'bg-rose-500/10 text-rose-400'
                                                }`}>
                                                {service.gender === 'male' ? 'Masc' : 'Fem'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 font-display text-sm text-foreground">
                                        <DollarSign size={12} className="text-primary" />
                                        {(service.priceFrom || 0).toLocaleString('pt-BR')}
                                    </div>
                                </div>

                                <p className="text-[10px] text-muted-foreground line-clamp-2">{service.description}</p>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                        <Clock size={12} />
                                        {service.duration} min
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(service)} className="p-2 bg-white/5 text-muted-foreground rounded-lg transition-all active:scale-95"><Edit3 size={14} /></button>
                                        <button onClick={() => handleDelete(service.id)} className="p-2 bg-rose-500/10 text-rose-500 rounded-lg transition-all active:scale-95"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {!loading && filteredServices.length === 0 && (
                    <div className="px-6 py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-4">
                            <XCircle size={40} className="text-muted-foreground/30" />
                            <p className="text-sm uppercase tracking-widest px-10">Nenhum serviço encontrado.</p>
                        </div>
                    </div>
                )}
            </div>

            <ServiceFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                service={selectedService}
                onSuccess={fetchServices}
            />
        </AdminLayout>
    );
};

export default ServicesManager;
