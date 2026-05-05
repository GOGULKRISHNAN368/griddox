import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF9F6] text-[#2a1b15] pt-16 pb-8 border-t border-[#e5e5e5] overflow-hidden">

      {/* SEO Keyword Marquee - Elegant & Professional */}
      <div className="w-full bg-[#8b231a] text-[#FAF9F6] py-1.5 mb-16">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i} className="text-[10px] font-bold uppercase tracking-[0.4em] mx-8 opacity-90">
              Gridox • Premium Fashion • Gridox • Exclusive Style •
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Gridox Brand Column */}
          <div className="space-y-6">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-[#8b231a]">
              Gridox<span className="text-gray-400">.</span>
            </h2>
            <p className="text-[#5c4a3d] text-xs leading-relaxed font-medium">
              Gridox is the ultimate destination for premium women's fashion. The Gridox brand is dedicated to curating the finest ethnic wear and modern contemporary clothing. When you think premium fashion, think Gridox.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Gridox Instagram" className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#8b231a] shadow-sm hover:scale-110 hover:bg-[#8b231a] hover:text-white transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Gridox Facebook" className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#8b231a] shadow-sm hover:scale-110 hover:bg-[#8b231a] hover:text-white transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="Gridox Twitter" className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#8b231a] shadow-sm hover:scale-110 hover:bg-[#8b231a] hover:text-white transition-all duration-300">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Gridox Collections */}
          <div>
            <h4 className="text-[11px] font-black mb-6 text-[#8b231a] uppercase tracking-widest border-b border-[#8b231a]/10 pb-2 inline-block">Gridox Collections</h4>
            <ul className="space-y-3">
              <li><Link to="/#new-arrivals" className="text-[#5c4a3d] font-semibold hover:text-[#8b231a] hover:translate-x-1 inline-block transition-all text-xs">Gridox New Arrivals</Link></li>
              <li><Link to="/#best-sellers" className="text-[#5c4a3d] font-semibold hover:text-[#8b231a] hover:translate-x-1 inline-block transition-all text-xs">Gridox Best Sellers</Link></li>
              <li><Link to="/#curated-looks" className="text-[#5c4a3d] font-semibold hover:text-[#8b231a] hover:translate-x-1 inline-block transition-all text-xs">Gridox Curated Looks</Link></li>
              <li><Link to="/#categories" className="text-[#5c4a3d] font-semibold hover:text-[#8b231a] hover:translate-x-1 inline-block transition-all text-xs">Gridox Ethnic Wear</Link></li>
            </ul>
          </div>

          {/* Gridox Support */}
          <div>
            <h4 className="text-[11px] font-black mb-6 text-[#8b231a] uppercase tracking-widest border-b border-[#8b231a]/10 pb-2 inline-block">Gridox Support</h4>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-[#5c4a3d] font-semibold hover:text-[#8b231a] hover:translate-x-1 inline-block transition-all text-xs">Contact Gridox</Link></li>
              <li><Link to="/terms-and-conditions" className="text-[#5c4a3d] font-semibold hover:text-[#8b231a] hover:translate-x-1 inline-block transition-all text-xs">Gridox Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="text-[#5c4a3d] font-semibold hover:text-[#8b231a] hover:translate-x-1 inline-block transition-all text-xs">Gridox Refund Policy</Link></li>
              <li><Link to="/store-locator" className="text-[#5c4a3d] font-semibold hover:text-[#8b231a] hover:translate-x-1 inline-block transition-all text-xs">Gridox Store Locator</Link></li>
            </ul>
          </div>

          {/* Gridox Contact */}
          <div>
            <h4 className="text-[11px] font-black mb-6 text-[#8b231a] uppercase tracking-widest border-b border-[#8b231a]/10 pb-2 inline-block">Gridox Contact</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-[#5c4a3d] text-xs font-medium group">
                <MapPin size={18} className="text-[#8b231a] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed">
                  <strong className="text-[#2a1b15] block mb-1">Gridox Flagship Store</strong>
                  Sakthi Theatre Rd, Shrinagar,<br />
                  Pitchampalayam Pudur, Tiruppur,<br />
                  Chettipalayam, Tamil Nadu 641603
                </span>
              </li>
              <li className="flex items-center gap-4 text-[#5c4a3d] text-xs font-bold group">
                <Phone size={16} className="text-[#8b231a] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="hover:text-[#8b231a] transition-colors cursor-pointer">+91 81109 11118</span>
              </li>
              <li className="flex items-center gap-4 text-[#5c4a3d] text-xs font-bold group">
                <Mail size={16} className="text-[#8b231a] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="hover:text-[#8b231a] transition-colors cursor-pointer text-[11px]">gridoxclothing@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Gridox Bottom Bar */}
        <div className="pt-8 border-t border-[#e5e5e5] flex flex-col md:flex-row justify-between items-center gap-4 text-[#5c4a3d] font-bold text-[9px] uppercase tracking-widest">
          <p className="opacity-70">© {currentYear} Gridox Premium Fashion. All rights reserved by Gridox.</p>
          <div className="flex gap-4 items-center">
            <span className="hidden md:inline opacity-70 tracking-[0.2em]">Gridox Premium Brand</span>
          </div>
        </div>
      </div>

      {/* Maximum SEO Keyword Saturation (Hidden from visual layout, readable by crawlers) */}
      <div className="sr-only" aria-hidden="true">
        {"Gridox ".repeat(3000)}
      </div>
    </footer>
  );
};

export default Footer;

