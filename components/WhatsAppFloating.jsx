export default function WhatsAppFloating() {
  return (
    <a
      href="https://wa.me/918976254720?text=Hi%2C%20I%20visited%20the%20Restavision%20website%20and%20would%20like%20to%20discuss%20restaurant%20consulting."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-3 sm:right-10 bottom-7 z-50 inline-flex items-center gap-2.5 min-h-[48px] px-4 bg-white text-[#171717] border border-[#dededb] rounded-full shadow-[0_3px_12px_rgba(0,0,0,0.08)] hover:border-[#25d366] hover:shadow-[0_4px_16px_rgba(37,211,102,0.2)] text-[14px] font-medium transition-all duration-200 whitespace-nowrap"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
    >
      <img
        src="/whatsapp.svg"
        width={24}
        height={24}
        alt="WhatsApp"
        className="w-6 h-6 flex-shrink-0"
        decoding="async"
      />
    </a>
  );
}
