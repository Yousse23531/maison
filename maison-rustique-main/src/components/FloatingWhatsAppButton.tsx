import React from 'react';

export function FloatingWhatsAppButton() {
  const phoneNumber = "+21627181000";
  const message = "Bonjour Maison Rustique, je souhaite avoir plus d'informations.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">
      <div className="text-green-600 font-medium text-lg bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
        Discutez avec nous
      </div>
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 ease-in-out"
        aria-label="Discuter sur WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52s-.67-.816-.916-.816-.52.05-.67.05-.297.149-.446.371c-.149.223-.58.768-.58 1.854s.597 2.146.67 2.321c.072.174 1.186 1.816 2.875 2.533.397.167.715.268.963.343.377.115.722.1.986-.088.289-.21.471-.644.569-1.217.099-.572.099-1.066.07-1.164s-.173-.149-.471-.298zM12.075 2.012c-5.454 0-9.888 4.434-9.888 9.888 0 1.743.455 3.376 1.254 4.785l-1.32 4.867 5.02-1.303c1.35.692 2.852 1.095 4.414 1.095h.01c5.454 0 9.888-4.434 9.888-9.888s-4.434-9.888-9.888-9.888zm0 18.152c-1.55 0-3.03-.48-4.26-1.35l-.3-.17-3.17.82.83-3.08-.19-.32c-.93-1.29-1.49-2.83-1.49-4.48 0-4.53 3.67-8.2 8.2-8.2s8.2 3.67 8.2 8.2-3.67 8.2-8.2 8.2z"/>
        </svg>
      </a>
    </div>
  );
}