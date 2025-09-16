// src/app/ourservices/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import {
  X,
  Wifi,
  Coffee,
  Heart,
  Clock,
  Truck,
  Users,
  Star,
  Calendar,
  Phone,
  ShoppingCart,
  Utensils,
  Package,
  Gift,
} from "lucide-react";

// Type definitions
interface Feature {
  icon: string;
  text: string;
}

interface Testimonial {
  rating: number;
  text: string;
  author: string;
}

interface Plan {
  name: string;
  price: string;
  features: string[];
}

interface Pricing {
  plans: Plan[];
}

interface Service {
  id: string;
  title: string;
  type: string;
  description: string;
  specialNote?: string;
  features: Feature[];
  testimonials?: Testimonial[];
  pricing?: Pricing;
}

// Modal component props
interface ServiceModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

// Modal component
const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset"; // ✅ no return value
    };
  }, [isOpen]);
 if (!isOpen || !service) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) onClose();
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "wifi":
        return <Wifi size={18} className="text-amber-700" />;
      case "coffee":
        return <Coffee size={18} className="text-amber-700" />;
      case "heart":
        return <Heart size={18} className="text-amber-700" />;
      case "clock":
        return <Clock size={18} className="text-amber-700" />;
      case "truck":
        return <Truck size={18} className="text-amber-700" />;
      case "users":
        return <Users size={18} className="text-amber-700" />;
      case "utensils":
        return <Utensils size={18} className="text-amber-700" />;
      case "package":
        return <Package size={18} className="text-amber-700" />;
      case "gift":
        return <Gift size={18} className="text-amber-700" />;
      default:
        return <Coffee size={18} className="text-amber-700" />;
    }
  };

  const renderCTAs = () => {
    switch (service.type) {
      case "dine-in":
        return (
          <button className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
            <Calendar size={20} className="mr-2" />
            Book Now
          </button>
        );
      case "delivery":
      case "takeaway":
        return (
          <a
            href="/ordernow"
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
          >
            <ShoppingCart size={20} className="mr-2" />
            Order Now
          </a>
        );
      case "subscription":
        return (
          <button className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
            <Gift size={20} className="mr-2" />
            Subscribe Now
          </button>
        );
      default:
        return (
          <button className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
            <Phone size={20} className="mr-2" />
            Contact Us
          </button>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-amber-900">
            {service.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-amber-50 transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-amber-900" />
          </button>
        </div>

        <div className="p-6">
          {/* Overview */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">
              Overview
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {service.description}
            </p>
            {service.specialNote && (
              <p className="text-amber-800 font-medium mt-4">
                {service.specialNote}
              </p>
            )}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">
              Features &amp; Amenities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-amber-100 p-2 rounded-full mr-3 flex-shrink-0">
                    {renderIcon(feature.icon)}
                  </div>
                  <span className="text-gray-700">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          {service.pricing && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">
                Pricing &amp; Plans
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.pricing.plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPlan === index
                        ? "border-amber-600 bg-amber-50 shadow-md"
                        : "border-gray-200 hover:border-amber-400"
                    }`}
                    onClick={() => setSelectedPlan(index)}
                  >
                    <h4 className="font-semibold text-amber-900 mb-2">
                      {plan.name}
                    </h4>
                    <p className="text-2xl font-bold text-amber-700 mb-2">
                      {plan.price}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {plan.features.map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Testimonials */}
          {service.testimonials && service.testimonials.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">
                Customer Reviews
              </h3>
              <div className="space-y-4">
                {service.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < testimonial.rating
                                ? "text-amber-500 fill-amber-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-amber-900">
                        {testimonial.rating}/5
                      </span>
                    </div>
                    <p className="text-gray-700 italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <p className="text-sm text-amber-800 mt-2">
                      - {testimonial.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            {renderCTAs()}
            <button
              onClick={onClose}
              className="border border-amber-700 text-amber-700 font-semibold py-3 px-6 rounded-lg transition-colors hover:bg-amber-50"
            >
              Back to Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main page
const ServicesPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const servicesData: Record<string, Service> = {
    "dine-in": {
      id: "dine-in",
      title: "Dine-In Experience",
      type: "dine-in",
      description:
        "Immerse yourself in our warm and inviting dining environment, where every meal becomes a memorable experience.",
      specialNote:
        "Seasonal specials crafted with locally sourced ingredients.",
      features: [
        { icon: "wifi", text: "Free High-Speed WiFi" },
        { icon: "coffee", text: "Complimentary Refills" },
        { icon: "heart", text: "Eco-Friendly Practices" },
        { icon: "clock", text: "Extended Hours" },
        { icon: "users", text: "Group Seating Areas" },
        { icon: "coffee", text: "Specialty Brewing Methods" },
      ],
      testimonials: [
        { rating: 5, text: "Amazing atmosphere!", author: "Sarah Mitchell" },
        {
          rating: 5,
          text: "Staff made our dinner special.",
          author: "James Rodriguez",
        },
      ],
    },
    takeaway: {
      id: "takeaway",
      title: "Takeaway Service",
      type: "takeaway",
      description:
        "Quick and convenient takeaway options without compromising quality.",
      specialNote: "Order ahead for faster pickup.",
      features: [
        { icon: "clock", text: "Quick Preparation" },
        { icon: "coffee", text: "Same Quality as Dine-In" },
        { icon: "heart", text: "Eco-Friendly Packaging" },
        { icon: "truck", text: "Curbside Pickup" },
      ],
      testimonials: [
        {
          rating: 4,
          text: "Perfect for busy mornings!",
          author: "Michael Chen",
        },
      ],
    },
    delivery: {
      id: "delivery",
      title: "Online Delivery",
      type: "delivery",
      description:
        "Get beverages delivered straight to your door within 30 minutes.",
      specialNote: "Free delivery on orders over $15.",
      features: [
        { icon: "clock", text: "30-Minute Delivery" },
        { icon: "truck", text: "Real-Time Tracking" },
        { icon: "wifi", text: "Easy Online Ordering" },
      ],
      testimonials: [
        {
          rating: 5,
          text: "Coffee still hot and fresh!",
          author: "Emily Davis",
        },
      ],
    },
    subscription: {
      id: "subscription",
      title: "Monthly Subscription",
      type: "subscription",
      description: "Enjoy your favorite drinks regularly with monthly plans.",
      specialNote: "Subscribers get exclusive discounts and flavors.",
      features: [
        { icon: "gift", text: "Exclusive Seasonal Flavors" },
        { icon: "coffee", text: "Priority Preparation" },
        { icon: "package", text: "Flexible Plans & Delivery" },
      ],
      pricing: {
        plans: [
          {
            name: "Basic",
            price: "$29/mo",
            features: ["5 drinks per month", "Standard flavors"],
          },
          {
            name: "Premium",
            price: "$49/mo",
            features: ["10 drinks per month", "Seasonal & specialty flavors"],
          },
          {
            name: "Ultimate",
            price: "$79/mo",
            features: ["Unlimited drinks", "All flavors included"],
          },
        ],
      },
      testimonials: [
        {
          rating: 5,
          text: "Monthly drinks ready on time!",
          author: "Samantha Lee",
        },
      ],
    },
    events: {
      id: "events",
      title: "Event Catering",
      type: "events",
      description:
        "Professional catering service for corporate and personal events.",
      specialNote: "Custom menus and live barista stations available.",
      features: [
        { icon: "utensils", text: "Custom Menus" },
        { icon: "users", text: "Large Group Accommodation" },
        { icon: "coffee", text: "Live Barista Stations" },
      ],
      testimonials: [
        {
          rating: 5,
          text: "Our office party was a hit!",
          author: "Daniel Kim",
        },
      ],
    },
  };

  const handleLearnMore = (serviceId: string) => {
    setSelectedService(servicesData[serviceId]);
    setIsModalOpen(true);
  };

  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: "#bfcc99" }}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-amber-900 text-center mb-12">
          Our Services
        </h1>
        <p className="text-lg text-amber-800 mb-12 text-center max-w-2xl mx-auto">
          From cozy dine-in experiences to convenient delivery, we&apos;re here
          to serve you the perfect cup however and wherever you prefer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(servicesData).map((service) => (
            <div
              key={service.id}
              className="bg-amber-50 p-6 rounded-2xl shadow hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-amber-900 mb-4">
                {service.title}
              </h2>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <button
                onClick={() => handleLearnMore(service.id)}
                className="bg-amber-700 hover:bg-amber-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ServicesPage;
