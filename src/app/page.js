import Example from "@/components/landing/Example";
import FAQs from "@/components/landing/FAQs";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Pricing from "@/components/landing/Pricing";
import ConnectDB from "@/components/landing/steps/ConnectDB";
import Design from "@/components/landing/steps/Design";
import Reward from "@/components/landing/steps/Reward";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Example />
      <ConnectDB />
      <Design />
      <Reward />
      <Features />
      <Pricing />
      <FAQs />
      <Footer />
    </div>
  );
}
