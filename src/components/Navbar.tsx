
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 py-4 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">Company</span>
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
          </div>
          <Button>Get Started</Button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t p-4 animate-fade-in">
          <div className="flex flex-col gap-4 items-center">
            <a href="#features" className="text-gray-600 w-full text-center py-2" onClick={toggleMenu}>Features</a>
            <a href="#testimonials" className="text-gray-600 w-full text-center py-2" onClick={toggleMenu}>Testimonials</a>
            <a href="#contact" className="text-gray-600 w-full text-center py-2" onClick={toggleMenu}>Contact</a>
            <Button className="w-full mt-2">Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
