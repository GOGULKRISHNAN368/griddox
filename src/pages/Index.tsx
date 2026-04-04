import OfferBanner from "@/components/OfferBanner";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import FeaturedCategories from "@/components/FeaturedCategories";
import BottomNav from "@/components/BottomNav";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <OfferBanner />
      <AnnouncementBar />
      <Header />
      <HeroCarousel />
      <FeaturedCategories />
      <BottomNav />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
