/**
 * Formats a number into an Indian Rupee string using Indian numbering system (e.g. ₹1,49,999).
 */
export function formatINR(amount: number, showCents: boolean = false): string {
  if (isNaN(amount)) return '₹0';
  
  // Use Intl.NumberFormat with 'en-IN' locale for proper lakhs and crores commas
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
  });

  return formatter.format(amount);
}

/**
 * Calculates discount percentage given original price and discounted price.
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Formats date into readable Indian format (e.g. "12 Jul, 2026")
 */
export function formatDate(dateStringOrTimestamp: string | number | Date): string {
  const date = new Date(dateStringOrTimestamp);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Calculates delivery date based on days offset
 */
export function getDeliveryDate(daysOffset: number = 1): string {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}
