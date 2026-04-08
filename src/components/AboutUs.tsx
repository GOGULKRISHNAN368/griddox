import { useState } from "react";
import { User, Layers, Scissors, Factory, ArrowRight, ChevronUp, MapPin, Phone, Clock, Mail } from "lucide-react";

const AboutUs = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="relative w-full py-20 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-12">

            {/* Header */}
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 border border-primary/20 text-primary text-[10px] uppercase tracking-widest font-medium mb-2">
                Our Story
              </div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                About Gridox
              </h2>
              <h3 className="font-heading text-xl md:text-2xl text-primary italic opacity-90">
                Made For You, Crafted With Care
              </h3>
              <p className="text-muted-foreground font-body text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Gridox pieces are more than just clothing—they're a celebration of modern elegance.
                With our own production unit, every piece is designed
                and tailored to fit your life beautifully.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 py-10 border-t border-b border-border">
              {[
                { icon: User,    text: "Tailored Fit",       desc: "Customized for comfort" },
                { icon: Layers,  text: "Quality Fabrics",    desc: "Premium handpicked materials" },
                { icon: Scissors,text: "Thoughtful Designs", desc: "Versatile and timeless" },
                { icon: Factory, text: "In-House Production",desc: "End-to-end quality control" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#E6C9B5] flex items-center justify-center text-primary transition-transform duration-300 hover:scale-110">
                    <item.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground uppercase tracking-widest">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-2 max-w-[150px] mx-auto">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Manifesto */}
            <div className="w-full space-y-8 flex flex-col items-center">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="group flex items-center gap-3 text-foreground font-semibold tracking-widest text-sm uppercase transition-all hover:text-primary"
              >
                {isExpanded ? "READ LESS" : "READ OUR MANIFESTO"}
                <div className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? "bg-muted" : "bg-primary text-primary-foreground group-hover:translate-x-1"}`}>
                  {isExpanded ? <ChevronUp size={18} /> : <ArrowRight size={18} />}
                </div>
              </button>

              <div className={`w-full overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? "max-h-[800px] opacity-100 pb-10" : "max-h-0 opacity-0"}`}>
                <div className="text-muted-foreground space-y-6 text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-left md:text-center px-4">
                  <p>
                    Gridox is inspired by modern women who balance multiple roles effortlessly. That's why our collections are designed to be versatile, timeless, and easy to wear, without compromising on elegance.
                  </p>
                  <p>
                    Unlike mass-produced fashion, we focus on limited, carefully crafted pieces—ensuring uniqueness in every outfit you own. Our designs are not just trend-based; they are built to last beyond seasons.
                  </p>
                  <p>
                    What truly sets us apart is our complete creative freedom, consistent quality, and the ability to innovate faster than conventional brands.
                  </p>
                  <div className="pt-6">
                    <p className="text-primary text-lg md:text-xl font-heading italic font-medium relative inline-block px-10">
                      <span className="absolute left-0 top-0 text-3xl opacity-20">"</span>
                      Gridox isn't just what you wear. It's how you feel wearing it.
                      <span className="absolute right-0 bottom-0 text-3xl opacity-20">"</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Details */}
            <div className="w-full border-t border-border pt-12">
              <div className="inline-block px-3 py-1 border border-primary/20 text-primary text-[10px] uppercase tracking-widest font-medium mb-6">
                Visit Us
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {[
                  {
                    name: "Gridox Studio — Main Store",
                    address: "123, Fashion Street, Anna Nagar, Chennai — 600 040",
                    phone: "+91 99999 99999",
                    hours: "Mon – Sat: 10:00 AM – 8:00 PM",
                    email: "store@gridox.in",
                  },
                  {
                    name: "Gridox Outlet — T. Nagar",
                    address: "45, Pondy Bazaar, T. Nagar, Chennai — 600 017",
                    phone: "+91 88888 88888",
                    hours: "Mon – Sun: 10:00 AM – 9:00 PM",
                    email: "tnagar@gridox.in",
                  },
                ].map((store) => (
                  <div key={store.name} className="bg-card rounded-sm p-6 space-y-3">
                    <h3 className="font-heading text-base font-bold text-foreground">{store.name}</h3>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone size={15} className="text-primary shrink-0" />
                      <span>{store.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={15} className="text-primary shrink-0" />
                      <span>{store.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail size={15} className="text-primary shrink-0" />
                      <span>{store.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
