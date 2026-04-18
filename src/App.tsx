import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { PromoModal } from "@/components/PromoModal"; // Import the modal

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index.tsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.tsx"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const CartPage = lazy(() => import("./pages/CartPage.tsx"));
const AccountPage = lazy(() => import("./pages/AccountPage.tsx"));
const StoreLocator = lazy(() => import("./pages/StoreLocator.tsx"));
const CoimbatoreStyleGuide = lazy(() => import("./pages/CoimbatoreStyleGuide.tsx"));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-[#8b231a] border-t-transparent rounded-full animate-spin" />
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <PromoModal />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/category/:slug/product/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/store-locator" element={<StoreLocator />} />
              <Route path="/style-guide/coimbatore" element={<CoimbatoreStyleGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
