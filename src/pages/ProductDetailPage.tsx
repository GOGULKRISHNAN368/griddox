import { useParams, Link } from "react-router-dom";
import { Heart, ChevronLeft, Truck, RotateCcw, Shield, Banknote } from "lucide-react";
import { useState } from "react";
import categories from "@/data/categoryProducts";
import ProductGallery from "@/components/ProductGallery";
import Header from "@/components/Header";

import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SimilarProducts from "@/components/SimilarProducts";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { slug, productId } = useParams<{ slug: string; productId: string }>();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [pincode, setPincode] = useState("");

  const category = categories.find((c) => c.slug === slug);
  const product = category?.products.find((p) => p.id === productId);

  if (!category || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  const handleAddToBag = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    toast.success("Added to bag!", {
      description: `${product.name} - Size ${selectedSize === 0 ? "Free Size" : selectedSize}`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    toast.info("Redirecting to checkout...");
  };

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] pb-16 md:pb-0 font-body">

      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          <Link to="/" className="hover:text-black transition-colors">HOME</Link>
          <span>/</span>
          <Link to={`/category/${category.slug}`} className="hover:text-black transition-colors">
            {category.title}
          </Link>
          <span>/</span>
          <span className="text-[#8b231a]">{product.name}</span>
        </div>
      </div>

      {/* Product Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-14 items-start">
          {/* Left: Image Gallery */}
          <div className="w-full">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <h1 className="font-heading text-2xl md:text-4xl font-normal leading-tight italic text-[#1a1a1a]">
                {product.name}
              </h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-bold">Premium Ensemble</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#1a1a1a]">₹{product.price.toLocaleString()}</span>
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-[#8b231a] tracking-wider uppercase">
                  {product.discount}% OFF
                </span>
              </div>
            </div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-[10px] tracking-widest text-gray-500 uppercase">Select Color</h3>
                <div className="flex gap-4">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className="group flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-2 transition-all ring-offset-2 ${
                          selectedColorIdx === idx
                            ? "border-[#1a1a1a] ring-2 ring-[#1a1a1a]/20 scale-110"
                            : "border-transparent group-hover:border-gray-200"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[10px] tracking-widest text-gray-500 uppercase">Select Size</h3>
                <button className="text-[10px] text-[#8b231a] font-bold tracking-widest hover:underline uppercase">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                   <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border text-xs font-bold transition-all ${
                      selectedSize === size
                         ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                        : "border-gray-200 text-[#1a1a1a] hover:border-[#1a1a1a]"
                    }`}
                  >
                    {size === 0 ? "FS" : size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <button
                onClick={handleAddToBag}
                className="flex-[1.5] h-16 bg-white border border-[#1a1a1a] text-[#1a1a1a] font-bold text-xs tracking-[0.2em] rounded-sm hover:bg-[#1a1a1a] hover:text-white transition-all uppercase"
              >
                Add To Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 h-16 bg-[#8b231a] text-white font-bold text-xs tracking-[0.2em] rounded-sm hover:bg-[#a62b21] transition-all uppercase"
              >
                Buy Now
              </button>
            </div>

            {/* Delivery */}
            <div className="pt-6 border-t border-black/5">
              <h3 className="font-bold text-[10px] tracking-widest text-gray-500 uppercase mb-3">Check Delivery</h3>
              <div className="flex border border-gray-200 rounded-sm overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter pincode"
                  className="flex-1 px-4 py-4 text-sm bg-transparent outline-none text-[#1a1a1a] placeholder:text-gray-300 font-medium"
                  maxLength={6}
                />
                <button className="px-8 text-[10px] font-bold tracking-widest text-[#8b231a] hover:bg-gray-50 transition-colors">
                  CHECK
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-y-6 pt-4">
              <div className="flex items-center gap-3">
                <Truck size={18} className="text-[#8b231a]" strokeWidth={1} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw size={18} className="text-[#8b231a]" strokeWidth={1} />
                <span className="text-[10px] font-bold uppercase tracking-widest">7 Day Returns</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={18} className="text-[#8b231a]" strokeWidth={1} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Assured Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <Banknote size={18} className="text-[#8b231a]" strokeWidth={1} />
                <span className="text-[10px] font-bold uppercase tracking-widest">COD Available</span>
              </div>
            </div>

            {/* Accordion sections */}
            <Accordion type="single" collapsible className="w-full pt-4 border-t border-black/5">
              <AccordionItem value="details" className="border-none">
                <AccordionTrigger className="font-bold text-[11px] tracking-widest uppercase py-4">
                  Product Details
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-2">
                    <p className="text-sm leading-relaxed text-gray-500">
                      {product.description}
                    </p>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fabric</p>
                        <p className="text-sm text-[#1a1a1a] font-medium italic">{product.fabric}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fit</p>
                        <p className="text-sm text-[#1a1a1a] font-medium italic">{product.fit}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Neckline</p>
                        <p className="text-sm text-[#1a1a1a] font-medium italic">{product.neckline}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sleeve</p>
                        <p className="text-sm text-[#1a1a1a] font-medium italic">{product.sleeve}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="wash" className="border-none">
                <AccordionTrigger className="font-bold text-[11px] tracking-widest uppercase py-4">
                  Wash and Care
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-gray-500 pt-2 italic">
                    Gridox garments are made with premium fabrics. We recommend hand dry cleaning or a gentle cold wash to preserve the fabric's integrity. Dry in shade and iron on low-to-medium heat.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Help */}
            <div className="pt-8 border-t border-black/5">
              <h3 className="font-bold text-[10px] tracking-widest uppercase text-gray-400 mb-4">Questions?</h3>
              <div className="space-y-2">
                <p className="text-sm text-[#1a1a1a] font-medium">
                  Support: <a href="tel:011-41169005" className="hover:text-[#8b231a] transition-colors font-bold tracking-wider underline underline-offset-4">011-41169005</a>
                </p>
                <p className="text-sm text-[#1a1a1a] font-medium">
                  Email: <a href="mailto:support@gridox.com" className="hover:text-[#8b231a] transition-colors font-bold tracking-wider underline underline-offset-4">support@gridox.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="max-w-7xl mx-auto py-12">
        <SimilarProducts 
          products={category.products} 
          currentProductId={product.id} 
          categorySlug={category.slug} 
        />
      </div>

      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetailPage;
