import { motion } from "framer-motion";
import AdminLayout from "@/components/admin/AdminLayout";
import {
    Calendar,
    Users,
    Scissors,
    TrendingUp,
    Clock,
    ChevronRight
} from "lucide-react";

import { useEffect, useState } from "react";
import { format, isToday, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { api } from "@/services/api";

const Dashboard = () => {
    const [stats, setStats] = useState([
        { label: "Agendamentos Hoje", value: "0", icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
        { label: "Novos Clientes", value: "0", icon: Users, color: "text-primary", bg: "bg-primary/10" },
        { label: "Serviços Populares", value: "...", icon: Scissors, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Taxa de Ocupação", value: "0%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    ]);
    const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
    const [recentLogs, setRecentLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const bookings = await api.getBookings();

                // Calculate stats
                const todayBookings = bookings.filter((b: any) => isToday(parseISO(b.date_time)));
                const confirmedToday = todayBookings.filter((b: any) => b.status === 'confirmed');

                // Sort upcoming (today onwards, ascending)
                const sortedUpcoming = bookings
                    .filter((b: any) => parseISO(b.date_time) >= new Date())
                    .sort((a: any, b: any) => parseISO(a.date_time).getTime() - parseISO(b.date_time).getTime())
                    .slice(0, 3);

                // Latest creations
                const latest = [...bookings]
                    .sort((a: any, b: any) => parseISO(b.created_at).getTime() - parseISO(a.created_at).getTime())
                    .slice(0, 4);

                setUpcomingBookings(sortedUpcoming);
                setRecentLogs(latest);

                setStats([
                    { label: "Agendamentos Hoje", value: todayBookings.length.toString(), icon: Calendar, color: "text-primary", bg: "bg-primary/10" },
                    { label: "Novos Clientes", value: [...new Set(bookings.map((b: any) => b.client_email))].length.toString(), icon: Users, color: "text-primary", bg: "bg-primary/10" },
                    { label: "Serviços Populares", value: "Top", icon: Scissors, color: "text-purple-500", bg: "bg-purple-500/10" },
                    { label: "Taxa de Ocupação", value: confirmedToday.length > 0 ? "Alt." : "0%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                ]);
            } catch (error) {
                console.error("Dashboard load failed:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <AdminLayout
            title="Painel de Controle"
            subtitle="Visão geral do seu negócio e próximos passos."
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 border border-white/5 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group"
                        >
                            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-3xl -mr-12 -mt-12 transition-all group-hover:scale-150`} />
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 ${stat.bg} ${stat.color} border border-white/10`}>
                                    <Icon size={20} />
                                </div>
                                <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-[0.3em]">Insights</span>
                            </div>
                            <h3 className="text-4xl font-display italic text-foreground mb-1">{stat.value}</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Próximos Atendimentos */}
                <div className="glass-panel p-8 border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-light tracking-tight">Próximos <span className="text-primary italic">Atendimentos</span></h3>
                        <button className="text-[10px] uppercase tracking-widest text-primary font-bold hover:underline">Ver Todos</button>
                    </div>

                    <div className="space-y-6">
                        {isLoading ? (
                            <div className="text-center py-10 opacity-50 animate-pulse">Carregando...</div>
                        ) : upcomingBookings.length > 0 ? upcomingBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {booking.client_name?.substring(0, 2).toUpperCase() || "CN"}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-foreground">{booking.client_name}</h4>
                                    <p className="text-xs text-muted-foreground">{booking.service_name} • {booking.professional_name}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 text-xs text-primary font-medium mb-1">
                                        <Clock size={12} />
                                        {booking.time}
                                    </div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                                        {isToday(parseISO(booking.date_time)) ? "Hoje" : format(parseISO(booking.date_time), "dd MMM", { locale: ptBR })}
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm text-balance text-muted-foreground/80 text-center py-10 italic">Nenhum agendamento para os próximos dias.</p>
                        )}
                    </div>
                </div>

                {/* Atividade Recente */}
                <div className="glass-panel p-8 border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-light tracking-tight">Atividade <span className="text-primary italic">Recente</span></h3>
                    </div>

                    <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                        {isLoading ? (
                            <div className="text-center py-10 opacity-55 animate-pulse">Carregando dados...</div>
                        ) : recentLogs.length > 0 ? recentLogs.map((log) => (
                            <div key={log.id} className="flex items-start gap-6 relative">
                                <div className="w-8 h-8 rounded-full bg-[#020202] border-2 border-primary/30 z-10 flex items-center justify-center shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-foreground/90 leading-relaxed">
                                        <span className="text-primary font-medium">Novo agendamento</span> realizado para
                                        <span className="text-foreground"> {log.client_name}</span> para o dia {format(parseISO(log.date_time), "dd/MM 'às' HH:mm", { locale: ptBR })}.
                                    </p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-2 font-bold">
                                        {format(parseISO(log.created_at), "HH:mm", { locale: ptBR })}
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm text-balance text-muted-foreground/80 text-center py-10 italic">Sem atividades registradas recentemente.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
