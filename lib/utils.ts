import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateToLocaleString(date: Date | string) {
  return new Date(date).toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const truncateTitle = (title: string, maxLength: number) => {
  if (title.length <= maxLength) {
    return title;
  }
  return title.slice(0, maxLength) + '...';
}

export const getStatusColor = (status: string) => {
  switch (status) {
      case 'approved':
          return 'text-green-600 bg-green-100';
      case 'pending':
          return 'text-yellow-600 bg-yellow-100';
      case 'not_approved':
          return 'text-red-600 bg-red-100';
      default:
          return 'text-gray-600 bg-gray-100';
  }
};
