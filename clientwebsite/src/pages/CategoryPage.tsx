import { useParams, Link } from "react-router-dom";
import { Heart, ChevronLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import categories from "@/data/categoryProducts";
import Header from "@/components/Header";

import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] pb-16 md:pb-0 font-body">
      <Helmet>
        <title>{`${category.title} | Women's Fashion | Gridox`}</title>
        <meta name="description" content={`Discover the latest ${category.title} collection at Gridox. Shop high-quality, designer women's clothing starting from premium fabrics.`} />
        <meta property="og:title" content={`${category.title} | Gridox`} />
        <meta property="og:description" content={`Explore our curated ${category.title} collection. Tailored fits and premium designs.`} />
      </Helmet>

      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-[10px] tracking-widest font-bold text-gray-400">
          <Link to="/" className="hover:text-black transition-colors flex items-center gap-1">
            <ChevronLeft size={12} />
            HOME
          </Link>
          <span>/</span>
          <span className="text-[#8b231a]">{category.title}</span>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-normal tracking-tight text-[#1a1a1a] italic">{category.title}</h1>
        <p className="text-gray-500 text-xs tracking-wider uppercase mt-2 font-medium">{category.products.length} Designs Found</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {category.products.map((product) => (
            <Link to={`/category/${category.slug}/product/${product.id}`} key={product.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-black/5">
                <img
                  src={product.images[0]}
                  alt={`${product.name} - Best Designer Wear in Coimbatore & Tirupur`}
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-0 left-0 bg-[#1a1a1a] text-white text-[9px] font-bold px-3 py-1.5 tracking-widest uppercase">
                    {product.badge}
                  </div>
                )}

                {/* Wishlist */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-all transform hover:scale-110">
                  <Heart size={16} className="text-gray-400 hover:text-red-500 transition-colors" />
                </button>

                {/* Same Day Dispatch Tag */}
                {product.tag && (
                  <div className="absolute bottom-3 left-3 bg-[#8b231a] text-white text-[8px] font-black px-2 py-1 leading-tight tracking-[0.1em]">
                    SAME DAY DISPATCH
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="mt-5 space-y-2 text-center md:text-left">
                <h3 className="text-sm font-medium text-[#1a1a1a] leading-relaxed line-clamp-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <span className="text-base font-bold text-[#1a1a1a]">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-[#8b231a] tracking-wider">
                    ({product.discount}% OFF)
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default CategoryPage;
