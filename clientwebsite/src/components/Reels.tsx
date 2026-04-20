import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, X, Volume2, VolumeX, Heart, Share2, Play, ChevronUp, ChevronDown } from "lucide-react";
import { reelsData, Reel } from "@/data/reelsData";
import "./Reels.css";

const Reels: React.FC = () => {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [currentFocusIndex, setCurrentFocusIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleAddToCart = (productId: string) => {
    // For these specific products, they belong to peplum-co-ords category
    navigate(`/category/peplum-co-ords/product/${productId}`);
    closeReel();
  };

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const cardElement = sliderRef.current.children[0] as HTMLElement;
      if (!cardElement) return;
      const cardWidth = cardElement.clientWidth;
      const gap = 24; // Corresponding to gap-6 (24px)
      const index = Math.round(scrollPosition / (cardWidth + gap));
      if (index >= 0 && index < reelsData.length) {
        setCurrentFocusIndex(index);
      }
    }
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = direction === "right" ? 300 : -300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const openReel = (index: number) => {
    setActiveReelIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeReel = () => {
    setActiveReelIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextReel = () => {
    if (activeReelIndex !== null && activeReelIndex < reelsData.length - 1) {
      setActiveReelIndex(activeReelIndex + 1);
    }
  };

  const prevReel = () => {
    if (activeReelIndex !== null && activeReelIndex > 0) {
      setActiveReelIndex(activeReelIndex - 1);
    }
  };

  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartPos.current === null) return;
    
    const touchEndPos = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
    
    const diffX = touchStartPos.current.x - touchEndPos.x;
    const diffY = touchStartPos.current.y - touchEndPos.y;

    // Detect if it's a primary horizontal or vertical swipe
    if (Math.abs(diffY) > Math.abs(diffX)) {
      // Vertical swipe (Up/Down)
      if (Math.abs(diffY) > 50) {
        if (diffY > 0) nextReel(); // Swipe up -> Next
        else prevReel(); // Swipe down -> Prev
      }
    } else {
      // Horizontal swipe (Left/Right)
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) nextReel(); // Swipe left -> Next
        else prevReel(); // Swipe right -> Prev
      }
    }
    
    touchStartPos.current = null;
  };

  const wheelThrottleRef = useRef(false);

  // Add mouse wheel support for vertical scrolling through reels
  useEffect(() => {
    if (activeReelIndex === null) return;

    const handleWheel = (e: WheelEvent) => {
      if (wheelThrottleRef.current) return;

      if (Math.abs(e.deltaY) > 40) {
        wheelThrottleRef.current = true;
        if (e.deltaY > 0) nextReel();
        else prevReel();
        
        setTimeout(() => {
          wheelThrottleRef.current = false;
        }, 1000); // 1s throttle for UX
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeReelIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReelIndex === null) return;
      if (e.key === "Escape") closeReel();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nextReel();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevReel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeReelIndex]);

  return (
    <section className="reels-container">
      <h2 className="reels-title">Feel the Reel</h2>
      
      <div className="reels-slider-wrapper">
        <div 
          className="reels-slider" 
          ref={sliderRef}
          onScroll={handleScroll}
        >
          {reelsData.map((reel, index) => (
            <div 
              key={reel.id} 
              className="reel-card group"
              onClick={() => openReel(index)}
            >
              <video 
                className="reel-video-preview object-cover w-full h-full"
                muted
                loop
                playsInline
                autoPlay
                preload="none"
              >
                <source src={reel.videoUrl} type="video/mp4" />
              </video>
              
              <div className="reel-play-icon">
                <Play fill="white" size={48} />
              </div>
              
              <div className={`reel-overlay flex flex-col justify-end items-center reel-focuser ${currentFocusIndex === index ? 'active-focus' : ''}`}>
                <button 
                  className="shop-now-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(reel.product.id);
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="reels-nav-button" 
          onClick={() => scrollSlider("right")}
          aria-label="Next reels"
        >
          <ChevronRight size={24} color="#1a1a1a" />
        </button>
      </div>

      {/* Modal View */}
      {activeReelIndex !== null && (
        <div className="reel-modal-overlay" onClick={closeReel}>
          <div 
            className="reel-modal-container" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <video 
              key={reelsData[activeReelIndex].videoUrl}
              className="reel-modal-video"
              autoPlay
              loop
              muted={isMuted}
              playsInline
            >
              <source src={reelsData[activeReelIndex].videoUrl} type="video/mp4" />
            </video>

            {/* Top Left Close Button */}
            <button className="fixed top-8 left-8 text-white z-[2001] hover:scale-110 transition-transform" onClick={closeReel}>
              <X size={32} strokeWidth={2.5} />
            </button>

            {/* Right Side Vertical Navigation Arrows */}
            <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-[2001]">
              <button 
                className={`p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all ${activeReelIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                onClick={prevReel}
                disabled={activeReelIndex === 0}
              >
                <ChevronUp size={28} />
              </button>
              <button 
                className={`p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all ${activeReelIndex === reelsData.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}`}
                onClick={nextReel}
                disabled={activeReelIndex === reelsData.length - 1}
              >
                <ChevronDown size={28} />
              </button>
            </div>

            <div className="reel-modal-header flex justify-between items-start p-6 absolute top-0 left-0 right-0 z-[2000] pointer-events-none">
              <div className="pointer-events-auto">
                <h3 className="text-white font-medium text-sm tracking-wide drop-shadow-md">
                  {reelsData[activeReelIndex].product.name}
                </h3>
              </div>
              <div className="flex items-center gap-4 pointer-events-auto pr-2">
                <button 
                  className="text-white hover:scale-110 transition-transform" 
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
                <button className="text-white hover:scale-110 transition-transform">
                  <Share2 size={22} />
                </button>
              </div>
            </div>

            <div className="reel-modal-product-overlay flex justify-center">
              <button 
                className="reel-shop-now-modal"
                onClick={() => handleAddToCart(reelsData[activeReelIndex].product.id)}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reels;
