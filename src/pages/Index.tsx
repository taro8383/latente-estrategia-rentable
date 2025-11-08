import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OfferBox } from "@/components/OfferBox";
import { Problems } from "@/components/Problems";
import { Solution } from "@/components/Solution";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { StrategicPartners } from "@/components/StrategicPartners";
import { FinalCTA } from "@/components/FinalCTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { PersonalizedWelcomeModal } from "@/components/PersonalizedWelcomeModal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { usePersonalization } from "@/context/PersonalizationProvider";
import { useState, useEffect } from "react";

const Index = () => {
  const { isPersonalized, isLoading } = usePersonalization();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    // Only show modal for personalized users after loading is complete
    if (isPersonalized && !isLoading) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(true);
      }, 2000); // 2-second delay

      return () => clearTimeout(timer);
    }
  }, [isPersonalized, isLoading]);

  const handleCloseModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Header />
      <Hero />
      <OfferBox />
      <Problems />
      <Solution />
      <HowItWorks />
      <Pricing />
      <StrategicPartners />
      <FinalCTA />
      <FAQ />
      <Footer />
      
      {/* Personalized Welcome Modal */}
      <PersonalizedWelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleCloseModal}
      />
    </main>
  );
};

export default Index;
