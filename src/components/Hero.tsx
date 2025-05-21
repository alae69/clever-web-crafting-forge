
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="hero-blur top-0 right-1/4"></div>
      <div className="hero-blur bottom-1/4 left-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6 animate-fade-in">
            Launching Soon
          </span>
          <h1 className="mb-6 font-bold animate-fade-in" style={{animationDelay: "0.1s"}}>
            Build Beautiful Websites <span className="text-gradient">Without Code</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-xl animate-fade-in" style={{animationDelay: "0.2s"}}>
            Create stunning, responsive websites with our intuitive platform. No coding required - just your creativity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{animationDelay: "0.3s"}}>
            <Button size="lg" className="px-8 py-6 text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              See Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
