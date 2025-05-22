
import { Shield, Truck, RefreshCw, Clock } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';
import { useContentStore } from '@/store/contentStore';

const Benefits = () => {
  const { language, t } = useLanguageStore();
  const { textContent } = useContentStore();
  
  // Icon mapping for benefits
  const iconMapping = {
    0: <Truck className="h-10 w-10 text-morocco-blue" />,
    1: <Shield className="h-10 w-10 text-morocco-terracotta" />,
    2: <RefreshCw className="h-10 w-10 text-morocco-green" />,
    3: <Clock className="h-10 w-10 text-morocco-yellow" />
  };

  // Default benefits in case content store fails
  const defaultBenefits = [
    { 
      title: "Free Shipping", 
      description: "Free shipping on all orders over 500 MAD" 
    },
    { 
      title: "Superior Quality", 
      description: "Handcrafted with the finest materials" 
    },
    { 
      title: "Easy Returns", 
      description: "30-day money back guarantee" 
    },
    { 
      title: "Customer Support", 
      description: "24/7 dedicated customer service" 
    },
  ];

  // Safely access benefits - use defaults if undefined
  const benefits = textContent?.benefits || defaultBenefits;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-morocco-navy moroccan-border pb-3 inline-block">
            {t('whyChooseUs') || textContent?.whyChooseUsTitle || "Why Choose Us"}
          </h2>
          <p className="mt-6 text-lg text-morocco-navy/70 max-w-2xl mx-auto">
            {t('benefitsSubtitle') || textContent?.whyChooseUsSubtitle || "We are committed to providing the best experience for you and your little ones"}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="p-8 border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group bg-white hover:bg-morocco-sand/20"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-white rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                  {iconMapping[index as keyof typeof iconMapping]}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-morocco-navy">
                {t(`benefit${index}Title`) || benefit.title}
              </h3>
              <p className="text-gray-600 text-center">
                {t(`benefit${index}Description`) || benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
