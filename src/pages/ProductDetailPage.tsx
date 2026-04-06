import { useParams, Link } from "react-router-dom";
import { Heart, ChevronLeft, Truck, RotateCcw, Shield, Banknote } from "lucide-react";
import { useState } from "react";
import categories from "@/data/categoryProducts";
import ProductGallery from "@/components/ProductGallery";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import OfferBanner from "@/components/OfferBanner";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <OfferBanner />
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
          <Link to="/" className="hover:text-foreground transition-colors">HOME</Link>
          <span>/</span>
          <Link to={`/category/${category.slug}`} className="hover:text-foreground transition-colors">
            {category.title}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left: Image Gallery */}
          <div className="w-full">
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Product Info */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-wide uppercase">
                {product.name}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold">₹{product.price.toLocaleString()}</span>
              <span className="text-sm text-muted-foreground">MRP</span>
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
              <span className="text-sm font-semibold text-red-500">
                {product.discount}% OFF
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Inclusive of all taxes</p>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="font-bold text-sm mb-2 tracking-wide">SELECT COLOR</h3>
                <div className="flex gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`flex flex-col items-center gap-1`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColorIdx === idx
                            ? "border-foreground ring-2 ring-foreground/20"
                            : "border-muted"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-sm tracking-wide">SELECT SIZE</h3>
                <button className="text-sm text-red-500 hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border-2 text-sm font-medium transition-all ${
                      selectedSize === size
                        ? "border-foreground bg-foreground text-background"
                        : "border-muted-foreground/30 hover:border-foreground"
                    }`}
                  >
                    {size === 0 ? "FS" : size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleAddToBag}
                className="flex-1 h-14 bg-muted-foreground/80 text-background font-bold text-sm tracking-widest rounded hover:bg-muted-foreground transition-colors"
              >
                ADD TO BAG
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 h-14 bg-[#c4877a] text-white font-bold text-sm tracking-widest rounded hover:bg-[#b07069] transition-colors"
              >
                BUY NOW
              </button>
            </div>

            {/* Delivery */}
            <div className="pt-2">
              <h3 className="font-bold text-sm tracking-wide mb-2">DELIVERY</h3>
              <div className="flex rounded border border-muted overflow-hidden">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter pincode"
                  className="flex-1 px-4 py-3 text-sm bg-transparent outline-none"
                  maxLength={6}
                />
                <button className="px-4 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
                  CHECK
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium">7 Days Easy Return</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium">Assured Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium">COD Available</span>
              </div>
            </div>

            {/* Accordion sections */}
            <Accordion type="single" collapsible className="w-full pt-2">
              <AccordionItem value="details">
                <AccordionTrigger className="font-bold text-sm tracking-wide">
                  PRODUCT DETAILS
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    <div>
                      <p className="font-bold text-sm">Fabric</p>
                      <p className="text-sm text-muted-foreground">{product.fabric}</p>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Fit</p>
                      <p className="text-sm text-muted-foreground">{product.fit}</p>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Neckline</p>
                      <p className="text-sm text-muted-foreground">{product.neckline}</p>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Sleeve</p>
                      <p className="text-sm text-muted-foreground">{product.sleeve}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="wash">
                <AccordionTrigger className="font-bold text-sm tracking-wide">
                  WASH & CARE
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Hand wash or machine wash in cold water. Do not bleach. Dry in shade. Iron on medium heat.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="delivery">
                <AccordionTrigger className="font-bold text-sm tracking-wide">
                  DELIVERY & RETURNS
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">
                    Free delivery on orders above ₹999. Easy 7-day returns and exchanges. Cash on delivery available on most pin codes.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Help */}
            <div className="pt-4 border-t">
              <h3 className="font-bold text-sm mb-2">HAVE A QUESTION? WE ARE HERE TO HELP!</h3>
              <p className="text-sm text-muted-foreground">
                We are available on <a href="tel:011-41169005" className="underline">011-41169005</a>, Monday - Saturday from 9:30am - 6:30pm.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Email us at <a href="mailto:support@gridox.com" className="underline">support@gridox.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default ProductDetailPage;
