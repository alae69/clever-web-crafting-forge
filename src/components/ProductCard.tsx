
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { useLanguageStore } from '@/store/languageStore';
import { useEffect } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  category: string;
  description?: string;
  inStock: boolean;
  stockQuantity: number;
}

const ProductCard = ({
  product,
  featured = false
}: {
  product: Product;
  featured?: boolean;
}) => {
  const { addProduct } = useCartStore();
  const { t } = useLanguageStore();
  
  // Add debug logging
  useEffect(() => {
    try {
      console.log("ProductCard rendered:", product.name);
    } catch (error) {
      console.error("Error in ProductCard useEffect:", error);
    }
  }, [product.name]);
  
  // Calculate discount percentage if there's an original price
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    try {
      if (!product.inStock) return;
      
      addProduct(product);
      toast.success(`${product.name} ${t('addToBag')}`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Could not add product to cart");
    }
  };

  // Handle case where product might be invalid
  if (!product || !product.id) {
    console.error("Invalid product data:", product);
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm p-4 text-center text-gray-500">
        Product data is not available
      </div>
    );
  }

  return (
    <div className={`group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${featured ? 'border border-gray-100' : ''}`}>
      {/* Product badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {product.isNew && (
          <span className="inline-block bg-morocco-blue text-white text-xs font-semibold px-2 py-1 rounded">
            NEW
          </span>
        )}
        {product.isSale && product.originalPrice && (
          <span className="inline-block bg-morocco-terracotta text-white text-xs font-semibold px-2 py-1 rounded">
            -{discountPercentage}%
          </span>
        )}
        {!product.inStock && (
          <span className="inline-block bg-gray-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {t('outOfStock')}
          </span>
        )}
      </div>
      
      {/* Product image */}
      <Link to={`/product/${product.id}`} className="block relative pb-[100%] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            console.error("Image failed to load:", product.image);
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/400x400?text=Image+Not+Found";
          }}
        />
      </Link>
      
      {/* Product info */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${product.id}`} className="text-sm font-medium hover:text-morocco-terracotta transition-colors">
            {product.name}
          </Link>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < product.rating ? 'fill-morocco-yellow text-morocco-yellow' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stock Quantity */}
        <div className="text-xs text-gray-500 mb-2">
          {product.inStock ? (
            product.stockQuantity > 5 ? (
              <span className="text-morocco-green">{t('inStock')}</span>
            ) : (
              <span className="text-morocco-terracotta">{t('onlyFewLeft').replace('{count}', product.stockQuantity.toString())}</span>
            )
          ) : (
            <span className="text-gray-500">{t('outOfStock')}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>
        
        {/* Add to cart */}
        <Button 
          className="w-full flex items-center justify-center gap-2 bg-morocco-navy hover:bg-morocco-navy/90"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Add to Cart</span>
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
