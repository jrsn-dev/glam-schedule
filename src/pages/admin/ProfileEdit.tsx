import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
    User,
    Upload,
    X,
    Save,
    Camera,
    Instagram,
    Mail,
    Phone,
    Star,
    Trash2,
    Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";

const ProfileEdit = () => {
    const { user } = useAuth();
    const [professional, setProfessional] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadProfile();
    }, [user]);

    const loadProfile = async () => {
        if (!user) return;
        try {
            const data = await api.getProfessionals();
            const myProfile = data.find((p: any) => p.owner === user.id);
            if (myProfile) {
                setProfessional(myProfile);
            }
        } catch (error) {
            toast.error("Erro ao carregar perfil.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.updateProfessional(professional.slug, professional);
            toast.success("Perfil atualizado com sucesso!");
        } catch (error) {
            toast.error("Erro ao atualizar perfil.");
        } finally {
            setSaving(false);
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !professional) return;

        setUploading(true);
        try {
            const newItem = await api.uploadGalleryImage(professional.slug, file);
            setProfessional({
                ...professional,
                gallery: [...(professional.gallery || []), newItem]
            });
            toast.success("Imagem adicionada à galeria!");
        } catch (error) {
            toast.error("Erro ao fazer upload da imagem.");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteGalleryItem = async (id: number) => {
        try {
            await api.deleteGalleryImage(id);
            setProfessional({
                ...professional,
                gallery: professional.gallery.filter((img: any) => img.id !== id)
            });
            toast.success("Imagem removida.");
        } catch (error) {
            toast.error("Erro ao remover imagem.");
        }
    };

    if (loading) return <div className="p-8 text-center text-muted-foreground">Carregando...</div>;
    if (!professional) return <div className="p-8 text-center text-muted-foreground">Perfil profissional não encontrado.</div>;

    return (
        <AdminLayout title="Meu Perfil">
            <div className="space-y-8 admin-panel pb-20">
                <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Basic Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-panel p-8 space-y-8">
                            <div className="flex items-center gap-6 pb-8 border-b border-white/10">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display text-4xl overflow-hidden">
                                        {professional.image ? (
                                            <img src={professional.image} alt={professional.name} className="w-full h-full object-cover" />
                                        ) : professional.initials}
                                    </div>
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera size={20} className="text-white" />
                                        <input type="file" className="hidden" />
                                    </label>
                                </div>
                                <div>
                                    <h3 className="text-xl font-display italic text-foreground">{professional.name}</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1 text-primary">
                                            <Star size={12} fill="currentColor" />
                                            <span className="text-xs font-bold">{professional.rating}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground">{professional.appointmentCount} atendimentos</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Nome Profissional</label>
                                    <input
                                        type="text"
                                        value={professional.name}
                                        onChange={e => setProfessional({ ...professional, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Especialidade Principal</label>
                                    <input
                                        type="text"
                                        value={professional.specialty}
                                        onChange={e => setProfessional({ ...professional, specialty: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">E-mail</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                        <input
                                            type="email"
                                            value={professional.email || ''}
                                            onChange={e => setProfessional({ ...professional, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">WhatsApp</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                        <input
                                            type="text"
                                            value={professional.phone || ''}
                                            onChange={e => setProfessional({ ...professional, phone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Biografia / Descrição</label>
                                    <textarea
                                        rows={4}
                                        value={professional.bio}
                                        onChange={e => setProfessional({ ...professional, bio: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <div className="glass-panel p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold">Galeria de Trabalhos</h4>
                                <label className="btn-premium !py-2 !px-4 text-[10px] flex items-center gap-2 cursor-pointer">
                                    {uploading ? "Enviando..." : (
                                        <>
                                            <Upload size={14} />
                                            Adicionar Foto
                                        </>
                                    )}
                                    <input type="file" className="hidden" onChange={handleGalleryUpload} accept="image/*" />
                                </label>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <AnimatePresence>
                                    {professional.gallery?.map((img: any) => (
                                        <motion.div
                                            key={img.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            className="relative aspect-square group"
                                        >
                                            <img src={img.image} alt="Gallery" className="w-full h-full object-cover border border-white/10" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteGalleryItem(img.id)}
                                                    className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {(!professional.gallery || professional.gallery.length === 0) && (
                                    <div className="col-span-full py-12 flex flex-col items-center justify-center border border-dashed border-white/10 bg-white/2">
                                        <ImageIcon className="text-white/10 mb-4" size={32} />
                                        <p className="text-xs text-muted-foreground italic">Nenhuma foto adicionada ainda.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="space-y-6">
                        <div className="glass-panel p-8 border border-white/5 sticky top-8">
                            <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-6">Status do Perfil</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Visibilidade</span>
                                    <span className="text-green-500 font-bold">Público</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">URL do Perfil</span>
                                    <span className="text-primary font-bold">/{professional.slug}</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="btn-premium w-full !py-4 flex items-center justify-center gap-3 mt-8"
                            >
                                {saving ? "Salvando..." : (
                                    <>
                                        <Save size={16} />
                                        <span>Salvar Alterações</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
};

export default ProfileEdit;
