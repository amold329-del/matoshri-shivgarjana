/**
 * Single source of truth for contact identifiers (MCV-044).
 * The audit found the phone number in three different formats across
 * JSON-LD, tel: hrefs and visible text. Derive every form from here.
 */
export const PHONE_E164 = "+917738337412";

/** Digits only — for wa.me links. */
export const PHONE_DIGITS = PHONE_E164.replace(/\D/g, "");
/** tel: href */
export const PHONE_HREF = `tel:${PHONE_E164}`;
/** Human-readable, Indian grouping */
export const PHONE_DISPLAY = "+91 77383 37412";
/** WhatsApp deep link */
export const WHATSAPP_URL = `https://wa.me/${PHONE_DIGITS}`;

export const EMAIL = "matoshreeshivgarjanasarvajanik@gmail.com";
export const SITE_URL = "https://matoshreechavighnaharta.co.in";
