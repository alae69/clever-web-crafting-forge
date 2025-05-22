import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useLanguageStore } from "@/store/languageStore";
import { useEffect } from "react";
import Index from "./pages/Index";
import Girls from "./pages/Girls";
import Boys from "./pages/Boys";
import Baby from "./pages/Baby";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import Admin from "./pages/Admin";
import ShippingReturns from "./pages/ShippingReturns";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Sustainability from "./pages/Sustainability";
import Stores from "./pages/Stores";
import Careers from "./pages/Careers";
import Login from "./pages/Login";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Collections from "./pages/Collections";
import AdminDashboard from './pages/AdminDashboard';
import AdminContent from './pages/AdminContent';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminCustomers from './pages/AdminCustomers';
import AdminSettings from './pages/AdminSettings';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Cookies from './pages/Cookies';

// Create query client with enhanced error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      // Updated error handling configuration
      meta: {
        onError: (error: Error) => {
          console.error("Query error:", error);
        },
      },
    },
  },
});

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Language setup component
const LanguageSetup = () => {
  const { language } = useLanguageStore();
  
  useEffect(() => {
    try {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      console.log("Language setup complete:", language);
    } catch (error) {
      console.error("Error in language setup:", error);
    }
  }, [language]);
  
  return null;
};

const App = () => {
  useEffect(() => {
    try {
      console.log("App component rendered");
    } catch (error) {
      console.error("Error in App component:", error);
    }
  }, []);

  return (
    <ErrorBoundary fallback={
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Sorry, something went wrong with the application</h2>
        <p className="mb-4">Please try refreshing your browser</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Refresh Now
        </button>
      </div>
    }>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LanguageSetup />
            <Routes>
              <Route path="/" element={
                <ErrorBoundary fallback={
                  <div className="p-8 text-center">
                    <h2 className="text-xl font-bold mb-4">Sorry, the home page couldn't load properly</h2>
                    <p className="mb-4">This might be due to a temporary issue. Please try refreshing.</p>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="px-4 py-2 bg-blue-600 text-white rounded"
                    >
                      Refresh Now
                    </button>
                  </div>
                }>
                  <Index />
                </ErrorBoundary>
              } />
              <Route path="/girls" element={<Girls />} />
              <Route path="/boys" element={<Boys />} />
              <Route path="/baby" element={<Baby />} />
              <Route path="/products" element={<Products />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/content" element={
                <ProtectedRoute>
                  <AdminContent />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute>
                  <AdminProducts />
                </ProtectedRoute>
              } />
              <Route path="/admin/orders" element={
                <ProtectedRoute>
                  <AdminOrders />
                </ProtectedRoute>
              } />
              <Route path="/admin/customers" element={
                <ProtectedRoute>
                  <AdminCustomers />
                </ProtectedRoute>
              } />
              <Route path="/admin/settings" element={
                <ProtectedRoute>
                  <AdminSettings />
                </ProtectedRoute>
              } />
              <Route path="/shipping" element={<ShippingReturns />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/sustainability" element={<Sustainability />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
