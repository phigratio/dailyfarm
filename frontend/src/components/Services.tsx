import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sprout, 
  CloudRain, 
  BarChart3, 
  Shield, 
  Truck, 
  Users,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Sprout,
      title: "Crop Management",
      description: "Comprehensive crop planning, monitoring, and optimization services for maximum yield.",
      features: ["Soil Analysis", "Seed Selection", "Growth Tracking", "Harvest Planning"]
    },
    {
      icon: CloudRain,
      title: "Smart Irrigation",
      description: "AI-powered irrigation systems that conserve water while ensuring optimal plant hydration.",
      features: ["Weather Integration", "Moisture Sensors", "Automated Scheduling", "Water Conservation"]
    },
    {
      icon: BarChart3,
      title: "Farm Analytics",
      description: "Data-driven insights to improve farm efficiency and profitability through advanced analytics.",
      features: ["Yield Forecasting", "Cost Analysis", "Market Trends", "Performance Reports"]
    },
    {
      icon: Shield,
      title: "Pest Control",
      description: "Eco-friendly pest management solutions that protect crops without harming the environment.",
      features: ["Organic Solutions", "IPM Strategies", "Beneficial Insects", "Natural Deterrents"]
    },
    {
      icon: Truck,
      title: "Supply Chain",
      description: "End-to-end supply chain management from farm to market with quality assurance.",
      features: ["Storage Solutions", "Transportation", "Quality Control", "Market Access"]
    },
    {
      icon: Users,
      title: "Farmer Training",
      description: "Educational programs and workshops to empower farmers with modern agricultural techniques.",
      features: ["Technical Training", "Best Practices", "Certification", "Ongoing Support"]
    }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create water ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'water-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    container.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 800);
  };

  return (
    <section 
      className="py-20 bg-muted/30 relative overflow-hidden water-effect-container"
      onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive agricultural solutions designed to support every aspect of modern farming, 
              from planning to harvest and beyond.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="bg-gradient-field p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features List */}
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <Button variant="ghost" className="w-full group/btn text-primary hover:text-primary-foreground hover:bg-primary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-harvest rounded-2xl p-8 md:p-12">
              <h3 className="text-3xl font-bold text-white mb-4 font-serif">
                Ready to Transform Your Farm?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of farmers who have already improved their yields and sustainability 
                with our innovative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="min-w-48">
                  Get Started Today
                </Button>
                <Button variant="outline" size="lg" className="min-w-48 border-white text-white hover:bg-white hover:text-primary">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;