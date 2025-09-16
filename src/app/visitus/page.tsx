// components/VisitUs.jsx
"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const VisitUs = () => {
  const [loading, setLoading] = useState(false);

  const handleGetDirections = () => {
    setLoading(true);
    // Open Google Maps in a new tab after short delay to show "loading" effect
    setTimeout(() => {
      window.open(
        "https://www.google.com/maps/dir/?api=1&destination=123+Spice+Lane+New+York+NY+10001",
        "_blank"
      );
      setLoading(false);
    }, 500); // 0.5 second delay for effect
  };

  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-900 mb-4">
            Come Enjoy a Cup With Us
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Step into our cozy sanctuary where every cup tells a story. We&apos;ve created
            the perfect space to relax, connect, and savor the finest chai and coffee blends.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map Section */}
          <div className="lg:w-1/2 h-96 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184052371256!2d-73.9876141845934!3d40.75831467932678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855b8fb3083%3A0xa0f9aef176042a5c!2sGrand%20Central%20Terminal!5e0!3m2!1sen!2sus!4v1658954670330!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
              title="Store Location"
            ></iframe>
          </div>

          {/* Info Section */}
          <div className="lg:w-1/2 bg-white rounded-2xl p-8 shadow-lg">
            {/* Business Hours */}
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-semibold text-amber-900 mb-4 flex items-center">
                <FaClock className="mr-2 text-amber-700" /> Business Hours
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="flex justify-between mb-2">
                    <span className="font-medium">Monday - Friday</span>
                    <span>7:00 AM - 9:00 PM</span>
                  </p>
                  <p className="flex justify-between mb-2">
                    <span className="font-medium">Saturday</span>
                    <span>8:00 AM - 10:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>8:00 AM - 8:00 PM</span>
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <p className="text-amber-700 font-medium">Holiday Hours</p>
                  <p className="text-sm text-amber-600">
                    We may have special hours during holidays. Please call ahead to confirm.
                  </p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h3 className="text-2xl font-serif font-semibold text-amber-900 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-amber-700" /> Find Us
              </h3>
              <p className="text-amber-800 mb-2">123 Spice Lane</p>
              <p className="text-amber-800">New York, NY 10001</p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-serif font-semibold text-amber-900 mb-4 flex items-center">
                <FaPhone className="mr-2 text-amber-700" /> Get In Touch
              </h3>
              <p className="text-amber-800 mb-2 flex items-center">
                <FaPhone className="mr-2 text-amber-600" /> (555) 123-4567
              </p>
              <p className="text-amber-800 flex items-center">
                <FaEnvelope className="mr-2 text-amber-600" /> hello@chaicoffee.com
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-xl font-serif text-amber-900 italic mb-6">
            We&apos;re brewing happiness daily – drop by anytime!
          </p>
          <button
            onClick={handleGetDirections}
            disabled={loading}
            className={`bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Loading..." : "Get Directions"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default VisitUs;
