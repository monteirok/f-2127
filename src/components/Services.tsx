import { GlassWater, Users, Star, Mountain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Custom Cocktail Menu",
    description: "Tailored drink selections crafted for your event's theme and preferences.",
    icon: GlassWater,
  },
  {
    title: "Professional Bartenders",
    description: "Experienced mixologists who bring skill and personality to your gathering.",
    icon: Users,
  },
  {
    title: "Premium Experience",
    description: "Top-shelf spirits and fresh ingredients for exceptional drinks.",
    icon: Star,
  },
  {
    title: "Mountain Events",
    description: "Specialized in high-altitude venues and outdoor celebrations.",
    icon: Mountain,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-secondary/50 dark:bg-secondary/10">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple to-gold bg-clip-text text-transparent">
          Our Services
        </h2>
        {/* <p className="text-foreground/80 max-w-2xl mx-auto">
          ENTER DESCRIPTION
        </p> */}
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="glass hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <service.icon className="w-12 h-12 mb-4 text-purple" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;