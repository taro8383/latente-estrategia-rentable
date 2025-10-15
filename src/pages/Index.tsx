import { Hero } from "@/components/Hero";
import { Problems } from "@/components/Problems";
import { Solution } from "@/components/Solution";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problems />
      <Solution />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
