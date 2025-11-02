import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { OfferBox } from "@/components/OfferBox";
import { Problems } from "@/components/Problems";
import { Solution } from "@/components/Solution";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { StrategicPartners } from "@/components/StrategicPartners";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <OfferBox />
      <Problems />
      <Solution />
      <HowItWorks />
      <Pricing />
      <StrategicPartners />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
