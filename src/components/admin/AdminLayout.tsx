import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

interface AdminLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}
import { useAuth } from "@/hooks/useAuth";
import { useGender } from "@/contexts/GenderContext";
import { Menu } from "lucide-react";

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title, subtitle }) => {
    const { user } = useAuth();
    const { setGender } = useGender();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    React.useEffect(() => {
        if (user?.gender) {
            setGender(user.gender as any);
        }
    }, [user, setGender]);

    return (
        <div className="min-h-screen bg-[#020202] text-foreground flex admin-panel overflow-x-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 lg:ml-64 p-6 md:p-10 relative w-full pt-20 lg:pt-10">
                {/* Mobile Header */}
                <div className="lg:hidden fixed top-4 left-4 z-[30] flex items-center justify-between w-[calc(100%-2rem)]">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-3 bg-card border border-white/10 glass-panel text-muted-foreground hover:text-white transition-all shadow-glow"
                    >
                        <Menu size={20} />
                    </button>
                    <div className="font-display text-xl tracking-[0.2em] font-bold">
                        GLAM<span className="text-primary">.</span>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-[10px] font-bold uppercase">
                        {user?.username?.substring(0, 2).toUpperCase()}
                    </div>
                </div>

                <div className="w-full">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <header className="mb-12 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="glam-section-label uppercase tracking-[0.3em] !mb-3 block">Administração</span>
                            <h1 className="text-4xl font-light italic text-foreground tracking-tight mb-2">
                                {title.split(' ').map((word, i) => (
                                    <span key={i} className={i === title.split(' ').length - 1 ? "text-primary italic" : ""}>{word} </span>
                                ))}
                            </h1>
                            {subtitle && <p className="text-muted-foreground font-light">{subtitle}</p>}
                        </motion.div>
                    </header>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative z-10"
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
