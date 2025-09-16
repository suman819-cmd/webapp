"use client"; 
import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const textsToType = useRef([
    "Where Chiya Meets Coffee",
    "Experience the cozy taste of tradition",
    "Sip, Relax, Enjoy"
  ]);

  useEffect(() => {
    const handleTyping = () => {
      const current = loopNum % textsToType.current.length;
      const fullText = textsToType.current[current];

      setText(prev => 
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2047&q=80')" 
        }}
      >
        <div className="absolute inset-0 bg-amber-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-amber-50 px-4 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
          {text}
          <span className="border-r-2 border-amber-50 animate-pulse ml-1"></span>
        </h1>

        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience the perfect blend of traditional Nepali chiya culture and modern coffee artistry in our cozy café. Every cup tells a story.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href='/ordernow' className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 inline-block text-center">
            Order Now
          </a>
          <a href='/visitus' className="bg-transparent border-2 border-amber-300 hover:bg-amber-300/10 text-amber-100 font-semibold py-3 px-8 rounded-full transition duration-300">
            Visit Us
          </a>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="h-16 w-1 bg-gradient-to-b from-yellow-400 via-amber-500 to-yellow-400 rounded-full animate-bounce"></div>
        </div>
      </div>

      {/* Floating tea cup */}
      <div className="absolute top-10 right-10 opacity-90 animate-float z-20">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15H19C19.5523 15 20 15.4477 20 16V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V16C4 15.4477 4.44772 15 5 15Z" fill="url(#teacup-gradient)" stroke="#F59E0B" strokeWidth="1.5"/>
          <path d="M17 15V8C17 6.34315 15.6569 5 14 5H10C8.34315 5 7 6.34315 7 8V15" stroke="#F59E0B" strokeWidth="1.5"/>
          <path d="M7 8H5C3.89543 8 3 7.10457 3 6V5C3 3.89543 3.89543 3 5 3H7" stroke="#F59E0B" strokeWidth="1.5"/>
          <path d="M17 8H19C20.1046 8 21 7.10457 21 6V5C21 3.89543 20.1046 3 19 3H17" stroke="#F59E0B" strokeWidth="1.5"/>
          <path d="M8 10H16" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"/>
          <defs>
            <linearGradient id="teacup-gradient" x1="5" y1="15" x2="19" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B"/>
              <stop offset="1" stopColor="#B45309"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
