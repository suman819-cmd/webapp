// "use client";

// import React, { useState } from "react";
// import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "256px", // matches h-64
// };

// const center = {
//   lat: 27.7152, // Thamel, Kathmandu
//   lng: 85.3240,
// };

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     subject: "",
//     message: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = { name: "", phone: "", email: "", subject: "", message: "" };

//     if (!formData.name.trim()) {
//       newErrors.name = "Full name is required";
//       valid = false;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//       valid = false;
//     }

//     if (!formData.subject.trim()) {
//       newErrors.subject = "Subject is required";
//       valid = false;
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log("Form submitted:", formData);
//       alert("Thank you for your message! We will get back to you soon.");
//       setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
//     }
//   };

//   // Load Google Maps API
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
//   });

//   return (
//     <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-amber-900 mb-4">Get In Touch</h1>
//           <p className="text-lg text-amber-800 max-w-2xl mx-auto">
//             Have questions about our menu, want to book an event, or just want to say hello?
//             We'd love to hear from you!
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Contact Form */}
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold text-amber-900 mb-6">Send Us a Message</h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Your full name"
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
//                     errors.name ? "border-red-500" : "border-amber-300"
//                   }`}
//                 />
//                 {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
//               </div>

//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-amber-900 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="+977 0000000000"
//                   className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-1">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="you@email.com"
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
//                     errors.email ? "border-red-500" : "border-amber-300"
//                   }`}
//                 />
//                 {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//               </div>

//               <div>
//                 <label htmlFor="subject" className="block text-sm font-medium text-amber-900 mb-1">
//                   Subject *
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   placeholder="How can we help?"
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
//                     errors.subject ? "border-red-500" : "border-amber-300"
//                   }`}
//                 />
//                 {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-1">
//                   Message *
//                 </label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   rows={5}
//                   placeholder="Tell us more about your inquiry..."
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
//                     errors.message ? "border-red-500" : "border-amber-300"
//                   }`}
//                 />
//                 {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-amber-700 text-white py-3 px-6 rounded-lg hover:bg-amber-800 transition-colors font-medium"
//               >
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <div className="bg-white p-8 rounded-lg shadow-md mb-8">
//               <h2 className="text-2xl font-semibold text-amber-900 mb-6">Location</h2>
//               <div className="space-y-4">
//                 {/* Address */}
//                 <div className="flex items-start">
//                   <div className="bg-amber-100 p-3 rounded-full mr-4">
//                     <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-amber-900">Address</h3>
//                     <p className="text-amber-800">Thamel, Kathmandu, Nepal</p>
//                     <p className="text-amber-800">Near Garden of Dreams</p>
//                   </div>
//                 </div>

//                 {/* Phone */}
//                 <div className="flex items-start">
//                   <div className="bg-amber-100 p-3 rounded-full mr-4">
//                     <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-amber-900">Phone</h3>
//                     <p className="text-amber-800">+977-1-4444567</p>
//                     <p className="text-amber-800">+977-9800000000</p>
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="flex items-start">
//                   <div className="bg-amber-100 p-3 rounded-full mr-4">
//                     <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-amber-900">Email</h3>
//                     <p className="text-amber-800">hello@chiyacoffee.com</p>
//                     <p className="text-amber-800">orders@chiyacoffee.com</p>
//                   </div>
//                 </div>

//                 {/* Hours */}
//                 <div className="flex items-start">
//                   <div className="bg-amber-100 p-3 rounded-full mr-4">
//                     <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="font-medium text-amber-900">Hours</h3>
//                     <p className="text-amber-800">Mon-Fri: 7:00 AM - 9:00 PM</p>
//                     <p className="text-amber-800">Sat-Sun: 8:00 AM - 10:00 PM</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Social Media */}
//             <div className="bg-white p-8 rounded-lg shadow-md">
//               <h2 className="text-2xl font-semibold text-amber-900 mb-6">Follow Us</h2>
//               <p className="text-amber-800 mb-6">
//                 Stay updated with our latest offerings, events, and online culture content.
//               </p>
//               <div className="flex space-x-4">
//                 {/* Social icons (same as original) */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Map Section */}
//         <div className="bg-white p-8 rounded-lg shadow-md mt-12">
//           <h2 className="text-2xl font-semibold text-amber-900 mb-6">Find Us Here</h2>
//           {isLoaded ? (
//             <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
//               <Marker position={center} />
//             </GoogleMap>
//           ) : (
//             <div className="bg-amber-100 h-64 rounded-lg flex items-center justify-center">
//               <p className="text-amber-700 font-medium">Loading map...</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;









"use client";

import React, { useState, useEffect } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      initMap();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    console.log("Google Maps script loaded");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit using Formspree
      const action = "https://formspree.io/f/mblabdll"; // Your Formspree endpoint

      fetch(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            setIsSubmitted(true);
            setFormData({
              name: "",
              phone: "",
              email: "",
              subject: "",
              message: "",
            });
            setTimeout(() => setIsSubmitted(false), 5000);
          } else {
            alert("Failed to send message. Please try again.");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Failed to send message. Please try again.");
        });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Have questions about our menu, want to book an event, or just want to say hello?
            We&apos;d love to hear from you!
          </p>
        </div>

        {isSubmitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <p>Thank you for your message! We will get back to you soon.</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.name ? "border-red-500" : "border-amber-300"
                  }`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-amber-900 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+977 0000000000"
                  className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.email ? "border-red-500" : "border-amber-300"
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-amber-900 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.subject ? "border-red-500" : "border-amber-300"
                  }`}
                />
                {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.message ? "border-red-500" : "border-amber-300"
                  }`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-amber-700 text-white py-3 px-6 rounded-lg hover:bg-amber-800 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6">Location</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">Address</h3>
                    <p className="text-amber-800">Thamel, Kathmandu, Nepal</p>
                    <p className="text-amber-800">Near Garden of Dreams</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 5.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">Phone</h3>
                    <p className="text-amber-800">+977-1-4444567</p>
                    <p className="text-amber-800">+977-9800000000</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">Email</h3>
                    <p className="text-amber-800">hello@chiyacoffee.com</p>
                    <p className="text-amber-800">orders@chiyacoffee.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-900">Hours</h3>
                    <p className="text-amber-800">Mon-Fri: 7:00 AM - 9:00 PM</p>
                    <p className="text-amber-800">Sat-Sun: 8:00 AM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-amber-900 mb-6">Follow Us</h2>
              <p className="text-amber-800 mb-6">
                Stay updated with our latest offerings, events, and online culture content.
              </p>
              <div className="flex space-x-4">
                {/* Add your social links here */}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-8 rounded-lg shadow-md mt-12">
          <h2 className="text-2xl font-semibold text-amber-900 mb-6">Find Us Here</h2>
          <div className="bg-amber-100 h-96 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.857353934944!2d85.3104544!3d27.708960349999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1968cee7500d%3A0x260f11a4a2e7c416!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1662453960242!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Chiya Coffee Location"
            ></iframe>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-amber-800">Thamel, Kathmandu</p>
            <a
              href="https://www.google.com/maps/place/Thamel,+Kathmandu+44600,+Nepal/@27.7089604,85.3104544,15z/data=!3m1!4b1!4m5!3m4!1s0x39eb1968cee7500d:0x260f11a4a2e7c416!8m2!3d27.7148187!4d85.3136274"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
