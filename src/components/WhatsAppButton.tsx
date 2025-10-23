import { Button } from './ui/button';

export function WhatsAppButton({ phone = '+21627181000', message = 'Bonjour, je souhaite plus d\'informations.' }: { phone?: string; message?: string; }) {
  const href = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button className="bg-green-600 hover:bg-green-700">WhatsApp</Button>
    </a>
  );
}


