import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MapPin, Phone, Mail, Clock, Navigation, Star, Sparkles, Shirt } from "lucide-react";

// Colors: Mahogany (#8b231a), Ivory (#fcfaf7), Charcoal (#1a1a1a)

const StoreLocator = () => {
  const address = "Sakthi Theatre Rd, Shrinagar, Pitchampalayam Pudur, Tiruppur, Chettipalayam, Tamil Nadu 641603";
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0 font-body">
      <Header />

      {/* Hero Section - Sleeker and more minimalist */}
      <section className="relative h-[35vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 to-[#1a1a1a] z-10" />
        <img 
          src="/store_locator_hero_1775658520224.png"
          alt="Gridox Store Interior"
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[0.3]"
          onError={(e) => {
             e.currentTarget.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000";
          }}
        />
        <div className="relative z-20 text-center space-y-6 px-4">
          <div className="inline-block px-4 py-1.5 border border-white/20 text-white text-[9px] uppercase tracking-[0.4em] font-semibold backdrop-blur-sm mb-2">
            Flagship Destination
          </div>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl text-white font-light tracking-tight">
            Our <span className="italic font-normal text-[#e5d5c5]">Flagship</span> Store
          </h1>
          <div className="w-16 h-px bg-[#8b231a] mx-auto" />
        </div>
      </section>

      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Content: The "Neat" details */}
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="font-heading text-3xl md:text-4xl text-[#1a1a1a] leading-tight">
                    Our Flagship Boutique in <span className="text-[#8b231a] italic">Tiruppur</span>
                  </h2>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-md">
                    Experience our latest collections and personalized styling in our signature boutique setting.
                  </p>
                </div>

                {/* Info List */}
                <div className="space-y-10">
                  {/* Address */}
                  <div className="group flex gap-6">
                    <div className="flex-shrink-0 w-10 h-10 border border-[#8b231a]/10 flex items-center justify-center text-[#8b231a] group-hover:bg-[#8b231a] group-hover:text-white transition-all duration-300">
                      <MapPin size={18} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Address</p>
                      <p className="text-[#1a1a1a] font-medium leading-relaxed italic">
                        {address}
                      </p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="group flex gap-6">
                      <div className="flex-shrink-0 w-10 h-10 border border-[#8b231a]/10 flex items-center justify-center text-[#8b231a] group-hover:bg-[#8b231a] group-hover:text-white transition-all duration-300">
                        <Phone size={18} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Call</p>
                        <p className="text-[#1a1a1a] font-semibold">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="group flex gap-6">
                      <div className="flex-shrink-0 w-10 h-10 border border-[#8b231a]/10 flex items-center justify-center text-[#8b231a] group-hover:bg-[#8b231a] group-hover:text-white transition-all duration-300">
                        <Mail size={18} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Email</p>
                        <p className="text-[#1a1a1a] font-semibold">hello@gridox.com</p>
                      </div>
                    </div>
                  </div>

                  {/* Hours - Neat Table */}
                  <div className="p-8 bg-white border border-[#8b231a]/5 shadow-sm space-y-6">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-[#8b231a]" />
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]">Boutique Hours</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                        <span className="text-gray-500">Mon - Sat</span>
                        <span className="text-[#1a1a1a] font-medium uppercase tracking-tight">10:00 - 21:00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Sunday</span>
                        <span className="text-[#8b231a] font-bold uppercase tracking-tight">11:00 - 20:00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-[#8b231a] text-white px-10 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-[#1a1a1a] transition-all group"
                  >
                    Get Directions
                    <Navigation size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Map - Cinematic look */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/5] md:aspect-square lg:aspect-auto lg:h-[750px] shadow-[0_40px_80px_-20px_rgba(139,35,26,0.15)] overflow-hidden">
                <iframe
                  title="Store Location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "sepia(0.2) contrast(1.1) brightness(1.05)" }}
                  loading="lazy"
                  className="absolute inset-0 grayscale-[0.2]"
                />
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[#8b231a]/10" />
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Features - Clean Minimalist */}
      <section className="bg-white py-24 border-t border-[#8b231a]/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
            {[
              { title: "Personal Styling", icon: Sparkles, desc: "Bespoke advice" },
              { title: "Private Fitting", icon: Shirt, desc: "Spacious rooms" },
              { title: "In-Store Pickup", icon: Star, desc: "Fast & easy" },
              { title: "Tailoring", icon: Navigation, desc: "Perfect fit" }
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4 group">
                <div className="w-16 h-16 border border-[#8b231a]/10 rounded-full flex items-center justify-center mx-auto transition-colors group-hover:bg-[#8b231a]/5">
                  <item.icon size={22} className="text-[#8b231a]" strokeWidth={1} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]">{item.title}</h3>
                  <p className="text-[10px] text-gray-400 font-medium italic">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default StoreLocator;
