import OfferBanner from "@/components/OfferBanner";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import NewIn from "@/components/NewIn";
import FeaturedCategories from "@/components/FeaturedCategories";
import Reels from "@/components/Reels";
import CustomerReviews from "@/components/CustomerReviews";
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
      <Reels />
      <CustomerReviews />
      <div id="about"><AboutUs /></div>
      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
