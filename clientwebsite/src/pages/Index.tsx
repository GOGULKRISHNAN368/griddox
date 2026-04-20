import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import CategoryGrid from "@/components/CategoryGrid";
import AnnouncementBar from "@/components/AnnouncementBar";
import BestSellers from "@/components/BestSellers";
import CuratedLooks from "@/components/CuratedLooks";

// Lazy load below-the-fold components
const NewIn = lazy(() => import("@/components/NewIn"));

const Reels = lazy(() => import("@/components/Reels"));
const InstagramFeed = lazy(() => import("@/components/InstagramFeed"));
const CustomerReviews = lazy(() => import("@/components/CustomerReviews"));
const AboutUs = lazy(() => import("@/components/AboutUs"));
const BottomNav = lazy(() => import("@/components/BottomNav"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

const SectionSkeleton = () => <div className="h-[400px] w-full bg-muted/10 animate-pulse rounded-lg my-10" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Helmet>
        <title>Gridox | Premium Women's Fashion in Coimbatore & Tirupur</title>
        <meta name="description" content="Gridox is the best online store for women's fashion in Coimbatore and Tirupur. Shop designer Peplum Co-ords, Cotton Kurti Sets, and Raw Silk ensembles. Experience express delivery and high-quality ethnic wear tailored for the modern Tamil Nadu woman." />
        <meta property="og:title" content="Gridox | Best Women's Clothing Store in Coimbatore & Tirupur" />
        <meta property="og:description" content="Discover uniquely designed, high-quality women's outfits at Gridox. Premium fabrics, perfect fits, and sophisticated styles with fast shipping in Coimbatore, Tirupur, and Erode." />
        <meta property="og:url" content={window.location.href} />
        <meta name="keywords" content="women fashion Coimbatore, designer clothing Tirupur, premium ethnic wear Coimbatore, peplum co-ords Tirupur, cotton kurti sets Coimbatore, fashion store Tamil Nadu, Gridox Coimbatore" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>
      
      <Header />
      
      {/* Announcement Bar - Desktop Top (Above Carousel) */}
      <div className="hidden md:block">
        <AnnouncementBar />
      </div>

      <HeroCarousel />

      {/* Announcement Bar - Mobile Bottom (Below Carousel) */}
      <div className="md:hidden">
        <AnnouncementBar />
      </div>

      <Suspense fallback={<SectionSkeleton />}>
        <div id="new-arrivals"><NewIn /></div>
        <CategoryGrid />
        <CuratedLooks />
        <BestSellers />

        <Reels />
        <InstagramFeed />
        <CustomerReviews />
        <div id="about"><AboutUs /></div>
        <BottomNav />
        <WhatsAppButton />
      </Suspense>
    </div>
  );
};

export default Index;
