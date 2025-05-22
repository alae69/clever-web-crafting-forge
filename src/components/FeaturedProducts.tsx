
import { useState, useMemo, useEffect } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import { useProductStore } from '@/store/productStore';
import { ErrorBoundary } from './ErrorBoundary';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const { products } = useProductStore();
  
  // Add debugging
  useEffect(() => {
    try {
      console.log("FeaturedProducts rendered with", products?.length || 0, "products");
      if (!products || products.length === 0) {
        console.warn("No products available in the store");
      }
    } catch (error) {
      console.error("Error in FeaturedProducts useEffect:", error);
    }
  }, [products]);
  
  // Filter products with error handling
  const trendingProducts = useMemo(() => {
    try {
      if (!products || products.length === 0) return [];
      return products.filter((product, index) => index < 4);
    } catch (error) {
      console.error("Error filtering trending products:", error);
      return [];
    }
  }, [products]);
  
  const newArrivals = useMemo(() => {
    try {
      if (!products || products.length === 0) return [];
      return products.filter(product => product.isNew).slice(0, 4);
    } catch (error) {
      console.error("Error filtering new arrivals:", error);
      return [];
    }
  }, [products]);
  
  const bestsellers = useMemo(() => {
    try {
      if (!products || products.length === 0) return [];
      return products.filter((product, index) => index >= 8 && index < 12);
    } catch (error) {
      console.error("Error filtering bestsellers:", error);
      return [];
    }
  }, [products]);

  // Function to handle navigation clicks - scroll to top
  const handleNavigationClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-16 bg-morocco-sand/30">
      <div className="container-custom">
        <h2 className="section-title text-center">Our Collection</h2>
        <p className="section-subtitle text-center">Comfortable and stylish clothing for your little ones</p>
        
        <Tabs 
          defaultValue="trending" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="border border-morocco-navy/20 bg-transparent">
              <TabsTrigger 
                value="trending"
                className={`text-base px-6 data-[state=active]:bg-morocco-navy data-[state=active]:text-white`}
              >
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="new"
                className="text-base px-6 data-[state=active]:bg-morocco-navy data-[state=active]:text-white"
              >
                New Arrivals
              </TabsTrigger>
              <TabsTrigger 
                value="bestsellers"
                className="text-base px-6 data-[state=active]:bg-morocco-navy data-[state=active]:text-white"
              >
                Bestsellers
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="trending" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.length > 0 ? (
                trendingProducts.map((product) => (
                  <ErrorBoundary key={product.id}>
                    <ProductCard key={product.id} product={product} />
                  </ErrorBoundary>
                ))
              ) : (
                <div className="col-span-full text-center py-8">No trending products available</div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.length > 0 ? (
                newArrivals.map((product) => (
                  <ErrorBoundary key={product.id}>
                    <ProductCard key={product.id} product={product} />
                  </ErrorBoundary>
                ))
              ) : (
                <div className="col-span-full text-center py-8">No new arrivals available</div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="bestsellers" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.length > 0 ? (
                bestsellers.map((product) => (
                  <ErrorBoundary key={product.id}>
                    <ProductCard key={product.id} product={product} />
                  </ErrorBoundary>
                ))
              ) : (
                <div className="col-span-full text-center py-8">No bestsellers available</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-10">
          <Button 
            className="btn-secondary"
            size="lg"
            asChild
            onClick={handleNavigationClick}
          >
            <Link to="/products" onClick={handleNavigationClick}>View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
