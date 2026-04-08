import OfferBanner from "@/components/OfferBanner";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import NewIn from "@/components/NewIn";
import FeaturedCategories from "@/components/FeaturedCategories";
import Reels from "@/components/Reels";
import AboutUs from "@/components/AboutUs";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Header />
      <HeroCarousel />
      <AnnouncementBar />
      <div id="new-arrivals"><NewIn /></div>
      <div id="shop"><FeaturedCategories /></div>
      <div className="flex justify-center -mt-8 mb-12 md:hidden">
        <button className="border border-foreground px-10 py-3 text-xs font-semibold uppercase tracking-[0.2em] bg-background hover:bg-foreground hover:text-background transition-colors">
          View More
        </button>
      </div>
      <Reels />
      <div id="about"><AboutUs /></div>
      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
