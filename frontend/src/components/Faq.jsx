import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, EASE } from "@/components/Reveal";

const FAQS = [
    {
        q: "How do I book?",
        a: "Tap any “Book on WhatsApp” button, fill a 30-second form, and your request lands directly in our WhatsApp chat. We confirm your pro and slot there.",
    },
    {
        q: "What does it cost?",
        a: "A flat ₹79 per hour, per pro — whether it's hourly help, kitchen deep cleaning, bathroom sanitation, sofa or balcony cleaning. Prefer the whole home at once? Fixed packages: 1BHK ₹3,999 · 2BHK ₹4,499. You pay after the job, by UPI or cash.",
    },
    {
        q: "Which areas in Surat do you serve?",
        a: "We currently serve Adajan, Vesu, City Light and Mota Varachha — and we're adding new neighbourhoods fast. Message us on WhatsApp to check your area.",
    },
    {
        q: "Do I need to download an app?",
        a: "No. Homzy runs entirely on WhatsApp — booking, confirmations, rescheduling, everything stays in one chat.",
    },
    {
        q: "Do the pros bring their own supplies?",
        a: "Yes — your pro arrives with basic cleaning supplies and gear. If you have specific products you'd prefer, just mention it in your WhatsApp message.",
    },
    {
        q: "Can I reschedule or cancel?",
        a: "Absolutely. Just message us on WhatsApp before your slot and we'll move things around — no charges, no forms.",
    },
];

export default function Faq() {
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <section id="faq" className="bg-white py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                <div className="grid gap-12 lg:grid-cols-12">
                    <Reveal className="lg:col-span-5">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-leaf">
                            FAQ
                        </p>
                        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-pine sm:text-5xl">
                            Asked{" "}
                            <span className="font-serifit font-semibold text-leaf">
                                often.
                            </span>
                        </h2>
                        <p className="mt-5 max-w-sm text-base leading-relaxed text-bark">
                            Still curious? Message us on WhatsApp — a human
                            replies, not a bot.
                        </p>
                    </Reveal>

                    <div className="lg:col-span-7">
                        {FAQS.map((f, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className="border-b border-line">
                                    <button
                                        onClick={() =>
                                            setOpenIdx(openIdx === i ? -1 : i)
                                        }
                                        data-testid={`faq-question-${i}`}
                                        aria-expanded={openIdx === i}
                                        className="flex w-full items-center justify-between gap-6 py-6 text-left"
                                    >
                                        <span className="font-display text-lg font-bold tracking-tight text-pine sm:text-xl">
                                            {f.q}
                                        </span>
                                        <motion.span
                                            animate={{
                                                rotate: openIdx === i ? 45 : 0,
                                            }}
                                            transition={{ duration: 0.25, ease: EASE }}
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mintbg text-leaf"
                                        >
                                            <Plus className="h-5 w-5" />
                                        </motion.span>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {openIdx === i && (
                                            <motion.div
                                                initial={{
                                                    height: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    height: "auto",
                                                    opacity: 1,
                                                }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{
                                                    duration: 0.35,
                                                    ease: EASE,
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p className="max-w-xl pb-6 text-base leading-relaxed text-bark">
                                                    {f.a}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
