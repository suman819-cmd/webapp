"use client";
import React from 'react';

const ServicesPage = () => {
  return (
    <div
      className="min-h-screen py-8 px-4"
      style={{ backgroundColor: '#bfcc99' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="w-full mb-12">
          <h1 className="text-4xl font-bold text-amber-900 text-center">
            Our Services
          </h1>
        </div>

        <p className="text-lg text-amber-800 mb-12 text-center max-w-2xl mx-auto">
          From cozy dine-in experiences to convenient delivery, we're here to
          serve you the perfect cup however and wherever you prefer.
        </p>

        <div className="h-px bg-amber-300 w-full my-10"></div>

        {/* Dine-In Experience */}
        <section className="mb-16 bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            Dine-In Experience
          </h2>
          <p className="text-amber-800 mb-6">
            Enjoy our cozy atmosphere with comfortable seating, free WiFi, and
            the perfect ambiance for work or relaxation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Feature cards inside stay the same */}
            <div className="flex items-start">
              <div className="bg-amber-200 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-900">Comfortable seating</h3>
                <p className="text-sm text-amber-700">Relax in our cozy chairs and sofas</p>
              </div>
            </div>
            {/* ... other features ... */}
          </div>
          <button className="px-6 py-2 bg-amber-700 text-white rounded-md transform transition duration-300 hover:bg-amber-800 hover:scale-105 hover:shadow-lg">
            Learn More
          </button>
        </section>

        <div className="h-px bg-amber-300 w-full my-10"></div>

        {/* Takeaway Service */}
        <section className="mb-16 bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            Takeaway Service
          </h2>
          <p className="text-amber-800 mb-6">
            Quick and convenient takeaway for busy schedules. Pre-order through our app for faster pickup.
          </p>
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <div className="bg-amber-200 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-900">Fast service</h3>
                <p className="text-sm text-amber-700">Skip the wait with pre-orders</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-amber-200 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-900">Eco-friendly packaging</h3>
                <p className="text-sm text-amber-700">Sustainable and biodegradable materials</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-amber-700 text-white rounded-md transform transition duration-300 hover:bg-amber-800 hover:scale-105 hover:shadow-lg">
            Learn More
          </button>
        </section>

        <div className="h-px bg-amber-300 w-full my-10"></div>

        {/* Online Delivery */}
        <section className="mb-16 bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-amber-900 mb-4">
            Online Delivery
          </h2>
          <p className="text-amber-800 mb-6">
            Fresh beverages and snacks delivered to your doorstep through our partner delivery services.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <div className="bg-amber-200 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6h5v2H4v-2h5zm3-14a5 5 0 015 5h-2a3 3 0 00-6 0H7a5 5 0 015-5z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-900">Secure packaging</h3>
                <p className="text-sm text-amber-700">Temperature controlled for freshness</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-amber-200 p-2 rounded-full mr-3">
                <svg className="w-5 h-5 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-1.68 9.39a2 2 0 01-1.99 1.61H6.67a2 2 0 01-1.99-1.61L3 3zm0 0l1.68 9.39a2 2 0 001.99 1.61h10.66a2 2 0 001.99-1.61L21 3"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-amber-900">Fast delivery</h3>
                <p className="text-sm text-amber-700">Through trusted partners</p>
              </div>
            </div>
          </div>
          <button className="px-6 py-2 bg-amber-700 text-white rounded-md transform transition duration-300 hover:bg-amber-800 hover:scale-105 hover:shadow-lg">
            Learn More
          </button>
        </section>

        <div className="h-px bg-amber-300 w-full my-10"></div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-amber-900 mb-3">
              Event Catering
            </h3>
            <p className="text-amber-800 mb-4">
              Professional catering for corporate events, parties, and gatherings.
            </p>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-md transform transition duration-300 hover:bg-amber-700 hover:scale-105 hover:shadow-lg">
              Learn More
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-amber-900 mb-3">
              Subscription Packs
            </h3>
            <p className="text-amber-800 mb-4">
              Weekly or monthly coffee subscription delivered to your home.
            </p>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-md transform transition duration-300 hover:bg-amber-700 hover:scale-105 hover:shadow-lg">
              Learn More
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-amber-900 mb-3">
              Private Events
            </h3>
            <p className="text-amber-800 mb-4">
              Book our café space for your private functions and celebrations.
            </p>
            <button className="px-4 py-2 bg-amber-600 text-white rounded-md transform transition duration-300 hover:bg-amber-700 hover:scale-105 hover:shadow-lg">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
