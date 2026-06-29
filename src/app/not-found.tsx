import Link from "next/link";
import { Emblem, FloatingPetals } from "@/components/ui/decorations";

/** Marathi 404 page. */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_-10%,#5a1024_0%,#2a0712_55%,#1b0410_100%)] px-6 py-28 text-center text-[var(--dark-text)]">
      <FloatingPetals count={8} />
      <div className="relative z-10 flex flex-col items-center">
        <Emblem className="h-20 w-20 drop-shadow-[0_8px_24px_rgba(230,200,104,0.35)]" />
        <p className="mt-6 font-display text-6xl font-extrabold text-gold-light">
          ४०४
        </p>
        <h1 className="mt-2 font-mr text-2xl font-bold sm:text-3xl">
          पृष्ठ सापडले नाही
        </h1>
        <p className="mt-3 max-w-md text-[var(--dark-text-soft)]">
          तुम्ही शोधत असलेले पृष्ठ उपलब्ध नाही किंवा दुसरीकडे हलवले गेले आहे.
        </p>
        <Link href="/" className="btn btn-gold mt-8">
          मुख्यपृष्ठावर परत जा
        </Link>
      </div>
    </section>
  );
}
