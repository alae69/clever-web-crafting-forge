
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageContentStore } from "@/store/pageContentStore";
import { useLanguageStore } from "@/store/languageStore";
import { useContentStore } from "@/store/contentStore";
import { useEffect } from "react";
import { Truck, Package, ArrowLeftRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ShippingReturns = () => {
  const { pages } = usePageContentStore();
  const { language, t } = useLanguageStore();
  const { lastUpdated, refreshContent } = useContentStore();
  
  // Effect to refresh content when component mounts
  useEffect(() => {
    refreshContent();
    console.log("Shipping page - content refreshed at:", new Date(lastUpdated).toISOString());
  }, [refreshContent, lastUpdated]);
  
  return (
    <div className="flex flex-col min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar key={`nav-${lastUpdated}`} />
      
      <main className="flex-1">
        <div className="relative bg-morocco-navy py-16">
          <div className="absolute inset-0 opacity-10 bg-moroccan-pattern"></div>
          <div className="container-custom relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('shippingAndReturns')}</h1>
            <p className="text-morocco-sand/90 text-lg max-w-2xl">
              {t('shippingReturnsDescription') || "Learn about our shipping options and returns policy to ensure a smooth shopping experience."}
            </p>
          </div>
        </div>
        
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="shadow-md border-morocco-sand/30 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-morocco-sand/10 border-b border-morocco-sand/20">
                <CardTitle className="flex items-center gap-3">
                  <Truck className="h-6 w-6 text-morocco-terracotta" />
                  <span>{t('shipping') || "Shipping"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  {t('shippingDescription') || "We offer multiple shipping options to meet your needs."}
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border-morocco-sand/30 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-morocco-sand/10 border-b border-morocco-sand/20">
                <CardTitle className="flex items-center gap-3">
                  <Package className="h-6 w-6 text-morocco-blue" />
                  <span>{t('delivery') || "Delivery"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  {t('deliveryDescription') || "We deliver to all cities in Morocco with reliable tracking."}
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border-morocco-sand/30 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-morocco-sand/10 border-b border-morocco-sand/20">
                <CardTitle className="flex items-center gap-3">
                  <ArrowLeftRight className="h-6 w-6 text-morocco-green" />
                  <span>{t('returns') || "Returns"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-4">
                  {t('returnsDescription') || "Hassle-free returns within 30 days of purchase."}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: pages.shipping.content }} />
            </div>
          </div>
          
          {/* Shipping Options Table */}
          <Card className="mb-8 overflow-hidden border-morocco-sand/30 shadow-lg">
            <CardHeader className="bg-morocco-navy text-white border-b border-morocco-sand/20">
              <CardTitle className="flex items-center gap-3">
                <Truck className="h-6 w-6" />
                <span>{t('shippingDetails') || "Shipping Details"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-morocco-navy/5">
                      <th className="py-4 px-6 text-left font-semibold text-morocco-navy border-b">{t('shippingMethod') || "Shipping Method"}</th>
                      <th className="py-4 px-6 text-left font-semibold text-morocco-navy border-b">{t('estimatedDelivery') || "Estimated Delivery"}</th>
                      <th className="py-4 px-6 text-left font-semibold text-morocco-navy border-b">{t('cost') || "Cost"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-morocco-sand/10 transition-colors">
                      <td className="py-4 px-6 border-b border-morocco-sand/20">{t('standardShipping') || "Standard Shipping"}</td>
                      <td className="py-4 px-6 border-b border-morocco-sand/20">{t('standardShippingTime') || "5-7 Business Days"}</td>
                      <td className="py-4 px-6 border-b border-morocco-sand/20">30 MAD</td>
                    </tr>
                    <tr className="hover:bg-morocco-sand/10 transition-colors">
                      <td className="py-4 px-6 border-b border-morocco-sand/20">{t('expressShipping') || "Express Shipping"}</td>
                      <td className="py-4 px-6 border-b border-morocco-sand/20">{t('expressShippingTime') || "2-3 Business Days"}</td>
                      <td className="py-4 px-6 border-b border-morocco-sand/20">60 MAD</td>
                    </tr>
                    <tr className="hover:bg-morocco-sand/10 transition-colors">
                      <td className="py-4 px-6 border-b border-morocco-sand/20">{t('freeShipping') || "Free Shipping"}</td>
                      <td className="py-4 px-6 border-b border-morocco-sand/20">5-7 {t('businessDays') || "Business Days"}</td>
                      <td className="py-4 px-6 border-b border-morocco-sand/20 font-semibold text-morocco-green">{t('free') || "Free"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
              
          <Card className="border-morocco-sand/30 shadow-lg">
            <CardHeader className="bg-morocco-navy text-white border-b border-morocco-sand/20">
              <CardTitle>{t('returnsPolicy') || "Returns Policy"}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-morocco-terracotta/10 text-morocco-terracotta rounded-full p-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>{t('returnsAccepted') || "Returns accepted within 30 days of purchase with original receipt."}</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-morocco-terracotta/10 text-morocco-terracotta rounded-full p-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>{t('returnsCondition') || "Items must be in original condition with tags attached."}</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-morocco-terracotta/10 text-morocco-terracotta rounded-full p-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>{t('returnShipping') || "Customer is responsible for return shipping costs unless the item is defective."}</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-morocco-terracotta/10 text-morocco-terracotta rounded-full p-1 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p>{t('refundProcessing') || "Refunds are processed within 7-10 business days after receiving the returned item."}</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer key={`footer-${lastUpdated}`} />
    </div>
  );
};

export default ShippingReturns;
