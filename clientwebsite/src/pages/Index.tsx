import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";

// Lazy load below-the-fold components
const NewIn = lazy(() => import("@/components/NewIn"));
const FeaturedCategories = lazy(() => import("@/components/FeaturedCategories"));
const Reels = lazy(() => import("@/components/Reels"));
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
      <HeroCarousel />

      <Suspense fallback={<SectionSkeleton />}>
        <div id="new-arrivals"><NewIn /></div>
        <div id="shop"><FeaturedCategories /></div>
        <Reels />
        <CustomerReviews />
        <div id="about"><AboutUs /></div>
        <BottomNav />
        <WhatsAppButton />
      </Suspense>
    </div>
  );
};

export default Index;
