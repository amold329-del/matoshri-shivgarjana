"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Send, Copy, Check, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { getSettings } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * TODO — CONNECT A BACKEND (MCV-003, layer 1)
 * ------------------------------------------------------------------
 * The form posts JSON to CONTACT_ENDPOINT. Until the Mandal creates an
 * account this is empty, and the form automatically uses the mailto
 * fallback below (which is built so it can never fail silently).
 *
 * To switch the real backend on, set ONE endpoint URL here:
 *
 *   Formspree   https://formspree.io  → "https://formspree.io/f/XXXXXXX"
 *   Web3Forms   https://web3forms.com → "https://api.web3forms.com/submit"
 *                (also add access_key to the payload below)
 *   Apps Script → deploy a Web App bound to a Google Sheet, paste its /exec URL
 *
 * No other change is needed — the success/error UI is already wired.
 */
const CONTACT_ENDPOINT = "";

const MAX = { name: 80, email: 120, message: 2000 };
/** Submissions faster than this after mount are almost certainly bots. */
const MIN_FILL_MS = 3000;

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error" | "fallback";

export function ContactForm() {
  const { tr } = useLanguage();
  const { contact } = getSettings();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const mountedAt = useRef(Date.now());
  const sending = useRef(false);

  const phoneDigits = contact.phones[0].replace(/\D/g, "");

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  /** Localised validation (MCV-023) — native messages would render in the
   *  browser's UI language, not the language the visitor chose. */
  function validate(): Errors {
    const e: Errors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name) {
      e.name = tr({ en: "Please enter your name.", mr: "कृपया आपले नाव लिहा." });
    } else if (name.length < 2) {
      e.name = tr({
        en: "Name is too short.",
        mr: "नाव खूप लहान आहे.",
      });
    }

    if (!email) {
      e.email = tr({
        en: "Please enter your email address.",
        mr: "कृपया आपला ईमेल पत्ता लिहा.",
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u.test(email)) {
      // Unicode-aware: Devanagari local-parts are accepted, but a real TLD
      // is required (native validation wrongly accepts "a@b").
      e.email = tr({
        en: "Please enter a valid email address.",
        mr: "कृपया योग्य ईमेल पत्ता लिहा.",
      });
    }

    if (!message) {
      e.message = tr({
        en: "Please write your message.",
        mr: "कृपया आपला संदेश लिहा.",
      });
    } else if (message.length < 10) {
      e.message = tr({
        en: "Please write a little more.",
        mr: "कृपया थोडे अधिक लिहा.",
      });
    }
    return e;
  }

  function mailtoUrl() {
    const subject = encodeURIComponent(
      `Website enquiry from ${form.name.trim() || "visitor"}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\n${form.message.trim()}`,
    );
    return `mailto:${encodeURIComponent(contact.email)}?subject=${subject}&body=${body}`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending.current) return; // exactly one submission per click burst

    // Spam traps (MCV-024) — fail silently to the bot, no feedback.
    if (company.trim() !== "") return;
    if (Date.now() - mountedAt.current < MIN_FILL_MS) return;

    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) {
      document
        .getElementById(`contact-${Object.keys(e2)[0]}`)
        ?.focus();
      return;
    }

    sending.current = true;
    setStatus("sending");

    // ---- Layer 1: real backend ----
    if (CONTACT_ENDPOINT) {
      try {
        const res = await fetch(CONTACT_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            message: form.message.trim(),
          }),
        });
        sending.current = false;
        if (res.ok) {
          setStatus("sent");
          setForm({ name: "", email: "", message: "" });
        } else {
          setStatus("error");
        }
      } catch {
        sending.current = false;
        setStatus("error");
      }
      return;
    }

    // ---- Layer 2: mailto that cannot fail silently (MCV-003) ----
    // Assigning window.location to a mailto: is a no-op when no mail handler
    // is registered — common on desktop webmail and inside the Instagram /
    // WhatsApp in-app browsers. If we are still visible and focused shortly
    // after, the handler never opened: show the panel instead.
    window.location.href = mailtoUrl();
    window.setTimeout(() => {
      sending.current = false;
      if (document.visibilityState === "visible" && document.hasFocus()) {
        setStatus("fallback");
      } else {
        setStatus("sent");
      }
    }, 1200);
  }

  const field =
    "w-full rounded-xl border border-card-border bg-surface px-4 py-3 text-ink outline-none transition focus:border-gold";
  const errorText = "mt-1.5 text-body-sm font-semibold text-[#A8500A]";

  return (
    <form onSubmit={onSubmit} noValidate className="card-surface space-y-4 p-7">
      {/* honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          {tr({ en: "Your name", mr: "आपले नाव" })}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={MAX.name}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={cn(field, errors.name && "border-[#A8500A]")}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className={errorText}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          {tr({ en: "Email address", mr: "ईमेल पत्ता" })}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={MAX.email}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={cn(field, errors.email && "border-[#A8500A]")}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className={errorText}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-semibold text-ink"
        >
          {tr({ en: "Message", mr: "संदेश" })}
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={MAX.message}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={cn(field, "resize-y", errors.message && "border-[#A8500A]")}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className={errorText}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-gold inline-flex w-full items-center justify-center gap-2 disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {tr({ en: "Sending…", mr: "पाठवत आहे…" })}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            {tr({ en: "Send message", mr: "संदेश पाठवा" })}
          </>
        )}
      </button>

      {/* result announcements (WCAG 4.1.3) */}
      <div aria-live="polite" className="space-y-3">
        {status === "sent" && (
          <p className="rounded-xl border border-emerald-600/40 bg-emerald-600/10 p-4 text-body-sm font-semibold text-emerald-800 dark:text-emerald-300">
            {tr({
              en: "Thank you — your message is on its way. We will reply soon.",
              mr: "धन्यवाद — आपला संदेश पाठवला जात आहे. आम्ही लवकरच उत्तर देऊ.",
            })}
          </p>
        )}

        {status === "error" && (
          <p className="rounded-xl border border-[#A8500A]/40 bg-[#A8500A]/10 p-4 text-body-sm font-semibold text-[#A8500A]">
            {tr({
              en: "Sorry, the message could not be sent. Please use the phone or WhatsApp below.",
              mr: "क्षमस्व, संदेश पाठवता आला नाही. कृपया खालील दूरध्वनी किंवा व्हॉट्सअ‍ॅप वापरा.",
            })}
          </p>
        )}

        {status === "fallback" && (
          <div className="rounded-xl border border-gold/40 bg-gold/10 p-4">
            <p className="text-body-sm font-semibold text-ink">
              {tr({
                en: "Your mail app did not open. Please contact us directly:",
                mr: "आपले ईमेल अ‍ॅप उघडले नाही. कृपया थेट संपर्क साधा:",
              })}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <code className="rounded-lg bg-surface px-3 py-2 text-body-sm text-ink">
                {contact.email}
              </code>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(contact.email);
                    setCopied(true);
                  } catch {
                    setCopied(false);
                  }
                }}
                className="btn btn-outline inline-flex items-center gap-1.5 px-3 py-2 text-body-sm"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    {tr({ en: "Copied", mr: "कॉपी झाले" })}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {tr({ en: "Copy email", mr: "ईमेल कॉपी करा" })}
                  </>
                )}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`tel:+${phoneDigits}`}
                className="btn btn-outline inline-flex items-center gap-1.5 px-3 py-2 text-body-sm"
              >
                <Phone className="h-3.5 w-3.5" />
                {contact.phones[0]}
              </a>
              <a
                href={`https://wa.me/${phoneDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline inline-flex items-center gap-1.5 px-3 py-2 text-body-sm"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                {tr({ en: "WhatsApp", mr: "व्हॉट्सअ‍ॅप" })}
              </a>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
