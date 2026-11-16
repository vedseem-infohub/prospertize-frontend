import Header from "../components/Header";
import Hero from "../components/Hero";
import OurClients from "../components/OurClients";
import Trajectory from "../components/Trajectory";
import WhatsAppFloating from "../components/WhatsAppFloating";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col font-sans antialiased selection:bg-[#bd4b25]/20 selection:text-[#bd4b25]">
      <Header />
      <main id="main" className="flex-1 pt-[76px]">
        {/* Hero Section */}
        <Hero />

        {/* Our Clients Section (just after Hero) */}
        <OurClients />
        <Trajectory />
      </main>
      <WhatsAppFloating />
    </div>
  );
}
