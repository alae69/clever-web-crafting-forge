
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Type for website text content
export interface WebsiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  aboutTitle: string;
  aboutDescription: string;
  featuredTitle: string;
  contactTitle: string;
  contactSubtitle: string;
  footerText: string;
  // Add new fields for Why Choose Us section
  whyChooseUsTitle: string;
  whyChooseUsSubtitle: string;
  benefits: Array<{
    title: string;
    description: string;
  }>;
}

// Type for image content
export interface WebsiteImages {
  heroImage: string;
  aboutImage: string;
  bannerImage: string;
}

// Type for countdown settings
export interface CountdownSettings {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  enabled: boolean;
}

// Type for subscribers data
export interface Subscriber {
  email: string;
  dateSubscribed: string;
  name?: string;
}

interface ContentStore {
  textContent: WebsiteContent;
  images: WebsiteImages;
  countdown: CountdownSettings;
  subscribers: Subscriber[];
  lastUpdated: number; // Timestamp to track updates
  updateTextContent: (content: Partial<WebsiteContent>) => void;
  updateImage: (key: keyof WebsiteImages, url: string) => void;
  updateCountdown: (settings: Partial<CountdownSettings>) => void;
  addSubscriber: (subscriber: Subscriber) => void;
  removeSubscriber: (email: string) => void;
  refreshContent: () => void; // Method to force a refresh
}

// Default website content
const defaultTextContent: WebsiteContent = {
  heroTitle: "Contemporary Moroccan-Inspired Children's Clothing",
  heroSubtitle: "Combining traditional craftsmanship with modern design, our collections feature vibrant colors and patterns that celebrate Moroccan heritage.",
  heroButtonText: "Shop Collection",
  aboutTitle: "Our Story",
  aboutDescription: "Founded in Marrakech, NajihKids blends Moroccan artisanal techniques with contemporary designs, creating unique children's clothing that celebrates heritage while embracing modern style.",
  featuredTitle: "Featured Products",
  contactTitle: "Get in Touch",
  contactSubtitle: "Have questions about our products? Contact us directly or use the form below.",
  footerText: "© 2025 NajihKids. All rights reserved.",
  // Add default values for Why Choose Us section
  whyChooseUsTitle: "Why Choose Us",
  whyChooseUsSubtitle: "We are committed to providing the best experience for you and your little ones",
  benefits: [
    { 
      title: "Free Shipping", 
      description: "Free shipping on all orders over 500 MAD" 
    },
    { 
      title: "Superior Quality", 
      description: "Handcrafted with the finest materials" 
    },
    { 
      title: "Easy Returns", 
      description: "30-day money back guarantee" 
    },
    { 
      title: "Customer Support", 
      description: "24/7 dedicated customer service" 
    },
  ]
};

// Default website images
const defaultImages: WebsiteImages = {
  heroImage: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80",
  aboutImage: "https://images.unsplash.com/photo-1596966539250-d2217486ff0e?auto=format&fit=crop&w=800&q=80",
  bannerImage: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1600&q=80"
};

// Default countdown settings
const defaultCountdown: CountdownSettings = {
  days: 10,
  hours: 8,
  minutes: 45,
  seconds: 30,
  enabled: true
};

// Sample subscribers (empty by default)
const defaultSubscribers: Subscriber[] = [
  { 
    email: "sample@example.com", 
    dateSubscribed: "2025-05-15", 
    name: "Sample User" 
  }
];

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      textContent: defaultTextContent,
      images: defaultImages,
      countdown: defaultCountdown,
      subscribers: defaultSubscribers,
      lastUpdated: Date.now(),
      updateTextContent: (content) => {
        set((state) => ({
          textContent: { ...state.textContent, ...content },
          lastUpdated: Date.now() // Update timestamp
        }));
        console.log("Content updated:", content);
      },
      updateImage: (key, url) => {
        set((state) => ({
          images: { ...state.images, [key]: url },
          lastUpdated: Date.now() // Update timestamp
        }));
        console.log("Image updated:", key, url);
      },
      updateCountdown: (settings) => {
        set((state) => ({
          countdown: { ...state.countdown, ...settings },
          lastUpdated: Date.now()
        }));
        console.log("Countdown updated:", settings);
      },
      addSubscriber: (subscriber) => {
        set((state) => ({
          subscribers: [...state.subscribers, subscriber],
          lastUpdated: Date.now()
        }));
        console.log("Subscriber added:", subscriber);
      },
      removeSubscriber: (email) => {
        set((state) => ({
          subscribers: state.subscribers.filter(sub => sub.email !== email),
          lastUpdated: Date.now()
        }));
        console.log("Subscriber removed:", email);
      },
      refreshContent: () => {
        // Force a refresh by updating the timestamp without changing content
        set({ lastUpdated: Date.now() });
        console.log("Content store refreshed at:", new Date().toISOString());
      }
    }),
    {
      name: 'content-storage', // unique name for the localStorage key
      version: 1, // Adding versioning to track storage schema changes
    }
  )
);
