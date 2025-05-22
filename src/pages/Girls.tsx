
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useProductStore } from "@/store/productStore";
import { useLanguageStore } from "@/store/languageStore";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const GirlsContent = () => {
  const { products } = useProductStore();
  const { t, language } = useLanguageStore();
  const girlsProducts = products.filter(product => product.category === "girls");

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
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">{t('girlsCollection') || 'Girls Collection'}</h1>
          <p className="text-lg text-morocco-navy/70 mb-8">
            {t('girlsDescription') || 'Discover our beautiful collection of clothing for girls.'}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {girlsProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild onClick={handleNavigationClick}>
              <Link to="/products" onClick={handleNavigationClick}>{t('viewAllProducts') || 'View All Products'}</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

const Girls = () => {
  return (
    <ErrorBoundary>
      <GirlsContent />
    </ErrorBoundary>
  );
};

export default Girls;
