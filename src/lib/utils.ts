import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names while resolving conflicts
 * (later utility wins). Used by all UI primitives.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
