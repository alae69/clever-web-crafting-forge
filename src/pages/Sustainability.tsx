
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePageContentStore } from "@/store/pageContentStore";
import { useLanguageStore } from "@/store/languageStore";
import { useContentStore } from "@/store/contentStore";
import { useEffect } from "react";

const Sustainability = () => {
  const { pages } = usePageContentStore();
  const { language, t } = useLanguageStore();
  const { lastUpdated, refreshContent } = useContentStore();
  
  // Effect to refresh content when component mounts
  useEffect(() => {
    refreshContent();
    console.log("Sustainability page - content refreshed at:", new Date(lastUpdated).toISOString());
  }, [refreshContent, lastUpdated]);
  
  return (
    <div className="flex flex-col min-h-screen" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar key={`nav-${lastUpdated}`} />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">{t('sustainability')}</h1>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: pages.sustainability.content }} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer key={`footer-${lastUpdated}`} />
    </div>
  );
};

export default Sustainability;
