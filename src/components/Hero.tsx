import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/store/languageStore';
interface Slide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  position: string;
  link: string;
}
const slides: Slide[] = [{
  id: 1,
  title: "Summer Collection 2025",
  subtitle: "Bright colors, cool comfort for your little ones",
  cta: "Shop Now",
  image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=1800&q=80",
  position: "center",
  link: "/products"
}, {
  id: 2,
  title: "Moroccan Heritage",
  subtitle: "Traditional patterns with modern comfort",
  cta: "Discover",
  image: "https://images.unsplash.com/photo-1565462900119-a16d2b7d9946?auto=format&fit=crop&w=1800&q=80",
  position: "bottom",
  link: "/new-arrivals"
}, {
  id: 3,
  title: "Back to School",
  subtitle: "Ready for the classroom and playground",
  cta: "Explore Collection",
  image: "https://images.unsplash.com/photo-1596137765040-44a1c03865f3?auto=format&fit=crop&w=1800&q=80",
  position: "center",
  link: "/products"
}];
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const {
    t
  } = useLanguageStore();
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(prev => prev === slides.length - 1 ? 0 : prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(prev => prev === 0 ? slides.length - 1 : prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle button clicks for scrolling to top
  const handleNavigationClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="relative h-[80vh] md:h-[85vh] lg:h-[90vh] overflow-hidden">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 moroccan-pattern-bg opacity-20 z-[1]"></div>
      
      {/* Slides */}
      {slides.map((slide, index) => <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"}`} aria-hidden={currentSlide !== index}>
          <div className="absolute inset-0 bg-cover bg-center transform transition-transform duration-3000" style={{
        backgroundImage: `url(${slide.image})`,
        backgroundPosition: slide.position,
        transform: currentSlide === index ? "scale(1.08)" : "scale(1)",
        transformOrigin: "center"
      }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20"></div>
          </div>
          
          <div className="container-custom h-full flex items-center relative z-10">
            <div className={`max-w-xl text-white transition-all duration-1500 ${currentSlide === index && !isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-block px-4 py-1 bg-morocco-terracotta/30 border border-morocco-terracotta/50 rounded-full text-white text-sm font-medium mb-6">
                {t('newCollection') || 'New Collection'}
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
                {t(slide.title) || slide.title}
              </h1>
              
              <div className="h-1 w-24 bg-morocco-terracotta my-6"></div>
              
              <p className="text-xl md:text-2xl mb-10 [text-shadow:_0_1px_5px_rgb(0_0_0_/_30%)]">
                {t(slide.subtitle) || slide.subtitle}
              </p>
              
              <div className="flex space-x-4">
                <Button className="bg-morocco-terracotta hover:bg-morocco-terracotta/90 text-white px-8 py-6 text-lg rounded-md group" asChild>
                  <Link to={slide.link} onClick={handleNavigationClick} className="px-[12px] py-0">
                    {t(slide.cta) || slide.cta}
                    <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </Button>
                
                <Button variant="outline" className="border-white hover:bg-white/10 text-white px-8 py-6 text-lg" asChild>
                  <Link to="/products" onClick={handleNavigationClick} className="mx-3">
                    {t('viewAll') || 'View All'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>)}

      {/* Navigation arrows with improved styling */}
      <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-colors z-20 group" aria-label="Previous slide">
        <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
      </button>
      
      <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/20 transition-colors z-20 group" aria-label="Next slide">
        <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Indicator dots with animated active state */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => <button key={index} onClick={() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 500);
      }} className={`transition-all duration-500 ${currentSlide === index ? "w-12 bg-white" : "w-3 bg-white/40 hover:bg-white/60"} h-3 rounded-full`} aria-label={`Go to slide ${index + 1}`} aria-current={currentSlide === index} />)}
      </div>
      
      {/* Scroll down indicator with pulse animation */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="animate-[pulse_2s_infinite] flex flex-col items-center text-white/90">
          <span className="text-sm font-medium mb-2">{t('scrollDown') || 'Scroll Down'}</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>;
};
export default Hero;
