import { ShieldCheck, CalendarDays, IndianRupee, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const POINTS = [
    {
        icon: ShieldCheck,
        title: "Verified, trained pros",
        desc: "Every helper is background-checked and trained before they ever ring your bell.",
    },
    {
        icon: CalendarDays,
        title: "Same-day slots",
        desc: "Morning mess? Message us now and a pro can reach you today.",
    },
    {
        icon: IndianRupee,
        title: "Flat ₹79/hr",
        desc: "One transparent hourly rate. No packages, no lock-ins, no hidden fees.",
    },
    {
        icon: MessageCircle,
        title: "Everything on WhatsApp",
        desc: "Book, reschedule or say hi — your entire history lives in one chat.",
    },
];

export default function Promise() {
    return (
        <section className="py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                <Reveal className="max-w-2xl">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-leaf">
                        Why homzy
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-pine sm:text-5xl">
                        Built to feel{" "}
                        <span className="font-serifit font-semibold text-leaf">
                            effortless.
                        </span>
                    </h2>
                </Reveal>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {POINTS.map((p, i) => (
                        <Reveal key={p.title} delay={i * 0.08} className="h-full">
                            <div
                                data-testid={`promise-card-${i + 1}`}
                                className="flex h-full flex-col rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pine/10"
                            >
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mintbg">
                                    <p.icon className="h-6 w-6 text-leaf" strokeWidth={1.75} />
                                </span>
                                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-pine">
                                    {p.title}
                                </h3>
                                <p className="mt-2.5 text-sm leading-relaxed text-bark">
                                    {p.desc}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
