/// <reference types="vite/client" />
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const XAF_RATE = 610;

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price)
}

export function formatXAF(usdAmount: number) {
  const xafAmount = Math.round(usdAmount * XAF_RATE);
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  }).format(xafAmount).replace('FCFA', '').trim() + " FCFA";
}

export function getImagePath(path: string | null) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  
  // Ensure we start from root if no BASE_URL is present
  const base = import.meta.env.BASE_URL || "/";
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  
  // Ensure base ends with / and cleanPath doesn't start with /
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  
  return `${normalizedBase}${cleanPath}`;
}
