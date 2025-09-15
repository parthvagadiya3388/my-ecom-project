import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#9A3F3F] text-[#fef2f2] py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">ElectroMart</h2>
          <p className="text-sm text-[#E6CFA9]">
            Your one-stop shop for electronics, gadgets, and accessories.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="text-[#E6CFA9] hover:text-white no-underline transition-colors">Home</a></li>
            <li><a href="/shop" className="text-[#E6CFA9] hover:text-white no-underline transition-colors">Shop</a></li>
            <li><a href="/about" className="text-[#E6CFA9] hover:text-white no-underline transition-colors">About</a></li>
            <li><a href="/contact" className="text-[#E6CFA9] hover:text-white no-underline transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="/faq" className="text-[#E6CFA9] hover:text-white no-underline transition-colors">FAQs</a></li>
            <li><a href="/shipping" className="text-[#E6CFA9] hover:text-white no-underline transition-colors">Shipping</a></li>
            <li><a href="/returns" className="text-[#E6CFA9] hover:text-white no-underline transition-colors">Returns</a></li>
            <li><a href="/support" className="text-[#E6CFA9] hover:text-white no-underline transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-[#E6CFA9] hover:text-white text-xl transition-colors"><FaFacebook /></a>
            <a href="#" className="text-[#E6CFA9] hover:text-white text-xl transition-colors"><FaInstagram /></a>
            <a href="#" className="text-[#E6CFA9] hover:text-white text-xl transition-colors"><FaTwitter /></a>
          </div>
        </div>

      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-[#C1856D] pt-4 text-center text-sm text-[#E6CFA9]">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
