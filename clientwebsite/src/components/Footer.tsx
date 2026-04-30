import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight">
              Gridox<span className="text-[#E6C9B5]">!</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium designer women's fashion. Specializing in high-end ethnic wear and modern contemporary styles tailored for the modern woman.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E6C9B5] hover:text-[#1a1a1a] transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E6C9B5] hover:text-[#1a1a1a] transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#E6C9B5] hover:text-[#1a1a1a] transition-all">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#E6C9B5]">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/#new-arrivals" className="text-gray-400 hover:text-white transition-colors text-sm">New Arrivals</Link></li>
              <li><Link to="/#about" className="text-gray-400 hover:text-white transition-colors text-sm">About Us</Link></li>
              <li><Link to="/store-locator" className="text-gray-400 hover:text-white transition-colors text-sm">Store Locator</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#E6C9B5]">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
              <li><Link to="/terms-and-conditions" className="text-gray-400 hover:text-white transition-colors text-sm">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="text-gray-400 hover:text-white transition-colors text-sm">Refund & Cancellation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-[#E6C9B5]">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-[#E6C9B5]" />
                <span>support@gridox.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-[#E6C9B5]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="text-gray-400 text-sm leading-relaxed mt-4">
                123, Avinashi Road, Coimbatore,<br />
                Tamil Nadu - 641018
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-xs">
          <p>© {currentYear} Gridox Fashion. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Designed with ❤️ in Coimbatore</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

