import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OptimizedImage from "./OptimizedImage";
import { Heart, ShoppingBag } from "lucide-react";
import { HOME_PRODUCT_LINKS } from "@/fixes/homeProductLinks"; // fix: home product links
const NewIn = () => {
  const navigate = useNavigate(); // fix: home product links
  const [activeProducts, setActiveProducts] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch from unified backend
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:3001' : `http://${window.location.hostname}:3001`;
        const response = await fetch(`${apiBase}/api/products?category=new-arrivals`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setActiveProducts(data);
          }
        }
      } catch (error) {
        console.log("Using static products for New Arrivals");
      }
    };
    fetchNewArrivals();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardElement = scrollRef.current.children[0] as HTMLElement;
      if (!cardElement) return;
      const cardWidth = cardElement.clientWidth;
      const index = Math.round(scrollPosition / cardWidth);
      if (index >= 0 && index < activeProducts.length) {
        setActiveIndex(index);
      }
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const cardElement = scrollRef.current.children[0] as HTMLElement;
      if (!cardElement) return;
      const cardWidth = cardElement.clientWidth;
      const gap = 12; // Corresponding to gap-3 (12px)
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth"
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-10 md:py-16 w-full max-w-7xl mx-auto">
      <div className="text-center px-4 mb-8">
        <h2 className="font-heading text-3xl md:text-4xl font-normal mb-3 text-foreground">New Arrivals</h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto">
          Discover the latest trends and fresh picks in our new collection.
        </p>
      </div>

      <div className="relative">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 pb-4 md:grid md:grid-cols-4 md:gap-6 md:px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {activeProducts.map((product: any) => (
            <div 
              key={product._id || product.id} 
              className="w-[45vw] sm:w-[35vw] md:w-full snap-start shrink-0 flex flex-col group cursor-pointer"
              onClick={() => { 
                const linkId = product.id;
                const l = linkId ? HOME_PRODUCT_LINKS[linkId] : null; 
                if (l) {
                  navigate(`/category/${l.categorySlug}/product/${l.productId}`); 
                } else {
                  // Fallback for dynamic products
                  navigate(`/category/new-arrivals`);
                }
              }} // fix: home product links
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white">
                <OptimizedImage 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  isProductImage
                />
                
                {/* Top Left Tags */}
                <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1.5">
                  {product.discount && (
                    <span className="bg-primary text-primary-foreground text-[11px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
                      -{product.discount}
                    </span>
                  )}
                  {(product.isNew || product.category === 'new-arrivals') && (
                    <span className="bg-[#D8B7A6] text-foreground text-[11px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
                      New
                    </span>
                  )}
                </div>

                {/* Bottom Right Actions */}
                <div className="absolute bottom-2.5 right-2.5 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-300">
                  <button className="bg-[#F5EDE7]/95 backdrop-blur-sm p-2 rounded-full shadow hover:bg-[#F5EDE7] hover:scale-105 transition-all flex items-center justify-center">
                    <Heart className="w-[18px] h-[18px] text-[#4A2E2A]" />
                  </button>
                  <button className="bg-[#F5EDE7]/95 backdrop-blur-sm p-2 rounded-full shadow hover:bg-[#F5EDE7] hover:scale-105 transition-all flex items-center justify-center">
                    <ShoppingBag className="w-[18px] h-[18px] text-[#4A2E2A]" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 text-center">
                <h3 className="text-sm text-foreground font-medium">{product.name}</h3>
                <div className="mt-1.5 flex items-center justify-center gap-2">
                  <span className="text-primary font-medium text-[15px]">Rs. {product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through text-[13px]">Rs. {product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots (Mobile Only) */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          {activeProducts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                activeIndex === idx ? "bg-primary" : "bg-[#D8B7A6]"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewIn;
