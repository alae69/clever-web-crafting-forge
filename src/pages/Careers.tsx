
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageContentStore } from "@/store/pageContentStore";
import { useLanguageStore } from "@/store/languageStore";

const Careers = () => {
  const { pages } = usePageContentStore();
  const { language, t } = useLanguageStore();
  
  return (
    <div className="flex flex-col min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">{t('careers')}</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: pages.careers.content }} />
              
              {/* Sample job listings */}
              <h2 className="text-2xl font-semibold text-morocco-navy mt-8 mb-4">{t('openPositions')}</h2>
              <div className="space-y-6 mt-6">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">{t('storeManager')} - {t('rabat')}</h3>
                  <p className="text-gray-600 mb-4">{t('storeManagerDesc')}</p>
                  <button className="bg-morocco-sand text-morocco-navy px-4 py-2 rounded hover:bg-morocco-sand/80 transition">{t('applyNow')}</button>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">{t('fashionDesigner')}</h3>
                  <p className="text-gray-600 mb-4">{t('fashionDesignerDesc')}</p>
                  <button className="bg-morocco-sand text-morocco-navy px-4 py-2 rounded hover:bg-morocco-sand/80 transition">{t('applyNow')}</button>
                </div>
                <div className="border p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-morocco-navy mb-2">{t('ecommerceSpecialist')}</h3>
                  <p className="text-gray-600 mb-4">{t('ecommerceSpecialistDesc')}</p>
                  <button className="bg-morocco-sand text-morocco-navy px-4 py-2 rounded hover:bg-morocco-sand/80 transition">{t('applyNow')}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
