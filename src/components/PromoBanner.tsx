
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useContentStore } from '@/store/contentStore';
import { useLanguageStore } from '@/store/languageStore';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const PromoBanner = () => {
  const { images, countdown } = useContentStore();
  const { t } = useLanguageStore();
  const [timeLeft, setTimeLeft] = useState(countdown);

  // Countdown timer effect
  useEffect(() => {
    // Update the local state when the store changes
    setTimeLeft(countdown);
    
    // Only run the countdown if enabled
    if (!countdown.enabled) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { days, hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds -= 1;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes -= 1;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours -= 1;
            } else {
              hours = 23;
              if (days > 0) {
                days -= 1;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds, enabled: prevTime.enabled };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [countdown]);

  // Function to handle button clicks for scrolling to top
  const handleNavigationClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Format time values to always show two digits
  const formatTime = (time: number) => time.toString().padStart(2, '0');

  // Fallback image if the content store image is not available
  const bannerImage = images.bannerImage || "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1800&q=80";

  return (
    <div className="py-16 my-16 relative overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      ></div>
      
      {/* Overlay with pattern */}
      <div className="absolute inset-0 bg-morocco-navy/75"></div>
      <div className="absolute inset-0 moroccan-pattern-bg opacity-15"></div>
      
      {/* Decorative borders */}
      <div className="absolute top-8 left-8 right-8 bottom-8 border border-white/20 rounded-lg z-[1]"></div>
      <div className="absolute top-10 left-10 right-10 bottom-10 border border-morocco-terracotta/20 rounded-lg z-[1]"></div>
      
      {/* Content */}
      <div className="container-custom relative z-10 text-white py-20">
        <div className="max-w-xl mx-auto text-center">
          <span className="inline-block px-5 py-1.5 bg-morocco-terracotta/30 border border-morocco-terracotta/40 rounded-full text-white text-sm font-medium mb-6 animate-[pulse_2s_infinite]">
            {t('limitedTime') || 'Limited Time Offer'}
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 [text-shadow:_0_2px_8px_rgb(0_0_0_/_30%)]">
            {t('summerCollection') || 'Summer Collection Sale'}
          </h2>
          
          <div className="h-1 w-24 bg-morocco-terracotta mx-auto my-8"></div>
          
          <p className="text-xl md:text-2xl text-white/90 mb-10">
            {t('summerDiscount') || 'Enjoy up to 30% off on our summer collection for your kids.'}
          </p>
          
          <div className="flex flex-wrap gap-5 justify-center">
            <Button 
              asChild
              className="bg-morocco-terracotta hover:bg-morocco-terracotta/90 text-white py-6 px-10 text-lg rounded-md flex items-center gap-3 group shadow-lg shadow-morocco-terracotta/20"
              onClick={handleNavigationClick}
            >
              <Link to="/products" onClick={handleNavigationClick}>
                {t('shopNow') || 'Shop Now'} 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              className="border-white/70 text-white hover:bg-white/10 py-6 px-10 text-lg shadow-lg"
              onClick={handleNavigationClick}
            >
              <Link to="/products" onClick={handleNavigationClick}>
                {t('viewCollection') || 'View Collection'}
              </Link>
            </Button>
          </div>
          
          {/* Enhanced countdown timer - only show if enabled */}
          {countdown.enabled && (
            <div className="mt-12 flex justify-center">
              <div className="grid grid-cols-4 gap-4 text-white">
                {[
                  { value: formatTime(timeLeft.days), label: t('days') || 'Days' },
                  { value: formatTime(timeLeft.hours), label: t('hours') || 'Hours' },
                  { value: formatTime(timeLeft.minutes), label: t('minutes') || 'Minutes' },
                  { value: formatTime(timeLeft.seconds), label: t('seconds') || 'Seconds' }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="bg-white/15 backdrop-blur-md rounded-lg p-4 w-20 h-20 mb-2 flex items-center justify-center shadow-lg">
                      <span className="text-3xl md:text-4xl font-bold">{item.value}</span>
                    </div>
                    <span className="text-sm text-white/80 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
