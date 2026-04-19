import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/fixes/whatsappConfig"; // fix: whatsapp number config

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 md:bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} className="text-primary-foreground" />
    </a>
  );
};

export default WhatsAppButton;
