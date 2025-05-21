
import { CheckCircle, Layout, Zap, Users, Smartphone, Shield } from "lucide-react";

const features = [
  {
    icon: <Layout className="h-8 w-8 text-blue-500" />,
    title: "Beautiful Templates",
    description: "Start with professionally designed templates that look great on any device."
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    title: "Fast & Responsive",
    description: "Our websites load quickly and look amazing on desktop, tablet, and mobile."
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "User-Friendly",
    description: "Easy-to-use interface makes building your website simple and enjoyable."
  },
  {
    icon: <Smartphone className="h-8 w-8 text-blue-500" />,
    title: "Mobile Optimized",
    description: "Every site looks perfect on all devices right out of the box."
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: "Secure & Reliable",
    description: "Your website will be fast, secure, and always available to visitors."
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-blue-500" />,
    title: "SEO Ready",
    description: "Built with best practices for search engine optimization."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create and launch stunning websites that drive results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
