import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export const PromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [phone, setPhone] = useState("+91 ");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      setImageUrl(customEvent.detail.src);
      setIsOpen(true);
    };
    
    window.addEventListener("openPromoModal", handleOpen);
    return () => window.removeEventListener("openPromoModal", handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <style>{`
        @keyframes popupZoomOut {
          0% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .animate-zoom-out {
          animation: popupZoomOut 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-[16px] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300 z-10 mx-auto">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-sm backdrop-blur-md transition-transform duration-300 hover:rotate-90 text-black border border-gray-100"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Image & Gradient */}
        <div className="relative w-full md:w-1/2 h-[350px] md:h-auto overflow-hidden bg-muted">
          <img 
            src={imageUrl} 
            alt="Promo Product" 
            className="w-full h-full object-cover animate-zoom-out"
          />
          <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-10 pointer-events-none text-left">
            <h3 className="text-white text-3xl md:text-4xl font-heading mb-2 drop-shadow-lg leading-tight">Elevate Your Style</h3>
            <p className="text-white/80 text-sm md:text-base font-body tracking-wide drop-shadow-md">Premium fashion curated just for you</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center items-center text-center overflow-y-auto">
          <h2 className="text-sm font-body font-bold text-black mb-6 tracking-[0.3em] uppercase opacity-80">Gridox</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold text-black mb-3">Get 10% OFF</h3>
          <p className="text-muted-foreground mb-3 text-sm md:text-base px-2">Join now for exclusive fashion drops and early access</p>
          
          <div className="mb-8">
            <span className="inline-block bg-accent/10 text-accent font-semibold text-xs px-3 py-1.5 rounded-full">
              Limited time offer for new users
            </span>
          </div>
          
          <form className="w-full max-w-[300px] text-left" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
            <div className="flex flex-col gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 ml-1 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => {
                      if (!e.target.value.startsWith('+91')) {
                         setPhone('+91 ' + e.target.value.replace('+91', '').trim());
                      } else {
                         setPhone(e.target.value);
                      }
                    }}
                    className="w-full px-5 py-3.5 border border-gray-300 rounded-[12px] focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 text-base font-medium transition-all"
                    placeholder="+91 "
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white py-4 rounded-[12px] font-bold tracking-wider hover:bg-black/90 hover:scale-[1.05] hover:shadow-xl transition-all duration-300"
              >
                Claim My Discount
              </button>
            </div>
            
            <div className="mt-5 text-center">
              <p className="text-xs text-muted-foreground/80 font-medium tracking-wide">
                ⭐ Trusted by 10,000+ happy customers
              </p>
            </div>

            <p className="text-[11px] text-gray-400 mt-6 text-center select-none">No spam. Only style updates.</p>
          </form>
        </div>
      </div>
    </div>
  );
};
