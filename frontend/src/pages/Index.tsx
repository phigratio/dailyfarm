import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Services />
      </main>
    </>
  );
};

export default Index;
