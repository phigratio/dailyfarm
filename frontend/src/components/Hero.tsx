import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Tractor, Globe, ChevronRight } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

const Hero = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Light Rain Effect */}
      <div className="rain-container">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${0.8 + Math.random() * 0.5}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      
      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Leaf className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary font-serif">DailyFarm</h1>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 font-serif leading-tight">
              Sustainable
              <span className="block bg-gradient-harvest bg-clip-text text-transparent">
                Agriculture
              </span>
              <span className="text-primary">Solutions</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              Leading the future of farming with innovative technologies, sustainable practices, 
              and eco-friendly solutions that nurture both crops and communities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="harvest" size="lg" className="min-w-48">
                Explore Solutions
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="min-w-48">
                Learn More
              </Button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-field p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Tractor className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Smart Farming</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced IoT sensors and AI-powered analytics to optimize crop yields 
                  and reduce resource consumption.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-harvest p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Organic Solutions</h3>
                <p className="text-muted-foreground leading-relaxed">
                  100% organic fertilizers and pest control methods that protect 
                  soil health and biodiversity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-earth p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Global Impact</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Supporting farmers worldwide with sustainable practices that 
                  contribute to food security and environmental conservation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-field rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold text-white mb-8 font-serif">Our Impact</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">10K+</div>
                <div className="text-white/90">Farmers Supported</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">50M</div>
                <div className="text-white/90">Acres Optimized</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-secondary mb-2">30%</div>
                <div className="text-white/90">Yield Increase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;