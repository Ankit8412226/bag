export function generateWhatsAppUrl(
  phone: string,
  message: string
): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export function generateProductWhatsAppUrl(
  productName: string,
  price: number
): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';
  const message = `Hi BagCorner 👋\n\nI am interested in this product:\n\nProduct: ${productName}\nPrice: ₹${price.toLocaleString('en-IN')}\n\nPlease share the details and availability.`;
  return generateWhatsAppUrl(phone, message);
}

export function generateGeneralWhatsAppUrl(): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';
  const message = 'Hi BagCorner, I would like to know more about your bags.';
  return generateWhatsAppUrl(phone, message);
}
