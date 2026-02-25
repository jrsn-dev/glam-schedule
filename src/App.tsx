import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GenderProvider } from "@/contexts/GenderContext";
import Index from "./pages/Index";
import Professionals from "./pages/Professionals";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import BookingsManager from "./pages/admin/Bookings";
import ProfessionalsManager from "./pages/admin/Professionals";
import ServicesManager from "./pages/admin/Services";
import SettingsManager from "./pages/admin/Settings";
import ProfileEdit from "./pages/admin/ProfileEdit";
import NotFound from "./pages/NotFound";
import InteractiveBackground from "@/components/InteractiveBackground";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GenderProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <InteractiveBackground />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profissionais" element={<Professionals />} />
            <Route path="/profissional/:slug" element={<ProfessionalProfile />} />
            <Route path="/agendar" element={<Booking />} />
            <Route path="/confirmar" element={<Confirmation />} />
            <Route path="/login" element={<Login />} />

            {/* Painel Routes */}
            <Route
              path="/painel"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/painel/bookings"
              element={
                <ProtectedRoute>
                  <BookingsManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/painel/professionals"
              element={
                <ProtectedRoute>
                  <ProfessionalsManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/painel/services"
              element={
                <ProtectedRoute>
                  <ServicesManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/painel/settings"
              element={
                <ProtectedRoute>
                  <SettingsManager />
                </ProtectedRoute>
              }
            />

            <Route
              path="/painel/profile"
              element={
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </GenderProvider>
  </QueryClientProvider>
);

export default App;
