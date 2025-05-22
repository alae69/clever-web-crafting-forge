import { Link } from 'react-router-dom';
import { Instagram, Facebook, X } from 'lucide-react';
import { useSocialStore } from '@/store/socialStore';
import { useLanguageStore } from '@/store/languageStore';
const Footer = () => {
  const year = new Date().getFullYear();
  const {
    socialLinks
  } = useSocialStore();
  const {
    t
  } = useLanguageStore();
  return <footer className="bg-morocco-navy text-white pt-20">
      {/* Decorative pattern */}
      <div className="relative">
        <div className="absolute inset-0 moroccan-pattern-bg opacity-10"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-16">
            {/* Logo and about */}
            <div className="lg:col-span-5">
              <Link to="/" className="flex items-center">
                <span className="font-heading text-3xl font-bold tracking-tight">
                  <span className="text-morocco-terracotta">Najih</span>
                  <span className="text-white">Kids</span>
                </span>
              </Link>
              <p className="mt-6 text-gray-300 max-w-lg text-lg leading-relaxed">
                Premium Moroccan-inspired children's clothing that combines 
                traditional craftsmanship with modern design for comfort and style.
              </p>
              <div className="flex space-x-5 mt-8">
                {socialLinks.instagram && <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-morocco-terracotta transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                    <Instagram className="h-6 w-6" />
                  </a>}
                {socialLinks.facebook && <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-morocco-terracotta transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                    <Facebook className="h-6 w-6" />
                  </a>}
                {socialLinks.twitter && <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-morocco-terracotta transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10">
                    <X className="h-6 w-6" />
                  </a>}
              </div>
            </div>

            {/* Quick links */}
            <div className="lg:col-span-2 lg:ml-auto">
              <h3 className="font-bold text-xl mb-6 text-white border-b border-white/10 pb-2">{t('shop') || 'Shop'}</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/girls" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('girls') || 'Girls'}
                  </Link>
                </li>
                <li>
                  <Link to="/boys" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('boys') || 'Boys'}
                  </Link>
                </li>
                <li>
                  <Link to="/baby" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('baby') || 'Baby'}
                  </Link>
                </li>
                <li>
                  <Link to="/new-arrivals" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('newArrivals') || 'New Arrivals'}
                  </Link>
                </li>
                <li>
                  <Link to="/sale" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('sale') || 'Sale'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* About links */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-xl mb-6 text-white border-b border-white/10 pb-2">{t('company') || 'Company'}</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('aboutUs') || 'About Us'}
                  </Link>
                </li>
                <li>
                  <Link to="/sustainability" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('sustainability') || 'Sustainability'}
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('careers') || 'Careers'}
                  </Link>
                </li>
                <li>
                  <Link to="/stores" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('stores') || 'Our Stores'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer service */}
            <div className="lg:col-span-3">
              <h3 className="font-bold text-xl mb-6 text-white border-b border-white/10 pb-2">{t('customerService') || 'Customer Service'}</h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('contactUs') || 'Contact Us'}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('faqs') || 'FAQs'}
                  </Link>
                </li>
                <li>
                  <Link to="/shipping" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('shippingReturns') || 'Shipping & Returns'}
                  </Link>
                </li>
                <li>
                  <Link to="/track-order" className="text-gray-300 hover:text-morocco-terracotta transition-colors hover:pl-1">
                    {t('trackOrder') || 'Track Order'}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter subscription (optional) */}
          <div className="border-t border-white/10 pt-10 pb-6 mb-8">
            
          </div>

          {/* Bottom section */}
          <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {year} NajihKids. {t('allRightsReserved') || 'All rights reserved.'}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                {t('privacy') || 'Privacy Policy'}
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                {t('terms') || 'Terms of Service'}
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                {t('cookies') || 'Cookie Policy'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;