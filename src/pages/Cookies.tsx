
import React, { useEffect } from 'react';
import { usePageContentStore } from '@/store/pageContentStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/store/languageStore';

const Cookies = () => {
  const { pages } = usePageContentStore();
  const { t } = useLanguageStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-8">
            {t('cookies') || 'Cookie Policy'}
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">Last updated: May 21, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used to make websites work more efficiently and provide information to the website owners.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">We use cookies to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Remember your preferences and settings</li>
                <li>Remember your shopping cart items</li>
                <li>Understand how you use our website</li>
                <li>Improve your experience on our website</li>
                <li>Personalize content and advertisements</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">3. Types of Cookies We Use</h2>
              <p className="mb-4">We use the following types of cookies:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Essential cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems.</li>
                <li><strong>Performance cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
                <li><strong>Functionality cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
                <li><strong>Targeting cookies:</strong> These cookies may be set through our site by our advertising partners to build a profile of your interests.</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">4. Managing Cookies</h2>
              <p className="mb-4">
                You can set your browser to refuse all or some cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of our website may become inaccessible or not function properly.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us through our contact page or email us at cookies@najihkids.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;
