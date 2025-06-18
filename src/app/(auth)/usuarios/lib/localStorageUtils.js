import { mockCustomers } from '@/mocks/data1';

const STORAGE_KEY = 'usuarios';

export function getStoredCustomers() {
  if (typeof window === 'undefined') return []; // Evita erro no SSR

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockCustomers;
}

export function saveCustomersToStorage(customers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}
export function clearCustomersStorage() {
  localStorage.removeItem(STORAGE_KEY);
}