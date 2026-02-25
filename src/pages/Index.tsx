import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import FeaturedProfessionals from '@/components/FeaturedProfessionals';
import Gallery from '@/components/Gallery';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Index = () => (
  <div className="min-h-screen relative z-0">
    <SEO
      title="Agendamento Premium | Home"
      description="Agende os melhores serviços de beleza e bem-estar no Agenda.AI. Barbeiros, cabeleireiros e muito mais com tecnologia e IA."
    />
    <Navbar />
    <Hero />
    <div className="content-container">
      <FeaturedServices />
      <FeaturedProfessionals />
      <Gallery />
      <HowItWorks />
      <Footer />
    </div>
  </div>
);

export default Index;
