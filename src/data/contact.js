// Centraliza los contactos y enlaces basados en variables de entorno
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573000000000';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'comercial@confeccioneselarte.com';

function whatsappLinkWithText(text) {
  if (!text) return WHATSAPP_URL;
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export { WHATSAPP_NUMBER, WHATSAPP_URL, CONTACT_EMAIL, whatsappLinkWithText };
