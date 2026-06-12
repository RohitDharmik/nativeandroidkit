export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
export const isIndianMobile = (s: string) => /^[6-9]\d{9}$/.test(s.replace(/\D/g, ''));
export const isGST = (s: string) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(s);
export const isPAN = (s: string) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(s);
export const isStrongPassword = (s: string) => s.length >= 8 && /[A-Z]/.test(s) && /\d/.test(s);
