import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import BottomNav from "@/components/BottomNav";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Gridox</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have a question about Gridox premium fashion or need assistance? The Gridox Coimbatore team is here to help. Reach out to Gridox through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 bg-black/5 rounded-2xl border border-black/5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#8b231a] rounded-xl flex items-center justify-center text-white shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email Gridox</h3>
                  <p className="text-gray-600 text-sm">The Gridox support team typically responds within 24 hours.</p>
                  <a href="mailto:gridoxclothing@gmail.com" className="text-[#8b231a] font-semibold mt-2 inline-block">gridoxclothing@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-black/5 rounded-2xl border border-black/5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#8b231a] rounded-xl flex items-center justify-center text-white shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Call Gridox Coimbatore</h3>
                  <p className="text-gray-600 text-sm">Gridox Support: Mon-Sat, 10:00 AM to 7:00 PM IST</p>
                  <a href="tel:+918110911118" className="text-[#8b231a] font-semibold mt-2 inline-block">+91 81109 11118</a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 bg-black/5 rounded-2xl border border-black/5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#8b231a] rounded-xl flex items-center justify-center text-white shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Gridox Flagship Location</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Gridox Fashion Studio<br />
                    Sakthi Theatre Rd, Shrinagar,<br />
                    Pitchampalayam Pudur, Tiruppur,<br />
                    Chettipalayam, Tamil Nadu 641603
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-black/5 rounded-2xl border border-black/5 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#8b231a] rounded-xl flex items-center justify-center text-white shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Gridox Business Hours</h3>
                  <p className="text-gray-600 text-sm">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p className="text-gray-600 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
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

export default ContactUs;

