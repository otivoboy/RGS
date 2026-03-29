// M-Pesa Configuration
export const MPESA_CONFIG = {
  // Sandbox URLs (change to production URLs for live environment)
  BASE_URL: "https://sandbox.safaricom.co.ke",
  AUTH_URL:
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
  STK_PUSH_URL:
    "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",

  // Environment variables
  CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY || "",
  CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET || "",
  BUSINESS_SHORT_CODE: process.env.MPESA_SHORTCODE || "174379",
  PASSKEY: process.env.MPESA_PASSKEY || "",
  CALLBACK_URL:
    process.env.MPESA_CALLBACK_URL ||
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mpesa/callback`,

  // Transaction types
  TRANSACTION_TYPE: "CustomerPayBillOnline", // For PayBill
};

// Generate timestamp in YYYYMMDDHHMMSS format
export function generateTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const second = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hour}${minute}${second}`;
}

// Generate password for M-Pesa API
export function generatePassword(
  shortCode: string,
  passkey: string,
  timestamp: string
): string {
  const concatenated = shortCode + passkey + timestamp;
  return Buffer.from(concatenated).toString("base64");
}

// Format phone number to required format (254XXXXXXXXX)
export function formatPhoneNumber(phone: string): string {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, "");

  // Handle different input formats
  if (cleaned.startsWith("254")) {
    return cleaned;
  } else if (cleaned.startsWith("0")) {
    return "254" + cleaned.substring(1);
  } else if (cleaned.length === 9) {
    return "254" + cleaned;
  }

  return cleaned;
}
