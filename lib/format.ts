const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const GST_RATE = 0.18;

export function inrFromUsd(usd: number): string {
  const incGst = usd / (1 + GST_RATE);
  return inrFormatter.format(Math.round(incGst));
}

export function toKg(lbs: number): number {
  return lbs * 0.45359237;
}

export function toGrams(kg: number): number {
  return Math.round(kg * 1000);
}

export function formatEnInDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export function formatEnInFullDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}