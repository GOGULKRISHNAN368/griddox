import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

const reviews = [
  {
    id: 1,
    name: "Nisha",
    image: "/reviews/review1.png",
    text: "Judge.me Shop Reviews",
    rating: 5,
    tag: "Gridox!"
  },
  {
    id: 2,
    name: "Anjali",
    image: "/reviews/review2.png",
    text: "Awesome material. Very soft to wear. And it looks super bright...",
    rating: 5,
    tag: "Gridox!"
  },
  {
    id: 3,
    name: "Priyanka",
    image: "/reviews/review3.png",
    text: "Judge.me Shop Reviews",
    rating: 5,
    tag: "Gridox!"
  },
  {
    id: 4,
    name: "Deepthi Reddy",
    image: "/reviews/review4.png",
    text: "Perfect fit and very comfortable. Loved the color!",
    rating: 5,
    tag: "Gridox!"
  },
  {
    id: 5,
    name: "Vidhya",
    image: "/reviews/review5.png",
    text: "Judge.me Shop Reviews",
    rating: 5,
    tag: "Gridox!"
  },
  {
    id: 6,
    name: "Megha",
    image: "/reviews/review6.png",
    text: "Exceptional quality. The fabric feels premium.",
    rating: 5,
    tag: "Gridox!"
  },
  {
    id: 7,
    name: "Sneha",
    image: "/reviews/review7.png",
    text: "Judge.me Shop Reviews",
    rating: 5,
    tag: "Gridox!"
  },
  {
    id: 8,
    name: "Kavya",
    image: "/reviews/review8.png",
    text: "Beautiful design. Got so many compliments!",
    rating: 5,
    tag: "Gridox!"
  }
];

const CustomerReviews = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-gray-900 font-bold tracking-tight">
            Loved by 4 Lakh+ Women
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-black text-black" />
              ))}
              <span className="text-sm font-bold ml-2">4.89 <span className="text-gray-400 font-normal">★ (1,719)</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs uppercase tracking-widest">
              <CheckCircle2 size={16} fill="currentColor" className="text-white" />
              Verified
            </div>
          </div>
        </div>

        <div className="relative group">
          {/* Controls */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-xl border border-gray-100 flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider */}
          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-4 -mx-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className="flex-shrink-0 w-[260px] md:w-[280px] snap-start bg-[#f9f9f9] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group/card border border-gray-100"
              >
                <div className="aspect-[4/5] overflow-hidden bg-gray-200">
                  <img 
                    src={review.image} 
                    alt={review.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Reviewer</p>
                    <p className="text-sm font-bold text-gray-900 tracking-wider uppercase">{review.name}</p>
                  </div>
                  
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-emerald-600 text-emerald-600" />
                    ))}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium line-clamp-3 italic min-h-[40px]">
                    "{review.text}"
                  </p>

                  <div className="pt-2">
                    <p className="text-[10px] font-black tracking-[0.3em] text-[#8b231a]">{review.tag}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
