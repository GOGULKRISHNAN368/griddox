import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MapPin, Phone, Mail, Clock, Navigation, Star, Sparkles, Shirt } from "lucide-react";

// The generated hero image path: C:\Users\Gogul\.gemini\antigravity\brain\83377415-479c-49d7-8df8-82da9058aecf\store_locator_hero_1775658520224.png
// Since I need an absolute path or relative to public, I'll assume I can use the local path if I copy it to public.
// But for now, I'll use a placeholder or the actual path if I can find it in public.
// Usually, generated images are in artifacts.

const StoreLocator = () => {
  const address = "Sakthi Theatre Rd, Shrinagar, Pitchampalayam Pudur, Tiruppur, Chettipalayam, Tamil Nadu 641603";
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0 font-body">
      <Header />
      <AnnouncementBar />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="/store_locator_hero_1775658520224.png" // I'll assume the user will have this in public or I'll copy it
          alt="Gridox Store Interior"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-hero-zoom-out"
          onError={(e) => {
             // Fallback if image not found
             e.currentTarget.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000";
          }}
        />
        <div className="relative z-20 text-center space-y-4 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] uppercase tracking-[0.3em] font-bold rounded-full mb-4">
            <Star size={12} className="fill-white" />
            Flagship Destination
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-bold tracking-tight">
            Our <span className="italic">Store</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Where tradition meets modern elegance in the heart of Tiruppur.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-20 relative z-30 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              
              {/* Left Column: Info */}
              <div className="w-full lg:w-[45%] p-8 md:p-16 space-y-12 bg-[#fafafa]">
                <div className="space-y-6">
                  <h2 className="font-heading text-4xl font-bold text-gray-900 border-b border-gray-200 pb-6">
                    Connect <span className="text-accent underline decoration-accent/20 underline-offset-8">With Us</span>
                  </h2>
                  <p className="text-gray-500 text-lg">
                    Step into a world of curated fashion. Our team is ready to help you find your perfect fit.
                  </p>
                </div>

                <div className="space-y-10">
                  {/* Address */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent">
                      <MapPin size={24} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Main Address</p>
                      <p className="text-gray-800 font-semibold leading-relaxed text-lg italic">
                        {address}
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent">
                      <Clock size={24} />
                    </div>
                    <div className="space-y-2 w-full">
                      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Opening Hours</p>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center py-1 border-b border-gray-100">
                          <span className="text-gray-600 font-medium">Mon - Sat</span>
                          <span className="text-gray-900 font-bold italic">10 AM - 9 PM</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-gray-600 font-medium">Sunday</span>
                          <span className="text-accent font-bold italic">11 AM - 8 PM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
                        <Phone size={14} className="text-accent" />
                        Call Us
                      </div>
                      <p className="text-gray-900 font-bold">+91 98765 43210</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
                        <Mail size={14} className="text-accent" />
                        Email
                      </div>
                      <p className="text-gray-900 font-bold">hello@gridox.com</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-4 bg-gray-900 text-white w-full py-5 text-sm font-bold uppercase tracking-[0.25em] hover:bg-accent transition-all group rounded-xl shadow-xl hover:shadow-accent/20"
                  >
                    <Navigation size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Right Column: Map */}
              <div className="w-full lg:w-[55%] min-h-[400px] lg:min-h-[700px] relative bg-gray-100">
                <iframe
                  title="Store Location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(0.1) contrast(1.1)" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Experience Section */}
      <section className="bg-[#121212] py-24 md:py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-4">
              <h2 className="font-heading text-4xl md:text-6xl font-bold">The Gridox <span className="italic text-accent">Experience</span></h2>
              <div className="w-24 h-px bg-accent/50 mx-auto" />
              <p className="text-gray-400 text-lg max-w-xl mx-auto">
                Discover why our flagship store is more than just a place to shop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { 
                  title: "Personal Styling", 
                  desc: "Get 1-on-1 fashion advice from our experts.",
                  icon: Sparkles
                },
                { 
                  title: "VIP Fitting", 
                  desc: "Spacious, private rooms with perfect lightning.",
                  icon: Shirt
                },
                { 
                  title: "Click & Collect", 
                  desc: "Shop online and pick up at your convenience.",
                  icon: Navigation
                }
              ].map((item, i) => (
                <div key={i} className="group space-y-6 text-center">
                  <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center mx-auto transition-all group-hover:bg-accent group-hover:border-accent">
                    <item.icon size={32} className="text-accent group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default StoreLocator;
