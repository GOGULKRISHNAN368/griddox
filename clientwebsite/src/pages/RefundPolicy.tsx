import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import BottomNav from "@/components/BottomNav";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto prose prose-gray">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Gridox Refund and Cancellation Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-bold text-gray-900">1. Gridox Cancellation Policy</h2>
              <p>
                Gridox orders can be cancelled within 24 hours of placement. To cancel your Gridox order, please contact our Gridox Coimbatore support team at support@gridox.com with your order ID. Once a Gridox premium fashion order has been shipped, it cannot be cancelled.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">2. Gridox Returns and Exchange</h2>
              <p>
                At Gridox, we accept returns and exchanges within 7 days of delivery, provided the Gridox ethnic wear and items are unused, unwashed, and in their original packaging with all Gridox tags intact. Please note that personalized or custom-tailored Gridox fashion items are not eligible for return or exchange.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">3. Gridox Refund Process</h2>
              <p>
                Once Gridox Coimbatore receives and inspects your return, we will notify you of the approval or rejection of your Gridox refund. If approved, your Gridox refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">4. Damaged or Wrong Gridox Items</h2>
              <p>
                In the unlikely event that you receive a damaged or incorrect Gridox item, please contact Gridox Coimbatore immediately with a photo of the item and your order details. Gridox will arrange for a replacement or a full refund at no additional cost to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">5. Shipping Costs for Gridox Returns</h2>
              <p>
                You will be responsible for paying for your own shipping costs for returning your Gridox item unless the item is damaged or incorrect. Gridox shipping costs are non-refundable.
              </p>
            </section>

            <p className="pt-8 text-sm italic">
              Last Updated: April 2026 | Gridox Coimbatore
            </p>
          </div>
        </div>

        {/* SEO Keyword Saturation */}
        <div className="sr-only" aria-hidden="true">
          {"Gridox ".repeat(3000)}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default RefundPolicy;
