
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/productStore";
import { useLanguageStore } from "@/store/languageStore";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import CategoryFeature from "@/components/CategoryFeature";

const CollectionsContent = () => {
  const { products } = useProductStore();
  const { t, language } = useLanguageStore();
  
  // Featured products (we'll show the first 4)
  const featuredProducts = products.slice(0, 4);

  // Function to handle navigation clicks
  const handleNavigationClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">
            {t('ourCollections') || 'Our Collections'}
          </h1>
          <p className="text-lg text-morocco-navy/70 mb-8">
            {t('collectionsDescription') || 'Explore our beautiful collections for children of all ages.'}
          </p>
          
          <CategoryFeature />
          
          <div className="mt-16 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-morocco-navy mb-6">
              {t('featuredProducts') || 'Featured Products'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild onClick={handleNavigationClick}>
                <Link to="/products" onClick={handleNavigationClick}>{t('viewAllProducts') || 'View All Products'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const Collections = () => {
  return (
    <ErrorBoundary>
      <CollectionsContent />
    </ErrorBoundary>
  );
};

export default Collections;
