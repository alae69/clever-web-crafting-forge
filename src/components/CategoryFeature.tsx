
import { Link } from 'react-router-dom';
import { useLanguageStore } from '@/store/languageStore';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const CategoryFeature = () => {
  const { t, language } = useLanguageStore();
  
  // Fallback images for when main images fail to load
  const fallbackImages = {
    girls: "https://placehold.co/800x600/e9d8c4/333333?text=Girls+Collection",
    boys: "https://placehold.co/800x600/c4d8e9/333333?text=Boys+Collection",
    baby: "https://placehold.co/800x600/d8e9c4/333333?text=Baby+Collection"
  };

  // Image state to handle failed loads
  const [images, setImages] = useState({
    girls: "https://images.unsplash.com/photo-1476234251651-f353703a034d?auto=format&fit=crop&w=800&q=80",
    boys: "https://images.unsplash.com/photo-1611256243212-48a16a558a4c?auto=format&fit=crop&w=800&q=80",
    baby: "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=80"
  });

  // Handle image error by replacing with fallback
  const handleImageError = (category: 'girls' | 'boys' | 'baby') => {
    setImages(prev => ({
      ...prev,
      [category]: fallbackImages[category]
    }));
    console.log(`Replaced failed ${category} image with fallback`);
  };
  
  // Function to handle navigation clicks
  const handleNavigationClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Create categories after translation is loaded to ensure they use the right text
  const categories = [
    {
      id: 1,
      title: t('girlsCollection'),
      subtitle: t('girlsCollectionSubtitle') || 'Elegant & Comfortable',
      image: images.girls,
      link: "/girls",
      category: 'girls' as const
    },
    {
      id: 2,
      title: t('boysCollection'),
      subtitle: t('boysCollectionSubtitle') || 'Stylish & Durable',
      image: images.boys,
      link: "/boys",
      category: 'boys' as const
    },
    {
      id: 3,
      title: t('babyCollection'),
      subtitle: t('babyCollectionSubtitle') || 'Soft & Gentle',
      image: images.baby,
      link: "/baby",
      category: 'baby' as const
    },
  ];

  return (
    <section className="py-20 md:py-24 bg-morocco-sand/20">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1 bg-morocco-terracotta/20 text-morocco-terracotta text-sm font-medium rounded-full mb-4">
            {t('collections') || 'Collections'}
          </span>
          <h2 className="section-title text-center mb-3">{t('exploreCollections')}</h2>
          <p className="text-xl text-morocco-navy/70 max-w-2xl mx-auto">{t('discoverLatestAdditions')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              to={category.link} 
              key={category.id}
              className="group overflow-hidden relative rounded-xl moroccan-shadow hover-scale transition-all duration-500 aspect-[5/6] block"
              onClick={handleNavigationClick}
            >
              <div className="absolute inset-0 moroccan-pattern-bg opacity-10 mix-blend-overlay z-10"></div>
              <img 
                src={category.image} 
                alt={category.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-[0.9] group-hover:brightness-[0.85]"
                onError={() => handleImageError(category.category)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-morocco-navy/80 via-morocco-navy/30 to-transparent flex flex-col justify-end p-8">
                <div className="text-white transform transition-transform duration-300 group-hover:translate-y-[-10px]">
                  <span className="text-sm text-white/80 font-medium block mb-2">{category.subtitle}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{category.title}</h3>
                  <div className="flex items-center text-white space-x-2 font-medium opacity-90 group-hover:opacity-100">
                    <span>{t('shopNow')}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFeature;
