import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import BottomNav from "@/components/BottomNav";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto prose prose-gray">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Gridox Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Gridox website (the "Gridox Service"), you agree to comply with and be bound by these Gridox Terms and Conditions. If you do not agree to these terms, please do not use our Gridox Premium Fashion Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">2. Use of the Gridox Platform</h2>
              <p>
                The content on the Gridox Coimbatore site is for your general information and use only. It is subject to change without notice. Unauthorized use of this Gridox website may give rise to a claim for damages and/or be a criminal offense.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">3. Gridox Products and Pricing</h2>
              <p>
                We strive to ensure that all details, descriptions, and prices of Gridox premium designer women's fashion appearing on the website are accurate. However, errors may occur. If we discover an error in the price of any Gridox ethnic wear or goods which you have ordered, we will inform you of this as soon as possible and give you the option of reconfirming your Gridox order at the correct price or cancelling it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">4. Gridox Intellectual Property</h2>
              <p>
                This Gridox website contains material which is owned by or licensed to Gridox Coimbatore. This material includes, but is not limited to, the design, layout, look, appearance, and graphics of Gridox clothing. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these Gridox terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
              <p>
                Your use of any Gridox information or materials on this website is entirely at your own risk, for which Gridox shall not be liable. It shall be your own responsibility to ensure that any Gridox products, services, or information available through this website meet your specific requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">6. Governing Law</h2>
              <p>
                Your use of the Gridox website and any dispute arising out of such use of the Gridox platform is subject to the laws of India, specifically under the jurisdiction of Coimbatore courts.
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

export default TermsAndConditions;
