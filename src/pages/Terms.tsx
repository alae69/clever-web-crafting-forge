
import React, { useEffect } from 'react';
import { usePageContentStore } from '@/store/pageContentStore';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguageStore } from '@/store/languageStore';

const Terms = () => {
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
            {t('terms') || 'Terms of Service'}
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-4">Last updated: May 21, 2025</p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access our services.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">2. Use of Our Services</h2>
              <p className="mb-4">
                You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>In any way that violates applicable laws or regulations</li>
                <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the services</li>
                <li>To impersonate or attempt to impersonate NajihKids or its employees</li>
                <li>To engage in any other conduct that could damage or harm NajihKids</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">3. Purchases</h2>
              <p className="mb-4">
                All purchases through our site are governed by these Terms of Service. By placing an order, you represent that:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>You are of legal age to form a binding contract</li>
                <li>All information you provide is accurate and complete</li>
                <li>You have the legal right to use any payment method you provide</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">4. Product Information</h2>
              <p>
                We make every effort to display as accurately as possible the colors, features, and details of our products. However, we cannot guarantee that your computer or mobile device's display accurately reflects the actual colors and details of the products.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-morocco-navy mb-4">5. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on our website and updating the "Last updated" date.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
