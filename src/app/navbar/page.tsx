"use client";

import { useState } from "react";
import Link from "next/link";
import { Leaf, Coffee, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-neutral-50 to-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo (Left) */}
        <div className="flex items-center gap-2">
          <Leaf className="text-green-800 w-6 h-6" />
          <Coffee className="text-amber-800 w-6 h-6" />
          <span className="text-xl font-semibold text-amber-900">
            Chiya & Coffee
          </span>
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-8 text-brown-700 font-medium">
          <Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <Link href="/ourmenu" className="hover:text-yellow-500 transition-colors">Menu</Link>
          <Link href="/ourservices" className="hover:text-yellow-500 transition-colors">Services</Link>
          <Link href="/contact" className="hover:text-yellow-500 transition-colors">Contact</Link>
          <Link href="/story" className="hover:text-yellow-500 transition-colors">About</Link>
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/ordernow"
            className="bg-amber-900 text-white px-4 py-2 rounded-xl hover:bg-amber-800 transition"
          >
            Order Now
          </Link>
          <Link
            href="/adminlogin"
            className="border border-amber-900 text-amber-900 px-4 py-2 rounded-xl hover:bg-amber-900 hover:text-white transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brown-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : "☰"}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 py-4" : "max-h-0"
        } bg-white shadow-md`}
      >
        <div className="flex flex-col items-start gap-4 text-brown-700 font-medium px-6">
          <Link href="/" className="hover:text-yellow-500 transition-colors">Home</Link>
          <Link href="/ourmenu" className="hover:text-yellow-500 transition-colors">Menu</Link>
          <Link href="/ourservices" className="hover:text-yellow-500 transition-colors">Services</Link>
          <Link href="/contact" className="hover:text-yellow-500 transition-colors">Contact</Link>
          <Link href="/story" className="hover:text-yellow-500 transition-colors">About</Link>

          {/* Mobile Buttons stacked */}
          <Link
            href="/ordernow"
            className="bg-amber-900 text-white px-4 py-2 rounded-xl hover:bg-amber-800 transition w-full text-center"
          >
            Order Now
          </Link>
          <Link
            href="/adminlogin"
            className="border border-amber-900 text-amber-900 px-4 py-2 rounded-xl hover:bg-amber-900 hover:text-white transition w-full text-center"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
