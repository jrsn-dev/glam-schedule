import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
    User,
    Info,
    Bell,
    Shield,
    X,
    Check,
    Save,
    Upload,
    Mail,
    Phone,
    Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.username || "",
        email: user?.email || "",
        phone: "",
        position: user?.is_staff ? "Administrador" : "Profissional",
        businessName: "Agenda.AI - Matriz",
        businessPhone: "(11) 99999-9999",
        businessAddress: "Av. Paulista, 1000 - São Paulo, SP",
        notifications: true,
        emailReports: true,
        twoFactor: false
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.username,
                email: user.email,
                position: user.is_staff ? "Administrador" : "Profissional"
            }));
        }
    }, [user]);

    const tabs = [
        { id: "profile", label: "Perfil", icon: User },
        { id: "business", label: "Estabelecimento", icon: Info },
        { id: "notifications", label: "Notificações", icon: Bell },
        { id: "security", label: "Segurança", icon: Shield },
    ];

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);
        try {
            await api.updateUserProfile(user.id, {
                username: formData.name,
                email: formData.email,
                first_name: formData.name.split(' ')[0],
                last_name: formData.name.split(' ').slice(1).join(' ')
            });
            toast.success("Configurações salvas com sucesso!");
        } catch (error) {
            toast.error("Erro ao salvar configurações.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout title="Configurações">
            <div className="space-y-8 admin-panel">
                {/* Tabs Navigation */}
                <div className="flex items-center gap-1 bg-white/5 p-1 border border-white/10 w-full overflow-x-auto no-scrollbar">
                    <div className="flex gap-1 min-w-max">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${activeTab === tab.id
                                        ? "bg-primary text-primary-foreground shadow-glow"
                                        : "text-muted-foreground hover:text-white"
                                        }`}
                                >
                                    <Icon size={14} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-panel p-8 space-y-8"
                        >
                            {activeTab === "profile" && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6 pb-8 border-b border-white/10">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-display text-2xl">
                                                {formData.name.charAt(0)}
                                            </div>
                                            <button className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload size={20} className="text-white" />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-display italic text-foreground">{formData.name}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">{formData.position}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Nome Completo</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">E-mail Profissional</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Cargo / Especialidade</label>
                                            <div className="relative">
                                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={16} />
                                                <input
                                                    type="text"
                                                    value={formData.position}
                                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 pl-12 pr-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "business" && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Nome da Unidade</label>
                                        <input
                                            type="text"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Telefone Comercial</label>
                                        <input
                                            type="text"
                                            value={formData.businessPhone}
                                            onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Endereço Completo</label>
                                        <textarea
                                            rows={3}
                                            value={formData.businessAddress}
                                            onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeTab === "notifications" && (
                                <div className="space-y-6">
                                    {[
                                        { id: "notifications", title: "Notificações do Sistema", desc: "Receba alertas críticos sobre novos agendamentos e cancelamentos." },
                                        { id: "emailReports", title: "Relatórios por E-mail", desc: "Envie resumos diários de performance para o e-mail cadastrado." },
                                    ].map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/10">
                                            <div>
                                                <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                                                <p className="text-[10px] text-muted-foreground mt-1">{item.desc}</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={(formData as any)[item.id]}
                                                onChange={(e) => setFormData({ ...formData, [item.id]: e.target.checked })}
                                                className="w-5 h-5 accent-primary cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10">
                                        <div>
                                            <h4 className="text-sm font-bold text-foreground">Autenticação de Dois Fatores</h4>
                                            <p className="text-[10px] text-muted-foreground mt-1">Adicione uma camada extra de segurança à sua conta.</p>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={formData.twoFactor}
                                            onChange={(e) => setFormData({ ...formData, twoFactor: e.target.checked })}
                                            className="w-5 h-5 accent-primary cursor-pointer"
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary hover:text-white transition-colors">
                                            Alterar Senha de Acesso
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-6">
                        <div className="glass-panel p-8 border border-white/5">
                            <h4 className="text-[10px] uppercase tracking-widest text-primary font-bold mb-6">Resumo da Conta</h4>
                            <div className="space-y-4">
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Plano Atual</span>
                                    <span className="text-foreground font-bold">Expert (Anual)</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Status</span>
                                    <span className="text-green-500 font-bold flex items-center gap-1">
                                        <Check size={12} /> Ativo
                                    </span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-muted-foreground">Próxima Fatura</span>
                                    <span className="text-foreground font-bold">12 Out 2026</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="btn-premium w-full !py-4 flex items-center justify-center gap-3"
                        >
                            {loading ? "Salvando..." : (
                                <>
                                    <Save size={16} />
                                    <span>Salvar Alterações</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;
