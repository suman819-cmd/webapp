'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MenuPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('chiya');

  const menuItems = {
    chiya: [
      { id: 1, name: "Milk Tea", price: 80, description: "Traditional spiced tea with cardamom, cinnamon, ginger, and cloves" },
      { id: 2, name: "Black Tea", price: 70, description: "Creamy black tea with fresh milk, perfectly balanced" },
      { id: 3, name: "Green Tea", price: 60, description: "Pure organic green tea leaves, light and refreshing" }
      
    ],
    herbal: [
      { id: 4, name: "Herbal Blend", price: 90, description: "Chamomile, mint, and lemon balm for a soothing experience" },
      { id: 5, name: "Black Tea", price: 50, description: "Strong, bold black tea for the purists" },
      { id: 6, name: "Honey Ginger Tea", price: 85, description: "Warming ginger tea with natural honey" }
    ],
    coffee: [
      { id: 7, name: "Nepali Coffee", price: 95, description: "Locally sourced coffee beans, rich and aromatic" },
      { id: 8, name: "Espresso", price: 85, description: "Strong and concentrated coffee shot" },
      { id: 9, name: "Cappuccino", price: 110, description: "Perfect blend of espresso, steamed milk, and foam" },
      { id: 10, name: "Latte", price: 120, description: "Smooth espresso with plenty of steamed milk" },
      { id: 11, name: "Cold Brew", price: 130, description: "Slow-steeped coffee served chilled" }
    ]
  };

  const handleAddToOrder = (item: { id: number; name: string; price: number; description: string }) => {
    // Navigate to /ordernow with query params for preselecting the item
    router.push(`/ordernow?itemId=${item.id}&itemName=${encodeURIComponent(item.name)}&itemPrice=${item.price}`);
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Our Menu</h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            From traditional Nepali chiya to artisan coffee, discover flavors that warm your heart and soul.
          </p>

          <div className="flex justify-center space-x-4 mt-8 flex-wrap">
            {['chiya', 'herbal', 'coffee'].map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category ? 'bg-amber-600 text-white' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category === 'chiya' ? 'Chiya Varieties' : category === 'herbal' ? 'Herbal Teas' : 'Coffee Selection'}
              </button>
            ))}
          </div>
        </header>

        <div className="border-t border-amber-200 my-8"></div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-amber-800 mb-6 pl-4">
            {activeCategory === 'chiya' && 'Chiya Varieties'}
            {activeCategory === 'herbal' && 'Herbal Teas'}
            {activeCategory === 'coffee' && 'Coffee Selection'}
          </h2>

          <div className="flex flex-wrap gap-6 px-4 justify-center">
            {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
              <div
                key={item.id}
                className="w-80 bg-white rounded-xl shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl"
              >
                <h3 className="text-xl font-semibold text-amber-900 mb-3">{item.name}</h3>
                <p className="text-amber-700 mb-5 h-14 overflow-hidden">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-amber-900">Rs. {item.price}</span>
                  <button
                    onClick={() => handleAddToOrder(item)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-amber-200">
          <a href="/ordernow" className="inline-block bg-amber-800 text-white px-6 py-3 rounded-lg hover:bg-amber-900 transition-colors">
            View Full Menu & Order Online
          </a>
        </div>
      </div>
    </div>
  );
}
