/**
 * Interaction tracking, inert until someone supplies a measurement ID.
 *
 * ## State of play
 *
 * The project has never had analytics — no GA4, no GTM, no Plausible. That
 * means none of the thirteen metrics in the growth brief (clicks, engaged
 * sessions, gallery interactions, directions clicks…) can be measured at all.
 * Every audit so far has had to reason from Search Console screenshots and
 * static inspection.
 *
 * This wires the plumbing so that the day a measurement ID exists, one
 * repository secret turns it on:
 *
 *     GitHub → Settings → Secrets → Actions → NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
 *
 * Until then `GA_ID` is empty, no script is injected, and every `track()` call
 * returns immediately. Nothing is sent anywhere, and no consent banner is owed,
 * because nothing is collected.
 *
 * ## Deliberately not switched on for you
 *
 * Enabling third-party tracking on a Mandal's site is the committee's decision,
 * not a developer's. Under India's DPDP Act the operator carries the obligations,
 * and a temple site collecting visitor data without anyone having agreed to it
 * would be the wrong default. So the switch is left off and documented.
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: Params) => void;
  }
}

/**
 * Record an interaction. Safe to call anywhere: no-ops during SSR, no-ops when
 * no measurement ID is configured, and never throws — an analytics failure must
 * not break a button a devotee is trying to press.
 */
export function track(event: string, params: Params = {}) {
  if (!GA_ID) return;
  if (typeof window === "undefined" || !window.gtag) return;
  try {
    window.gtag("event", event, params);
  } catch {
    // Blocked by an extension, offline, or the script never loaded.
  }
}
