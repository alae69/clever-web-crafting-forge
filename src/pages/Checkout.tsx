import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useOrderStore } from "@/store/orderStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Shipping options with costs
const shippingOptions = [
  { id: "standard", name: "Standard Shipping", cost: 30, time: "3-5 business days" },
  { id: "express", name: "Express Shipping", cost: 60, time: "1-2 business days" },
  { id: "free", name: "Free Shipping", cost: 0, time: "5-7 business days" },
];

const Checkout = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0].id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Get selected shipping option
  const getSelectedShippingOption = () => {
    return shippingOptions.find(option => option.id === selectedShipping) || shippingOptions[0];
  };

  // Calculate total with shipping
  const calculateTotal = () => {
    const subtotal = getTotal();
    const shippingCost = getSelectedShippingOption().cost;
    return subtotal + shippingCost;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const shippingOption = getSelectedShippingOption();
    
    // Create a new order
    const newOrder = addOrder({
      customer: formData.fullName,
      date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      total: calculateTotal(),
      status: "pending",
      items: items.map(item => `${item.name} (x${item.quantity})`),
      contact: formData.email || formData.phone,
      shippingMethod: shippingOption.name,
      shippingCost: shippingOption.cost
    });
    
    // Clear cart and redirect to track order page
    toast.success(`Order placed successfully! Your order number is ${newOrder.orderNumber}`);
    clearCart();
    navigate(`/track-order?order=${newOrder.orderNumber}`);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-morocco-navy mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Zip Code
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-morocco-terracotta focus:border-morocco-terracotta"
                      />
                    </div>
                    
                    {/* Shipping Method Selection */}
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-3">Shipping Method</h3>
                      <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping} className="space-y-3">
                        {shippingOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2 border p-3 rounded-md">
                            <RadioGroupItem value={option.id} id={`shipping-${option.id}`} />
                            <Label htmlFor={`shipping-${option.id}`} className="flex-1 cursor-pointer">
                              <div className="flex justify-between">
                                <span className="font-medium">{option.name}</span>
                                <span className="font-medium">{option.cost === 0 ? 'Free' : `${option.cost} MAD`}</span>
                              </div>
                              <p className="text-gray-500 text-sm">{option.time}</p>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    
                    <Button type="submit" className="w-full mt-6 bg-morocco-navy hover:bg-morocco-terracotta">
                      Place Order
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toFixed(2)} MAD</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{getTotal().toFixed(2)} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>
                      {getSelectedShippingOption().cost === 0 
                        ? "Free" 
                        : `${getSelectedShippingOption().cost.toFixed(2)} MAD`}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-2 mb-6">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span className="text-morocco-terracotta">{calculateTotal().toFixed(2)} MAD</span>
                  </div>
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

export default Checkout;
