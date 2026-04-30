import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import BottomNav from "@/components/BottomNav";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto prose prose-gray">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">Terms and Conditions</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-bold text-gray-900">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Gridox website (the "Service"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">2. Use of the Site</h2>
              <p>
                The content on this site is for your general information and use only. It is subject to change without notice. Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">3. Products and Pricing</h2>
              <p>
                We strive to ensure that all details, descriptions, and prices of products appearing on the website are accurate. However, errors may occur. If we discover an error in the price of any goods which you have ordered, we will inform you of this as soon as possible and give you the option of reconfirming your order at the correct price or cancelling it.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">4. Intellectual Property</h2>
              <p>
                This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">5. Limitation of Liability</h2>
              <p>
                Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900">6. Governing Law</h2>
              <p>
                Your use of this website and any dispute arising out of such use of the website is subject to the laws of India.
              </p>
            </section>

            <p className="pt-8 text-sm italic">
              Last Updated: April 2026
            </p>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default TermsAndConditions;
