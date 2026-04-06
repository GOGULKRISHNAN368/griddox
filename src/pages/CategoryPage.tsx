import { useParams, Link } from "react-router-dom";
import { Heart, ChevronLeft } from "lucide-react";
import categories from "@/data/categoryProducts";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import OfferBanner from "@/components/OfferBanner";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <OfferBanner />
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            <ChevronLeft size={14} />
            HOME
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{category.title}</span>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide">{category.title}</h1>
        <p className="text-muted-foreground mt-1">{category.products.length} Products</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {category.products.map((product) => (
            <Link to={`/category/${category.slug}/product/${product.id}`} key={product.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-sm bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  loading="lazy"
                  className="w-full aspect-[3/4] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-0 left-0 bg-[#2c3e50] text-white text-[10px] md:text-xs font-semibold px-2 py-1 tracking-wider">
                    {product.badge}
                  </div>
                )}

                {/* Wishlist */}
                <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors">
                  <Heart size={18} className="text-gray-500 hover:text-red-500 transition-colors" />
                </button>

                {/* Same Day Dispatch Tag */}
                {product.tag && (
                  <div className="absolute bottom-0 right-0 bg-[#2c3e50]/90 text-white text-[9px] md:text-[11px] font-bold px-2 py-1 leading-tight text-right">
                    SAME DAY<br />DISPATCH
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="mt-3 space-y-1">
                <h3 className="text-sm md:text-base font-medium leading-snug line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm md:text-base font-bold">₹{product.price.toLocaleString()}</span>
                  <span className="text-xs md:text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-xs md:text-sm font-semibold text-orange-600">
                    ({product.discount}% OFF)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default CategoryPage;
