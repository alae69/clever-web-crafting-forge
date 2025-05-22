
import React, { useEffect } from 'react';
import { usePageContentStore } from '@/store/pageContentStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/store/languageStore';

const Privacy = () => {
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
            {t('privacy') || 'Privacy Policy'}
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">Last updated: May 21, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect personal information that you voluntarily provide to us when you register on the website, express interest in obtaining information about us or our products, when you participate in activities on the website, or otherwise when you contact us.
              </p>
              <p>
                The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include name, email address, postal address, phone numbers, and payment information.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">2. How We Use Your Information</h2>
              <p className="mb-2">We use the information we collect in various ways, including to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you to provide updates and other information</li>
                <li>Process your orders and manage your account</li>
                <li>Find and prevent fraud</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">3. Sharing Your Information</h2>
              <p>
                We may share your information with our third-party service providers, affiliates, and other third parties to help us provide, improve, and promote our services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">4. Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as the right to request access to, correction of, or deletion of your information.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us through our contact page or email us at privacy@najihkids.com.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
