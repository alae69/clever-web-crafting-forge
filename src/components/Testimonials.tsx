
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "This platform made creating my business website incredibly easy. I launched in days instead of months.",
    author: "Sarah Johnson",
    role: "Small Business Owner",
    stars: 5
  },
  {
    quote: "The templates are beautiful and the editor is intuitive. I've received so many compliments on my new site.",
    author: "Michael Chen",
    role: "Freelance Photographer",
    stars: 5
  },
  {
    quote: "Customer support is exceptional. They helped me customize my site exactly how I wanted it.",
    author: "Alex Rivera",
    role: "Restaurant Owner",
    stars: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their online presence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
