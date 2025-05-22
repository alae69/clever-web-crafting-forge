
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/components/ProductCard';

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addProduct: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addProduct: (product: Product) => {
        try {
          console.log("Adding product to cart:", product.name);
          if (!product || !product.id) {
            console.error("Invalid product provided to addProduct:", product);
            return;
          }
          
          set((state) => {
            const existingItem = state.items.find(item => item.id === product.id);
            
            if (existingItem) {
              // If item already in cart, increase quantity
              return {
                items: state.items.map(item => 
                  item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 } 
                    : item
                )
              };
            } else {
              // Add new item with quantity 1
              return { 
                items: [...state.items, { ...product, quantity: 1 }] 
              };
            }
          });
        } catch (error) {
          console.error("Error in addProduct:", error);
        }
      },
      
      removeItem: (productId: number) => {
        try {
          set((state) => ({
            items: state.items.filter(item => item.id !== productId)
          }));
        } catch (error) {
          console.error("Error in removeItem:", error);
        }
      },
      
      updateQuantity: (productId: number, quantity: number) => {
        try {
          set((state) => ({
            items: state.items.map(item => 
              item.id === productId 
                ? { ...item, quantity: Math.max(1, quantity) } 
                : item
            )
          }));
        } catch (error) {
          console.error("Error in updateQuantity:", error);
        }
      },
      
      clearCart: () => {
        try {
          set({ items: [] });
        } catch (error) {
          console.error("Error in clearCart:", error);
        }
      },
      
      getTotal: () => {
        try {
          return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
        } catch (error) {
          console.error("Error in getTotal:", error);
          return 0;
        }
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);
