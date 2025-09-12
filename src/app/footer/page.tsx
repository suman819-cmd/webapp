import { Leaf, Coffee, Heart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3B200F] text-yellow-100 py-12 px-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <Leaf className="text-green-400" size={22} />
            <Coffee className="text-yellow-300" size={22} />
            <span>Chiya & Coffee</span>
          </div>
          <p className="mt-3 text-sm text-yellow-200">
            Where traditional Nepali chiya culture meets modern coffee artistry.
          </p>
          <p className="mt-3 flex items-center gap-2 text-sm text-yellow-300">
            <Heart className="text-yellow-400" size={16} />
            Brewing happiness since 2024
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Offerings */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Our Offerings</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Chiya Varieties</a></li>
            <li><a href="#">Coffee Selection</a></li>
            <li><a href="#">Snacks & Bakery</a></li>
            <li><a href="#">Catering Services</a></li>
            <li><a href="#">Subscription Packs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Stay Connected</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16} /> Thamel, Kathmandu, Nepal</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +977-1-4444567</li>
            <li className="flex items-center gap-2"><Mail size={16} /> hello@chiyacoffee.com</li>
          </ul>

          <div className="mt-4">
            <h4 className="text-sm font-semibold">Newsletter</h4>
            <div className="flex mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-sm bg-[#4a2a15] border border-yellow-400 rounded-l-md focus:outline-none"
              />
              <button className="bg-yellow-400 text-[#3B200F] px-4 rounded-r-md">
                <Mail size={18} />
              </button>
            </div>
            <p className="text-xs text-yellow-200 mt-1">
              Get updates on new blends and special offers
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-yellow-900 my-8"></div>

      {/* Operating Hours */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h4 className="font-semibold">Operating Hours</h4>
          <p className="mt-1"><span className="font-bold">Mon - Fri:</span> 7:00 AM - 9:00 PM</p>
        </div>
        <div>
          <p className="mt-6 md:mt-0"><span className="font-bold">Sat - Sun:</span> 8:00 AM - 10:00 PM</p>
        </div>
        <div>
          <p className="mt-6 md:mt-0"><span className="font-bold">Public Holidays:</span> 9:00 AM - 8:00 PM</p>
        </div>
      </div>

      <div className="border-t border-yellow-900 mt-8 pt-6 flex flex-col md:flex-row justify-between text-xs text-yellow-300">
        <p>© 2024 Chiya & Coffee. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
