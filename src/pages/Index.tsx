import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import FeaturedProfessionals from '@/components/FeaturedProfessionals';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { useGender } from '@/contexts/GenderContext';

const GenderIndicator = () => {
  const { gender, setGender } = useGender();
  if (!gender) return null;

  return (
    <div className="bg-elevated border-b border-border py-2.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-sm text-primary font-medium">
          {gender === 'male' ? '♂ Exibindo serviços masculinos' : '♀ Exibindo serviços femininos'}
        </span>
        <button
          onClick={() => setGender(gender === 'male' ? 'female' : 'male')}
          className="text-xs text-muted-foreground hover:text-dim transition-colors"
        >
          Trocar para {gender === 'male' ? 'feminino' : 'masculino'}
        </button>
      </div>
    </div>
  );
};

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <GenderIndicator />
    <FeaturedServices />
    <FeaturedProfessionals />
    <HowItWorks />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
