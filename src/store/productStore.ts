
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/components/ProductCard';

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (productId: number) => void;
}

// Initial products from our store with stock quantity
const initialProducts: Product[] = [
  // Trending Products
  {
    id: 1,
    name: "Moroccan Print Dress",
    price: 249,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    rating: 5,
    category: "girls",
    description: "This beautiful Moroccan print dress is made with high-quality cotton fabric, perfect for your little girl's comfort and style. The traditional patterns are combined with modern design elements.",
    inStock: true,
    stockQuantity: 15
  },
  {
    id: 2,
    name: "Boys Summer T-shirt",
    price: 129,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 4,
    category: "boys",
    description: "Lightweight and breathable boys T-shirt, perfect for summer days. Made with organic cotton and featuring a playful Moroccan-inspired design.",
    inStock: false,
    stockQuantity: 0
  },
  {
    id: 3,
    name: "Cotton Jumpsuit",
    price: 189,
    image: "https://images.unsplash.com/photo-1518831959646-28f35d4d8fbc?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    category: "baby",
    inStock: true,
    stockQuantity: 8
  },
  {
    id: 4,
    name: "Traditional Kaftan",
    price: 349,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1555585466-703f14e9c14f?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    rating: 4,
    category: "girls",
    inStock: false,
    stockQuantity: 0
  },
  // New Arrivals
  {
    id: 5,
    name: "Summer Hat Collection",
    price: 89,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 5,
    category: "accessories",
    inStock: true,
    stockQuantity: 25
  },
  {
    id: 6,
    name: "Lightweight Linen Shorts",
    price: 149,
    image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 4,
    category: "boys",
    inStock: true,
    stockQuantity: 12
  },
  {
    id: 7,
    name: "Embroidered Blouse",
    price: 199,
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 4,
    category: "girls",
    inStock: true,
    stockQuantity: 7
  },
  {
    id: 8,
    name: "Patterned Leggings",
    price: 119,
    image: "https://images.unsplash.com/photo-1567113463300-102a7eb3cb26?auto=format&fit=crop&w=800&q=80",
    isNew: true,
    rating: 5,
    category: "girls",
    inStock: true,
    stockQuantity: 20
  },
  // Bestsellers
  {
    id: 9,
    name: "Soft Cotton Pajamas",
    price: 169,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1568337356249-fa4ac5f1d270?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    rating: 5,
    category: "baby",
    inStock: true,
    stockQuantity: 18
  },
  {
    id: 10,
    name: "Casual Denim Set",
    price: 289,
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    category: "boys",
    inStock: false,
    stockQuantity: 0
  },
  {
    id: 11,
    name: "Handmade School Bag",
    price: 229,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1566454419290-57a0af3a0b6a?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    rating: 4,
    category: "accessories",
    inStock: true,
    stockQuantity: 5
  },
  {
    id: 12,
    name: "Winter Coat with Hood",
    price: 399,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
    rating: 5,
    category: "boys",
    inStock: true,
    stockQuantity: 10
  }
];

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: initialProducts,
      setProducts: (products) => set({ products }),
      updateProduct: (updatedProduct) => set((state) => ({
        products: state.products.map(product => 
          product.id === updatedProduct.id ? updatedProduct : product
        )
      })),
      deleteProduct: (productId) => set((state) => ({
        products: state.products.filter(product => product.id !== productId)
      })),
    }),
    {
      name: 'product-storage', // unique name for the localStorage key
    }
  )
);
