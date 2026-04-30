import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnnouncementBar />
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have a question or need assistance? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#8b231a] rounded-xl flex items-center justify-center text-white shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 text-sm">Our team typically responds within 24 hours.</p>
                  <a href="mailto:support@gridox.com" className="text-[#8b231a] font-semibold mt-2 inline-block">support@gridox.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#8b231a] rounded-xl flex items-center justify-center text-white shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600 text-sm">Mon-Sat, 10:00 AM to 7:00 PM IST</p>
                  <a href="tel:+919876543210" className="text-[#8b231a] font-semibold mt-2 inline-block">+91 98765 43210</a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#8b231a] rounded-xl flex items-center justify-center text-white shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Our Location</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Gridox Fashion Studio<br />
                    123, Avinashi Road, Coimbatore,<br />
                    Tamil Nadu - 641018, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#8b231a] rounded-xl flex items-center justify-center text-white shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
                  <p className="text-gray-600 text-sm">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p className="text-gray-600 text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default ContactUs;

