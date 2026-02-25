import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedServices from '@/components/FeaturedServices';
import FeaturedProfessionals from '@/components/FeaturedProfessionals';
import HowItWorks from '@/components/HowItWorks';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <Hero />
    <FeaturedServices />
    <FeaturedProfessionals />
    <HowItWorks />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
