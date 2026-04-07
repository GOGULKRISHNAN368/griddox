import OfferBanner from "@/components/OfferBanner";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import NewIn from "@/components/NewIn";
import FeaturedCategories from "@/components/FeaturedCategories";
import AboutUs from "@/components/AboutUs";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <OfferBanner />
      <AnnouncementBar />
      <Header />
      <HeroCarousel />
      <div id="new-arrivals"><NewIn /></div>  {/* fix: nav scroll links */}
      <div id="shop"><FeaturedCategories /></div>  {/* fix: nav scroll links */}
      <div id="about"><AboutUs /></div>  {/* fix: nav scroll links */}
      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
