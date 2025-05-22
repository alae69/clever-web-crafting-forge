
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useProductStore } from "@/store/productStore";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

const Products = () => {
  const { products: allProducts } = useProductStore();
  const { t, language } = useLanguageStore();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [sortOption, setSortOption] = useState("default");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  
  // Apply search, filters and sorting on mount and when dependencies change
  useEffect(() => {
    let result = [...allProducts];
    
    // Apply search filter if present
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter if not set to "all"
    if (categoryFilter !== "all") {
      result = result.filter(product => product.category === categoryFilter);
    }
    
    // Apply sorting
    switch(sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = result.filter(product => product.isNew).concat(
          result.filter(product => !product.isNew)
        );
        break;
      default:
        // Keep current order
        break;
    }
    
    setFilteredProducts(result);
  }, [searchQuery, categoryFilter, sortOption, allProducts]);
  
  const handleSort = (value: string) => {
    setSortOption(value);
  };
  
  const handleCategoryFilter = (value: string) => {
    setCategoryFilter(value);
  };

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
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">{t('viewAllProducts')}</h1>
          <p className="text-lg text-morocco-navy/70 mb-8">
            {t('exploreMoreCollections')}
          </p>
          
          {searchQuery && (
            <Alert className="bg-morocco-sand/20 mb-6">
              <Search className="h-4 w-4" />
              <AlertTitle>{t('searchResultsFor')}</AlertTitle>
              <AlertDescription>
                {t('searchResultsFor')}: <span className="font-semibold">{searchQuery}</span>
                {' '} ({filteredProducts.length} {t('itemsFound')})
              </AlertDescription>
            </Alert>
          )}
          
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48">
                <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('category')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('allCategories')}</SelectItem>
                    <SelectItem value="boys">{t('boys')}</SelectItem>
                    <SelectItem value="girls">{t('girls')}</SelectItem>
                    <SelectItem value="baby">{t('baby')}</SelectItem>
                    <SelectItem value="accessories">{t('accessories')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-48">
                <Select value={sortOption} onValueChange={handleSort}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('sortBy')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">{t('default')}</SelectItem>
                    <SelectItem value="price-low-high">{t('priceLowHigh')}</SelectItem>
                    <SelectItem value="price-high-low">{t('priceHighLow')}</SelectItem>
                    <SelectItem value="newest">{t('newestFirst')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {t('showing')} {filteredProducts.length} {t('products')}
            </div>
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-4">{t('noProductsFound')}</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery 
                  ? t('tryDifferentSearch') 
                  : t('tryDifferentCategory')}
              </p>
              <Button asChild variant="outline" className="mr-2" onClick={handleNavigationClick}>
                <Link to="/products" onClick={handleNavigationClick}>{t('viewAllProducts')}</Link>
              </Button>
              <Button asChild onClick={handleNavigationClick}>
                <Link to="/" onClick={handleNavigationClick}>{t('returnToHome')}</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
