import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Scissors,
    Calendar,
    LogOut,
    Settings,
    ChevronRight,
    UserCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X as CloseIcon } from "lucide-react";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const menuItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/painel" },
        { icon: Calendar, label: "Agendamentos", path: "/painel/bookings" },
        { icon: UserCircle, label: "Meu Perfil", path: "/painel/profile" },
        { icon: Users, label: "Profissionais", path: "/painel/professionals" },
        { icon: Scissors, label: "Serviços", path: "/painel/services" },
        { icon: Settings, label: "Configurações", path: "/painel/settings" },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
                    />
                )}
            </AnimatePresence>

            <aside className={`w-64 h-screen fixed left-0 top-0 border-r border-white/10 glass-panel z-[50] flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className="p-8 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="font-display text-2xl tracking-[0.2em] text-foreground font-bold group-hover:text-primary transition-colors">
                            GLAM<span className="text-primary tracking-normal">.</span>
                        </span>
                    </Link>
                    <button onClick={onClose} className="lg:hidden text-muted-foreground hover:text-white">
                        <CloseIcon size={20} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground px-4 mb-4 block">
                        Menu Principal
                    </span>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground border border-transparent"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} className={isActive ? "text-primary" : "group-hover:text-primary transition-colors"} />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                                {isActive && <ChevronRight size={14} />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-all duration-300 group"
                    >
                        <LogOut size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium">Sair do Sistema</span>
                    </button>
                </div>
            </aside>
        </>
    );
};
import { AnimatePresence, motion } from "framer-motion";

export default Sidebar;
