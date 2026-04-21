import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './CuratedLooks.css';

interface Look {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const CuratedLooks: React.FC = () => {
  const [looks, setLooks] = useState<Look[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLooks = async () => {
      try {
        const response = await fetch(`/api/products?isBestSeller=true&limit=8`);
        if (response.ok) {
          const data = await response.json();
          setLooks(data);
        }
      } catch (error) {
        console.error('Error fetching curated looks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLooks();
  }, []);

  if (loading) return (
    <div className="curated-looks-skeleton py-20 bg-gray-50 flex flex-col items-center gap-10">
      <div className="skeleton h-12 w-64"></div>
      <div className="flex gap-6 overflow-hidden w-full justify-center">
        <div className="skeleton aspect-[2/3] w-64 rounded-2xl opacity-50"></div>
        <div className="skeleton aspect-[2/3] w-80 rounded-2xl"></div>
        <div className="skeleton aspect-[2/3] w-64 rounded-2xl opacity-50"></div>
      </div>
    </div>
  );
  
  if (!loading && looks.length === 0) return null;

  return (
    <section className="curated-looks-section">
      <div className="container mx-auto px-4 text-center mb-10">
        <h2 className="curated-title">Curated Looks For You</h2>
        <div className="title-underline"></div>
      </div>

      <div className="curated-slider-container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.4} // Show 1.4 slides to see peeks on mobile
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 }
          }}
          initialSlide={2}
          loop={true}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: -30, // Balanced overlap
            depth: 400,   // Dramatic height scaling (Pyramid)
            modifier: 1, 
            slideShadows: false,
          }}
          navigation={{
            nextEl: '.curated-next',
            prevEl: '.curated-prev',
          }}
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          className="curated-swiper"
        >
          {looks.map((look) => (
            <SwiperSlide key={look._id} className="curated-slide">
              <div className="look-card" onClick={() => navigate(`/category/${look.category}/product/${look._id}`)}>
                <img src={look.image} alt={look.name} className="look-image" />
                <div className="look-overlay">
                    <div className="look-info">
                        <h3 className="look-name">{look.name}</h3>
                        <p className="look-price">Rs. {look.price.toLocaleString()}</p>
                    </div>
                </div>
                <button className="look-shop-btn" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/category/${look.category}/product/${look._id}`);
                }}>
                    <ShoppingBag size={14} />
                    <span>Shop All</span>
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <button className="curated-nav-btn curated-prev">
          <ChevronLeft size={28} />
        </button>
        <button className="curated-nav-btn curated-next">
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
};

export default CuratedLooks;
