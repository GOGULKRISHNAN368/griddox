import { useState, useEffect, useCallback } from "react";
import OptimizedImage from "./OptimizedImage";

interface Banner {
  _id?: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  offer?: string;
  cta?: string;
  link?: string;
}

const HeroCarousel = () => {
  const [slides, setSlides] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch from unified backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:3001' : `http://${window.location.hostname}:3001`;
        const response = await fetch(`${apiBase}/api/banners`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setSlides(data);
          }
        }
      } catch (error) {
        console.log("No live banners found in database");
      }
    };
    fetchBanners();
  }, []);

  const next = useCallback(() => {
    if (slides.length === 0) return;
    setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, current]);

  const handleSwipeEnd = useCallback(() => {
    if (!touchStart || !touchEnd || slides.length === 0) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      setCurrent((c) => (c + 1) % slides.length); // Swipe left
    } else if (distance < -50) {
      setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)); // Swipe right
    }
    setTouchStart(0);
    setTouchEnd(0);
  }, [touchStart, touchEnd, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div 
      className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing bg-white"
      onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
      onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
      onTouchEnd={handleSwipeEnd}
      onMouseDown={(e) => {
        setTouchStart(e.clientX);
        setIsDragging(true);
      }}
      onMouseMove={(e) => {
        if (!isDragging) return;
        setTouchEnd(e.clientX);
      }}
      onMouseUp={() => {
        if (!isDragging) return;
        handleSwipeEnd();
        setIsDragging(false);
      }}
      onMouseLeave={() => {
        if (!isDragging) return;
        handleSwipeEnd();
        setIsDragging(false);
      }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div 
            key={i} 
            className="relative w-full flex-shrink-0 overflow-hidden flex items-center justify-center p-0"
          >
            <OptimizedImage
              src={slide.imageUrl}
              alt={slide.title || "Banner"}
              priority={i === 0}
              className={`w-full h-auto object-contain ${
                i === current ? "animate-hero-zoom-out" : "scale-100"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-8 bg-black" : "w-3 bg-black/20 hover:bg-black/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
