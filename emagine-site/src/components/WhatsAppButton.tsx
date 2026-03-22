import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '5561998752588';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] hover:scale-110 transition-all duration-300"
    >
      <MessageCircle className="w-7 h-7 fill-white stroke-white" />
    </a>
  );
};

export default WhatsAppButton;
