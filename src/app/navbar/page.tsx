"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Leaf, Coffee, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // new loading state
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => pathname === href;

  const linkClasses = (href: string) =>
    `relative transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-600 after:transition-all after:duration-500
     ${isActive(href) ? "text-yellow-600 after:w-full" : "text-brown-700 hover:text-yellow-600 after:w-0 hover:after:w-full"}`;

  // Handle menu click with delay
  const handleNavigation = (href: string) => {
    setIsLoading(true); // show loading
    setIsMenuOpen(false); // close mobile menu

    setTimeout(() => {
      setIsLoading(false); // hide loading
      router.push(href); // navigate after 0.5 sec
    }, 500);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-neutral-50 to-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Leaf className="text-green-800 w-6 h-6" />
          <Coffee className="text-amber-800 w-6 h-6" />
          <span className="text-xl font-semibold text-amber-900">
            Chiya & Coffee
          </span>
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 font-medium">
          {["/", "/ourmenu", "/ourservices", "/contact", "/story"].map((href) => (
            <button
              key={href}
              onClick={() => handleNavigation(href)}
              className={linkClasses(href)}
            >
              {href === "/" ? "Home" :
               href === "/ourmenu" ? "Menu" :
               href === "/ourservices" ? "Services" :
               href === "/contact" ? "Contact" : "About"}
            </button>
          ))}
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavigation("/ordernow")}
            className="bg-amber-900 text-white px-4 py-2 rounded-xl hover:bg-amber-800 transition"
          >
            Order Now
          </button>
          <button
            onClick={() => handleNavigation("/adminlogin")}
            className="border border-amber-900 text-amber-900 px-4 py-2 rounded-xl hover:bg-amber-900 hover:text-white transition"
          >
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brown-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : "☰"}
        </button>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-yellow-500 text-white px-4 py-1 rounded shadow-md">
          Loading...
        </div>
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 py-4" : "max-h-0"
        } bg-white shadow-md`}
      >
        <div className="flex flex-col items-start gap-4 font-medium px-6">
          {["/", "/ourmenu", "/ourservices", "/contact", "/story"].map((href) => (
            <button
              key={href}
              onClick={() => handleNavigation(href)}
              className={linkClasses(href)}
            >
              {href === "/" ? "Home" :
               href === "/ourmenu" ? "Menu" :
               href === "/ourservices" ? "Services" :
               href === "/contact" ? "Contact" : "About"}
            </button>
          ))}

          <button
            onClick={() => handleNavigation("/ordernow")}
            className="bg-amber-900 text-white px-4 py-2 rounded-xl hover:bg-amber-800 transition w-full text-center"
          >
            Order Now
          </button>
          <button
            onClick={() => handleNavigation("/adminlogin")}
            className="border border-amber-900 text-amber-900 px-4 py-2 rounded-xl hover:bg-amber-900 hover:text-white transition w-full text-center"
          >
            Login
          </button>
        </div> 
        
      </div>
    </nav>
  );
}
