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
  // Static fallback banner to show instantly while Render wakes up
  const [slides, setSlides] = useState<Banner[]>([
    {
      imageUrl: "https://res.cloudinary.com/dts769o9h/image/upload/v1721564400/static_banner_placeholder.jpg",
      title: "Premium Fashion Collection",
      subtitle: "Discover Your Style",
      cta: "Explore Now"
    }
  ]);
  const [current, setCurrent] = useState(0);

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch from unified backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(`/api/banners`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setSlides(data);

            // 🔥 Dynamic Preload (Best Practice #6)
            // Preload the very first banner image as soon as we know the URL
            const preloadLink = document.createElement("link");
            preloadLink.rel = "preload";
            preloadLink.as = "image";
            // Match the Cloudinary optimization used in OptimizedImage
            const firstImg = data[0].imageUrl;
            if (firstImg.includes('cloudinary.com')) {
              preloadLink.href = firstImg.replace('/upload/', '/upload/f_auto,q_80,w_1920/');
            } else {
              preloadLink.href = firstImg;
            }
            document.head.appendChild(preloadLink);
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

  // Always render the container even if fetching (to avoid layout shift)
  return (
    <div
      className="relative w-full aspect-[16/9] md:aspect-[21/9] min-h-[300px] md:min-h-[500px] overflow-hidden select-none cursor-grab active:cursor-grabbing bg-[#FDFBF9]"
      style={{ isolation: 'isolate' }}
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
        {slides.map((slide, i) => {
          // Logic: Only load the image if it's the current slide, or the one right before/after it
          const isActive = i === current;
          const isNext = i === (current + 1) % slides.length;
          const isPrev = i === (current - 1 + slides.length) % slides.length;
          const shouldLoad = isActive || isNext || isPrev;

          return (
            <div
              key={i}
              className="relative w-full flex-shrink-0 overflow-hidden flex items-center justify-center p-0"
            >
              <OptimizedImage
                src={shouldLoad ? slide.imageUrl : ""}
                alt={slide.title || "Banner"}
                priority={i === 0}
                className="w-full h-auto object-contain"
              />
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-black" : "w-3 bg-black/20 hover:bg-black/40"
              }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Decorative Brand Text for Mobile Empty Space */}
      <div className="md:hidden absolute bottom-12 left-1/2 -translate-x-1/2 z-0 pointer-events-none text-center w-full">
        <span 
          style={{ 
            fontFamily: "'Great Vibes', cursive",
            textShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(0,0,0,0.05)'
          }}
          className="text-5xl text-black/40"
        >
          Gridox
        </span>
      </div>
    </div>
  );
};

export default HeroCarousel;
