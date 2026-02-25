import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import {
    ChevronLeft,
    ChevronRight,
    Check,
    Clock,
    Calendar,
    User,
    Scissors,
    ArrowRight,
    Star,
    Sparkles
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Service, Professional } from "@/services/data";
import { useGender } from "@/contexts/GenderContext";
import { format, addDays, startOfToday, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

const steps = [
    { id: 1, name: "Serviço", icon: Scissors },
    { id: 2, name: "Profissional", icon: User },
    { id: 3, name: "Horário", icon: Clock },
    { id: 4, name: "Finalizar", icon: Sparkles },
];

const BookingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(1);
    const [services, setServices] = useState<Service[]>([]);
    const [professionals, setProfessionals] = useState<Professional[]>([]);

    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { gender } = useGender();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        setLoading(true);
        Promise.all([api.getServices(), api.getProfessionals()]).then(([servs, pros]) => {
            // Strictly filter by gender if selected
            const filteredServices = gender ? servs.filter(s => s.gender === gender) : servs;
            const filteredPros = gender ? pros.filter(p => p.gender === gender) : pros;

            setServices(filteredServices);
            setProfessionals(filteredPros);
            setLoading(false);

            const state = location.state as { serviceId?: string; professionalId?: string };
            let step = 1;

            if (state?.professionalId) {
                const p = filteredPros.find(pro => pro.id === state.professionalId);
                if (p) setSelectedProfessional(p);
            }

            if (state?.serviceId) {
                const s = filteredServices.find(srv => srv.id === state.serviceId);
                if (s) {
                    setSelectedService(s);
                    // If we have both, go to time selection
                    if (state.professionalId) step = 3;
                    else step = 2; // Only service, select professional next
                }
            } else if (state?.professionalId) {
                // Only professional, select service next
                step = 1;
            }

            setCurrentStep(step);
        });
    }, [location, gender]);

    const availableDates = Array.from({ length: 14 }, (_, i) => addDays(startOfToday(), i));
    const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];

    const handleNext = () => {
        let nextStep = currentStep + 1;
        // If we just selected a service (step 1) and already have a professional, skip to step 3
        if (nextStep === 2 && selectedProfessional) {
            nextStep = 3;
        }
        if (nextStep < 5) setCurrentStep(nextStep);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
        else navigate(-1);
    };

    const [reservedSlots, setReservedSlots] = useState<string[]>([]);

    useEffect(() => {
        if (selectedProfessional && selectedDate) {
            api.getUnavailableSlots(selectedProfessional.slug, format(selectedDate, "yyyy-MM-dd"))
                .then(setReservedSlots)
                .catch(() => toast.error("Erro ao carregar horários."));
        }
    }, [selectedProfessional, selectedDate]);

    const isSlotAvailable = (time: string) => {
        if (reservedSlots.includes(time)) return false;
        if (!selectedService) return true;

        const duration = selectedService.duration;
        const slotsNeeded = Math.ceil(duration / 30);
        const timeIndex = timeSlots.indexOf(time);

        for (let i = 0; i < slotsNeeded; i++) {
            const checkTime = timeSlots[timeIndex + i];
            if (!checkTime || reservedSlots.includes(checkTime)) return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await api.createBooking({
                service_id: selectedService?.id,
                professional_id: selectedProfessional?.id,
                date: format(selectedDate, "yyyy-MM-dd"),
                time: selectedTime,
                client_name: formData.name,
                client_phone: formData.phone,
                client_email: formData.email,
            });
            navigate("/confirmar");
        } catch (error) {
            console.error("Erro ao criar agendamento:", error);
            toast.error("Erro ao realizar agendamento. Verifique se o horário ainda está livre.");
        } finally {
            setLoading(false);
        }
    };

    const stepVariants = {
        hidden: { opacity: 0, scale: 0.98, y: 10 },
        visible: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 1.02, y: -10 }
    };

    return (
        <div className="min-h-screen bg-[#020202]">
            <SEO title="Reservar Experiência" description="Agende seu horário com os melhores especialistas." />
            <Navbar />

            <main className="pt-40 pb-20 px-6 content-container">
                {/* Visual Header */}
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glam-section-label"
                    >
                        RESERVA ONLINE
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-balance font-bold leading-tight tracking-tighter mt-4"
                    >
                        Sua Experiência <span className="text-primary italic">Premium</span>
                    </motion.h1>
                </div>

                {/* Immersive Step Indicator */}
                <div className="mb-20 max-w-3xl mx-auto">
                    <div className="flex items-center justify-between relative px-2">
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-white/5 -z-10" />
                        <motion.div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-primary -z-10 transition-all duration-1000 ease-[0.16, 1, 0.3, 1]"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        />

                        {steps.map((step) => {
                            const Icon = step.icon;
                            const isActive = step.id === currentStep;
                            const isCompleted = step.id < currentStep;

                            return (
                                <motion.div
                                    key={step.id}
                                    className="flex flex-col items-center gap-4"
                                    animate={{ scale: isActive ? 1.05 : 1 }}
                                >
                                    <div
                                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-700 bg-[#050508] border-2 relative overflow-hidden ${isActive ? "border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]" :
                                            isCompleted ? "border-primary bg-primary/10 text-primary" : "border-white/10 text-muted-foreground"
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="glow"
                                                className="absolute inset-0 bg-primary/10 blur-md"
                                            />
                                        )}
                                        {isCompleted ? <Check size={22} /> : <Icon size={22} className="relative z-10" />}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-[0.3em] font-bold ${isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                                        }`}>
                                        {step.name}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {currentStep === 1 && (
                        <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => { setSelectedService(service); handleNext(); }}
                                        className={`glass-panel p-10 flex items-center justify-between group transition-all duration-500 border relative overflow-hidden ${selectedService?.id === service.id ? "border-primary shadow-glow bg-primary/5" : "border-white/5 hover:border-white/20"
                                            }`}
                                    >
                                        <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl -mr-16 -mt-16 transition-all duration-700 ${selectedService?.id === service.id ? "bg-primary/20 scale-150" : "bg-primary/5 group-hover:bg-primary/10"
                                            }`} />

                                        <div className="text-left relative z-10">
                                            <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors font-medium tracking-tight">{service.name}</h3>
                                            <div className="flex items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
                                                <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> {service.duration} min</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                                <span className="text-primary">R$ {service.priceFrom}</span>
                                            </div>
                                        </div>
                                        <ArrowRight size={24} className="opacity-0 group-hover:opacity-100 -translate-x-6 group-hover:translate-x-0 transition-all duration-500 text-primary" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {professionals.map((pro) => (
                                <button
                                    key={pro.id}
                                    onClick={() => { setSelectedProfessional(pro); handleNext(); }}
                                    className={`glass-panel p-10 text-center group transition-all duration-500 border relative overflow-hidden ${selectedProfessional?.id === pro.id ? "border-primary shadow-glow bg-primary/5" : "border-white/5 hover:border-white/20"
                                        }`}
                                >
                                    <div className="w-24 h-24 rounded-full bg-primary/10 overflow-hidden border border-primary/20 group-hover:scale-110 transition-transform duration-700 relative mx-auto mb-8 flex items-center justify-center">
                                        {selectedProfessional?.id === pro.id && (
                                            <motion.div layoutId="pro-ring" className="absolute -inset-2 border border-primary rounded-full opacity-50 z-20" />
                                        )}
                                        {pro.image ? (
                                            <img src={pro.image} alt={pro.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-3xl font-display text-primary">{pro.initials}</span>
                                        )}
                                    </div>
                                    <h3 className="text-xl mb-2 font-medium">{pro.name}</h3>
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold">{pro.specialty}</p>

                                    <div className="flex items-center justify-center gap-1.5 mt-6">
                                        <Star size={12} className="text-primary fill-primary" />
                                        <span className="text-xs font-bold text-foreground/80">{pro.rating}</span>
                                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest ml-2">{pro.reviewCount} Reviews</span>
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-16">
                            <div className="glass-panel p-10 border border-white/5">
                                <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-10 text-center">Data da Experiência</h4>
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 px-2">
                                    {availableDates.map((date) => (
                                        <button
                                            key={date.toISOString()}
                                            onClick={() => setSelectedDate(date)}
                                            className={`py-6 rounded-none border transition-all duration-700 flex flex-col items-center gap-2 ${isSameDay(selectedDate, date)
                                                ? "border-primary bg-primary/10 shadow-glow scale-105"
                                                : "border-white/5 hover:border-white/20 hover:bg-white/5"
                                                }`}
                                        >
                                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                                                {format(date, "EEE", { locale: ptBR })}
                                            </span>
                                            <span className="text-2xl font-sans font-bold">{format(date, "d")}</span>
                                            <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                                                {format(date, "MMM", { locale: ptBR })}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="glass-panel p-10 border border-white/5">
                                <h4 className="text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-10 text-center">Horários Disponíveis</h4>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                                    {timeSlots.map((time) => {
                                        const isAvailable = isSlotAvailable(time);
                                        const isReserved = reservedSlots.includes(time);
                                        return (
                                            <button
                                                key={time}
                                                disabled={!isAvailable}
                                                onClick={() => { setSelectedTime(time); handleNext(); }}
                                                className={`py-4 rounded-none border text-xs font-bold transition-all duration-500 relative overflow-hidden ${selectedTime === time
                                                    ? "border-primary bg-primary text-primary-foreground shadow-glow"
                                                    : !isAvailable
                                                        ? "border-white/5 bg-white/2 text-white/20 cursor-not-allowed"
                                                        : "border-white/5 hover:border-primary/50 text-muted-foreground hover:text-foreground"
                                                    }`}
                                            >
                                                {time}
                                                {!isAvailable && (
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-20 rotate-12 whitespace-nowrap overflow-hidden px-1">
                                                        <span className="text-[7px] uppercase font-black leading-none">{isReserved ? "Ocupado" : "Sem Tempo"}</span>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 4 && (
                        <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="glass-panel p-12 border border-white/5 space-y-10">
                                    <div className="flex items-center gap-8 pb-10 border-b border-white/5">
                                        <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                            <Scissors size={28} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-1">Serviço Selecionado</p>
                                            <h4 className="text-3xl font-display italic leading-none">{selectedService?.name}</h4>
                                            <p className="text-sm text-muted-foreground mt-2">{selectedService?.duration} minutos de experiência · <span className="text-foreground">R$ {selectedService?.priceFrom}</span></p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 pb-10 border-b border-white/5">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 overflow-hidden border border-primary/20 flex items-center justify-center font-display text-2xl">
                                            {selectedProfessional?.image ? (
                                                <img src={selectedProfessional.image} alt={selectedProfessional.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-primary">{selectedProfessional?.initials}</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-1">Especialista</p>
                                            <h4 className="text-3xl font-display italic leading-none">{selectedProfessional?.name}</h4>
                                            <p className="text-sm text-muted-foreground mt-2">{selectedProfessional?.specialty}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                            <Calendar size={28} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-1">Data & Horário</p>
                                            <h4 className="text-3xl font-display italic leading-none">
                                                {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
                                            </h4>
                                            <p className="text-sm text-muted-foreground mt-2">Reservado para as <span className="text-foreground font-bold">{selectedTime}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="glass-panel p-10 border border-white/5">
                                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary font-bold mb-8 text-center text-balance">Confirme seus Dados</h4>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[9px] uppercase tracking-widest text-muted-foreground ml-2 font-bold">Nome Completo</label>
                                            <input
                                                className="w-full h-16 bg-[#050508] border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/60 transition-all placeholder:text-white/10"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] uppercase tracking-widest text-muted-foreground ml-2 font-bold">WhatsApp</label>
                                            <input
                                                className="w-full h-16 bg-[#050508] border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/60 transition-all placeholder:text-white/10"
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] uppercase tracking-widest text-muted-foreground ml-2 font-bold">E-mail</label>
                                            <input
                                                className="w-full h-16 bg-[#050508] border border-white/10 rounded-2xl px-6 text-sm focus:outline-none focus:border-primary/60 transition-all placeholder:text-white/10"
                                                value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        disabled={!formData.name || !formData.phone || loading}
                                        onClick={handleSubmit}
                                        className="btn-premium w-full !py-6 mt-10 !text-[11px] font-bold group"
                                    >
                                        {loading ? "Processando..." : (
                                            <span className="flex items-center justify-center gap-3">
                                                Finalizar Agendamento
                                                <Check size={18} className="group-hover:scale-125 transition-transform" />
                                            </span>
                                        )}
                                    </button>
                                    <p className="text-[9px] text-muted-foreground text-center mt-6 leading-relaxed px-4">
                                        Ao confirmar, você concorda com nossos termos de cancelamento e política de privacidade.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
                    <button onClick={handleBack} className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground hover:text-primary transition-all flex items-center gap-3 py-3 px-6 group">
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Voltar
                    </button>
                    <div className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-bold text-center">
                        AGENDA.AI PREMIUM EXPERIENCE · MMXVI
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BookingPage;
