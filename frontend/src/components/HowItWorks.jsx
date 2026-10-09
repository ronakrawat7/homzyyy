import { motion } from "framer-motion";
import { MessageCircle, BadgeCheck, IndianRupee } from "lucide-react";
import { Reveal, EASE } from "@/components/Reveal";

const STEPS = [
    {
        num: "01",
        icon: MessageCircle,
        title: "Tap on WhatsApp",
        desc: "Pick a service, your hours and a time. It lands straight in our chat — no app, no sign-up.",
    },
    {
        num: "02",
        icon: BadgeCheck,
        title: "A verified pro arrives",
        desc: "Background-checked, trained and on time — with their own supplies and gear.",
    },
    {
        num: "03",
        icon: IndianRupee,
        title: "Pay ₹79/hr after",
        desc: "UPI or cash, only for the hours you booked. You check the work first, then pay.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how" className="bg-white py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                <Reveal className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-leaf">
                        How it works
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-pine sm:text-5xl">
                        Three steps.{" "}
                        <span className="font-serifit font-semibold text-leaf">
                            One message.
                        </span>
                    </h2>
                </Reveal>

                <div className="relative mt-14 grid gap-10 md:grid-cols-3 lg:gap-8">
                    {/* animated connector */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
                        className="absolute left-[16%] right-[16%] top-10 hidden origin-left border-t-2 border-dashed border-leaf/40 md:block"
                    />
                    {STEPS.map((step, i) => (
                        <Reveal key={step.num} delay={i * 0.15}>
                            <div className="relative" data-testid={`how-step-${i + 1}`}>
                                <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-cream shadow-sm ring-1 ring-line">
                                    <step.icon className="h-8 w-8 text-leaf" strokeWidth={1.75} />
                                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-pine font-display text-[11px] font-extrabold text-cream">
                                        {i + 1}
                                    </span>
                                </div>
                                <p className="mt-6 font-serifit text-lg text-leaf">
                                    {step.num}
                                </p>
                                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight text-pine">
                                    {step.title}
                                </h3>
                                <p className="mt-3 max-w-xs text-base leading-relaxed text-bark">
                                    {step.desc}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
