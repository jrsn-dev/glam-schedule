import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { api } from "@/services/api";
import { toast } from "sonner";
import {
    Trash2,
    User,
    Calendar as CalendarIcon,
    Clock,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    X,
    Filter,
    ArrowRight,
    Search,
    Edit3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BookingEditModal = ({ isOpen, onClose, booking, onSuccess }: any) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>(booking || {});
    const [reservedSlots, setReservedSlots] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        if (booking) {
            setFormData(booking);
            setSelectedDate(new Date(booking.date_time));
        }
    }, [booking, isOpen]);

    useEffect(() => {
        if (booking?.professional_slug && selectedDate) {
            api.getUnavailableSlots(booking.professional_slug, selectedDate.toISOString().split('T')[0])
                .then(setReservedSlots)
                .catch(() => toast.error("Erro ao carregar horários."));
        }
    }, [selectedDate, booking?.professional_slug]);

    const timeSlots = Array.from({ length: 24 }, (_, i) => {
        const hour = Math.floor(i / 2) + 9;
        const minutes = i % 2 === 0 ? "00" : "30";
        return `${hour.toString().padStart(2, '0')}:${minutes}`;
    }).filter(t => {
        const hour = parseInt(t.split(':')[0]);
        return hour < 21;
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.updateBooking(booking.id, formData);
            toast.success("Agendamento atualizado com sucesso.");
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Erro ao atualizar agendamento.");
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
                            <h2 className="text-2xl font-display italic text-foreground">Editar <span className="text-primary">Agendamento</span></h2>
                            <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors"><X size={20} /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Nome do Cliente</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.client_name || ''}
                                        onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Telefone</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.client_phone || ''}
                                        onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">E-mail</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.client_email || ''}
                                    onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Data</label>
                                    <input
                                        type="date"
                                        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                                        onChange={(e) => {
                                            const newDate = new Date(e.target.value);
                                            setSelectedDate(newDate);
                                            // Handle timezone properly for comparison/display
                                            const currentDateTime = new Date(formData.date_time);
                                            currentDateTime.setFullYear(newDate.getFullYear());
                                            currentDateTime.setMonth(newDate.getMonth());
                                            currentDateTime.setDate(newDate.getDate() + 1); // fix for date input giving previous day
                                            setFormData({ ...formData, date_time: currentDateTime.toISOString() });
                                        }}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Horário</label>
                                    <select
                                        value={new Date(formData.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        onChange={(e) => {
                                            const [hours, minutes] = e.target.value.split(':');
                                            const newDateTime = new Date(formData.date_time);
                                            newDateTime.setHours(parseInt(hours), parseInt(minutes));
                                            setFormData({ ...formData, date_time: newDateTime.toISOString() });
                                        }}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all appearance-none"
                                    >
                                        {timeSlots.map(time => (
                                            <option key={time} value={time} className="bg-card" disabled={reservedSlots.includes(time)}>
                                                {time} {reservedSlots.includes(time) ? '(Ocupado)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Status</label>
                                <select
                                    value={formData.status || ""}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all appearance-none"
                                    required
                                >
                                    <option value="pending" className="bg-card">Pendente</option>
                                    <option value="confirmed" className="bg-card">Confirmado</option>
                                    <option value="rejected" className="bg-card">Rejeitado</option>
                                </select>
                            </div>

                            <div className="pt-4 flex justify-end gap-4">
                                <button type="button" onClick={onClose} className="px-8 py-3 text-[10px] uppercase tracking-widest font-bold text-muted-foreground hover:text-white transition-colors">Cancelar</button>
                                <button type="submit" disabled={loading} className="btn-premium flex items-center gap-2 !py-3 !px-10">
                                    {loading ? "Salvando..." : 'Salvar Alterações'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const BookingsManager = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await api.getBookings();
            setBookings(data);
        } catch (error) {
            toast.error("Erro ao carregar agendamentos.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, status: string) => {
        try {
            await api.updateBooking(id, { status });
            toast.success(`Agendamento ${status === 'confirmed' ? 'confirmado' : 'rejeitado'} com sucesso.`);
            setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
        } catch (error) {
            toast.error("Erro ao atualizar status.");
        }
    };

    const handleEdit = (booking: any) => {
        setSelectedBooking(booking);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja cancelar este agendamento?")) return;
        try {
            await api.deleteBooking(id);
            toast.success("Agendamento cancelado com sucesso.");
            setBookings(bookings.filter(b => b.id !== id));
        } catch (error) {
            toast.error("Erro ao cancelar agendamento.");
        }
    };

    const filteredBookings = bookings.filter(b =>
        (b.client_name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (b.service_name?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <AdminLayout
            title="Gestão de Reservas"
            subtitle="Monitore e gerencie todos os agendamentos da plataforma."
        >
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1 group">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar por cliente ou serviço..."
                        className="w-full bg-white/5 border border-white/10 rounded-none py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-all"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="p-4 bg-white/5 border border-white/10 text-muted-foreground hover:text-white transition-all"><Filter size={18} /></button>
                </div>
            </div>

            <div className="glass-panel overflow-hidden border border-white/5">
                {/* Desktop View */}
                <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Cliente</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Telefone</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Profissional / Serviço</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Data / Hora</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground">Status</th>
                                <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            <AnimatePresence>
                                {filteredBookings.map((booking) => (
                                    <motion.tr
                                        key={booking.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="hover:bg-white/2 transition-colors group"
                                    >
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                    <User size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{booking.client_name}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{booking.client_email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-sm text-foreground/80">{booking.client_phone || "-"}</p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-sm text-foreground/90">{booking.professional_name || "Profissional"}</p>
                                            <p className="text-[10px] text-primary uppercase tracking-widest font-bold mt-1">{booking.service_name || "Corte Gold"}</p>
                                        </td>
                                        <td className="px-6 py-6 font-display">
                                            <div className="flex items-center gap-2 text-sm text-foreground mb-1">
                                                <CalendarIcon size={14} className="text-primary" />
                                                {new Date(booking.date_time).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Clock size={14} />
                                                {new Date(booking.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={`px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                                                booking.status === 'rejected' ? 'bg-rose-500/10 text-rose-400' :
                                                    'bg-amber-500/10 text-amber-400'
                                                }`}>
                                                {booking.status === 'confirmed' ? 'Confirmado' :
                                                    booking.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button onClick={() => handleEdit(booking)} className="p-2.5 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground transition-all"><Edit3 size={16} /></button>
                                                {booking.status === 'pending' && (
                                                    <>
                                                        <button onClick={() => handleUpdateStatus(booking.id, 'confirmed')} className="p-2.5 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all"><CheckCircle2 size={16} /></button>
                                                        <button onClick={() => handleUpdateStatus(booking.id, 'rejected')} className="p-2.5 bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><XCircle size={16} /></button>
                                                    </>
                                                )}
                                                <button onClick={() => handleDelete(booking.id)} className="p-2.5 bg-white/5 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-all"><Trash2 size={16} /></button>
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
                        {filteredBookings.map((booking) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="p-6 space-y-4"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                            <User size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{booking.client_name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{booking.client_email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400' :
                                        booking.status === 'rejected' ? 'bg-rose-500/10 text-rose-400' :
                                            'bg-amber-500/10 text-amber-400'
                                        }`}>
                                        {booking.status === 'confirmed' ? 'Confirmado' :
                                            booking.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-2 border-y border-white/5">
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Serviço</p>
                                        <p className="text-xs font-bold text-primary">{booking.service_name}</p>
                                        <p className="text-[10px] text-foreground/80">{booking.professional_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Data/Hora</p>
                                        <p className="text-xs text-foreground">{new Date(booking.date_time).toLocaleDateString()}</p>
                                        <p className="text-[10px] text-muted-foreground">{new Date(booking.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <p className="text-[10px] text-muted-foreground">{booking.client_phone || "Sem telefone"}</p>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(booking)} className="p-2 bg-white/5 text-muted-foreground rounded-lg"><Edit3 size={14} /></button>
                                        {booking.status === 'pending' && (
                                            <button onClick={() => handleUpdateStatus(booking.id, 'confirmed')} className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><CheckCircle2 size={14} /></button>
                                        )}
                                        <button onClick={() => handleDelete(booking.id)} className="p-2 bg-rose-500/10 text-rose-500 rounded-lg"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {!loading && filteredBookings.length === 0 && (
                    <div className="px-6 py-20 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-4">
                            <XCircle size={40} className="text-muted-foreground/30" />
                            <p className="text-sm uppercase tracking-widest px-10">Nenhum agendamento encontrado.</p>
                        </div>
                    </div>
                )}
            </div>

            <BookingEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                booking={selectedBooking}
                onSuccess={fetchBookings}
            />
        </AdminLayout>
    );
};

export default BookingsManager;
