import React from 'react';
import { Home, Mail, Phone, Youtube, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1976D2] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About us</a></li>
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Legal</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Contact us</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="mb-4">
            We are a team of passionate people whose goal is to improve everyone's life through disruptive products.
            We build great products to solve your business problems.
          </p>
          <p>
            Our products are designed for small to medium size companies willing to optimize their performance.
          </p>
        </div>

        {/* Connect with us */}
        <div>
          <h3 className="text-xl font-bold mb-4">Connect with us</h3>
          <div className="space-y-2">
            <a href="#" className="flex items-center gap-2 hover:underline">
              <Mail className="w-5 h-5" />
              Info@extioninfotech.com
            </a>
            <a href="#" className="flex items-center gap-2 hover:underline">
              <Phone className="w-5 h-5" />
              +910116927047
            </a>
          </div>

          <div className="flex gap-4 mt-4">
            <a href="#" className="bg-white p-2 rounded-full">
              <Home className="w-5 h-5 text-[#1976D2]" />
            </a>
            <a href="#" className="bg-white p-2 rounded-full">
              <Linkedin className="w-5 h-5 text-[#1976D2]" />
            </a>
            <a href="#" className="bg-white p-2 rounded-full">
              <Youtube className="w-5 h-5 text-[#1976D2]" />
            </a>
            <a href="#" className="bg-white p-2 rounded-full">
              <Instagram className="w-5 h-5 text-[#1976D2]" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white/20">
        <p className="text-center">© 2024 Created by: Extion Team | All rights reserved.</p>
      </div>
    </footer>
  );
}