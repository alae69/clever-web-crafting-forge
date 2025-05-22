
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PageContent {
  title: string;
  content: string;
}

export interface PageContentStore {
  about: PageContent;
  sustainability: PageContent;
  careers: PageContent;
  shipping: PageContent;
  contact: PageContent;
  privacy: PageContent;
  terms: PageContent;
  cookies: PageContent;
}

// Initial page content
const initialPageContent: PageContentStore = {
  about: {
    title: "Our Story",
    content: "Founded in Marrakech, NajihKids blends Moroccan artisanal techniques with contemporary designs, creating unique children's clothing that celebrates heritage while embracing modern style."
  },
  sustainability: {
    title: "Sustainability",
    content: "At NajihKids, sustainability is at the heart of everything we do. We believe in creating clothing that not only looks good but does good for the planet and the people involved in making our products."
  },
  careers: {
    title: "Join Our Team",
    content: "We're always looking for passionate individuals to join our growing team. Check out our current openings below and become part of our story."
  },
  shipping: {
    title: "Shipping & Returns",
    content: "We offer free shipping on all orders over 500 MAD. Returns are accepted within 30 days of purchase. Please see our full policy for details."
  },
  contact: {
    title: "Get in Touch",
    content: "Have questions about our products? Contact us directly or use the form below."
  },
  privacy: {
    title: "Privacy Policy",
    content: "This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from NajihKids."
  },
  terms: {
    title: "Terms of Service",
    content: "These Terms of Service govern your use of the website operated by NajihKids and the purchase of products through our website."
  },
  cookies: {
    title: "Cookie Policy",
    content: "This Cookie Policy explains how NajihKids uses cookies and similar technologies to recognize you when you visit our website."
  }
};

export const usePageContentStore = create<{
  pages: PageContentStore;
  updatePage: (page: keyof PageContentStore, content: PageContent) => void;
}>()(
  persist(
    (set) => ({
      pages: initialPageContent,
      updatePage: (page, content) =>
        set((state) => ({
          pages: {
            ...state.pages,
            [page]: content
          }
        }))
    }),
    {
      name: 'page-content-storage'
    }
  )
);
