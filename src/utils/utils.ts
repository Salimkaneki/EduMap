import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine intelligemment les classes CSS avec gestion des conflits Tailwind.
 * Ex: cn('px-2 py-2', condition && 'bg-red') => 'px-2 py-2 bg-red'
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
