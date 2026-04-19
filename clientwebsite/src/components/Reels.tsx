import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, X, Volume2, VolumeX, Heart, Share2, Play } from "lucide-react";
import { reelsData, Reel } from "@/data/reelsData";
import "./Reels.css";

const Reels: React.FC = () => {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleAddToCart = (productId: string) => {
    // For these specific products, they belong to peplum-co-ords category
    navigate(`/category/peplum-co-ords/product/${productId}`);
    closeReel();
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

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextReel();
      else prevReel();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeReelIndex === null) return;
      if (e.key === "Escape") closeReel();
      if (e.key === "ArrowRight") nextReel();
      if (e.key === "ArrowLeft") prevReel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeReelIndex]);

  return (
    <section className="reels-container">
      <h2 className="reels-title">Feel the Reel</h2>
      
      <div className="reels-slider-wrapper">
        <div className="reels-slider" ref={sliderRef}>
          {reelsData.map((reel, index) => (
            <div 
              key={reel.id} 
              className="reel-card"
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
              
              <div className="reel-overlay">
                <div className="reel-thumb-container">
                  <img src={reel.product.thumbnail} alt="" className="reel-product-thumb" />
                </div>
                <div className="reel-product-info">
                  <p className="reel-product-name">{reel.product.name}</p>
                </div>
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

            <button className="reel-modal-close" onClick={closeReel}>
              <X size={28} strokeWidth={3} />
            </button>

            <div className="reel-modal-controls">
              <button 
                className="reel-modal-mute" 
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            {activeReelIndex > 0 && (
              <button className="reel-modal-arrow reel-modal-arrow-left" onClick={prevReel}>
                <ChevronLeft size={32} />
              </button>
            )}

            {activeReelIndex < reelsData.length - 1 && (
              <button className="reel-modal-arrow reel-modal-arrow-right" onClick={nextReel}>
                <ChevronRight size={32} />
              </button>
            )}

            <div className="reel-modal-side-actions">
              <button className="reel-action-btn">
                <div className="icon-circle">
                  <Heart size={22} fill={true ? "#ff0000" : "none"} color={true ? "#ff0000" : "#fff"} />
                </div>
                <span>1</span>
              </button>
              <button className="reel-action-btn">
                <div className="icon-circle">
                  <Share2 size={22} />
                </div>
                <span>Share</span>
              </button>
            </div>

            <div className="reel-modal-product-overlay">
              <div className="reel-modal-product-body">
                <img 
                  src={reelsData[activeReelIndex].product.thumbnail} 
                  alt={reelsData[activeReelIndex].product.name} 
                  className="reel-modal-thumb" 
                />
                <div className="reel-modal-info">
                  <div className="reel-modal-title-row">
                    <p className="reel-modal-name">{reelsData[activeReelIndex].product.name}</p>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </div>
                  <div className="reel-modal-pricing">
                    <span className="reel-current-price">₹{reelsData[activeReelIndex].product.price}</span>
                    <span className="reel-old-price">₹{reelsData[activeReelIndex].product.originalPrice}</span>
                  </div>
                </div>
              </div>
              <button 
                className="reel-add-to-cart"
                onClick={() => handleAddToCart(reelsData[activeReelIndex].product.id)}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reels;
