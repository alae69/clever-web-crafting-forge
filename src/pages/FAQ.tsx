
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { useLanguageStore } from "@/store/languageStore";

const FAQ = () => {
  const { language, t } = useLanguageStore();
  
  return (
    <div className="flex flex-col min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">{t('faq')}</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('generalQuestions')}</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="general-1">
                  <AccordionTrigger>{t('faqGeneral1Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqGeneral1Answer')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="general-2">
                  <AccordionTrigger>{t('faqGeneral2Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqGeneral2Answer')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="general-3">
                  <AccordionTrigger>{t('faqGeneral3Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqGeneral3Answer')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('ordersAndShipping')}</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="orders-1">
                  <AccordionTrigger>{t('faqOrders1Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqOrders1Answer')}{" "}
                      <Link to="/track-order" className="text-morocco-terracotta hover:underline">
                        {t('trackOrder')}
                      </Link>{" "}
                      {t('faqOrders1AnswerCont')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="orders-2">
                  <AccordionTrigger>{t('faqOrders2Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqOrders2Answer')}{" "}
                      <Link to="/shipping" className="text-morocco-terracotta hover:underline">
                        {t('shippingAndReturns')}
                      </Link>{" "}
                      {t('faqOrders2AnswerCont')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="orders-3">
                  <AccordionTrigger>{t('faqOrders3Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqOrders3Answer')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{t('returnsAndExchanges')}</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="returns-1">
                  <AccordionTrigger>{t('faqReturns1Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqReturns1Answer')}{" "}
                      <Link to="/shipping" className="text-morocco-terracotta hover:underline">
                        {t('shippingAndReturns')}
                      </Link>{" "}
                      {t('faqReturns1AnswerCont')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="returns-2">
                  <AccordionTrigger>{t('faqReturns2Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqReturns2Answer')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="returns-3">
                  <AccordionTrigger>{t('faqReturns3Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqReturns3Answer')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">{t('productCare')}</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="care-1">
                  <AccordionTrigger>{t('faqCare1Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqCare1Answer')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="care-2">
                  <AccordionTrigger>{t('faqCare2Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqCare2Answer')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="care-3">
                  <AccordionTrigger>{t('faqCare3Question')}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-gray-600">
                      {t('faqCare3Answer')}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
