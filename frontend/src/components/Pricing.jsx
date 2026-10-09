import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Reveal, EASE } from "@/components/Reveal";
import WaGlyph from "@/components/WaGlyph";
import { useBooking } from "@/context/booking";
import { waLink, bookingMessage } from "@/lib/whatsapp";

const SERVICES = [
    { label: "Hourly help", hrs: 3 },
    { label: "Kitchen deep clean", hrs: 3 },
    { label: "Bathroom sanitation", hrs: 1 },
    { label: "Sofa cleaning", hrs: 1 },
    { label: "Balcony cleaning", hrs: 1 },
];
const RATE = 79;
const fmt = (n) => n.toLocaleString("en-IN");

export default function Pricing() {
    const { open } = useBooking();
    const [serviceIdx, setServiceIdx] = useState(0);
    const [hours, setHours] = useState(3);
    const total = RATE * hours;
    const service = SERVICES[serviceIdx];

    const fill = ((hours - 1) / 7) * 100;

    return (
        <section id="pricing" className="py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                <div className="grid gap-10 rounded-[2.5rem] bg-pine p-7 text-cream shadow-2xl shadow-pine/25 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-16">
                    {/* left copy */}
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime">
                            Pricing
                        </p>
                        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                            One honest rate.{" "}
                            <span className="font-serifit font-semibold text-lime">
                                No surprises.
                            </span>
                        </h2>
                        <p className="mt-6 font-display text-6xl font-extrabold tracking-tight sm:text-7xl">
                            ₹79
                            <span className="ml-2 align-middle font-body text-lg font-semibold text-cream/60">
                                per hour, per pro
                            </span>
                        </p>
                        <ul className="mt-8 space-y-3.5">
                            {[
                                "Book from 1 to 8 hours",
                                "Only pay for the hours you booked",
                                "Pay after the job — UPI or cash",
                            ].map((point) => (
                                <li
                                    key={point}
                                    className="flex items-center gap-3 text-base font-medium text-cream/85"
                                >
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime/20">
                                        <Check className="h-3.5 w-3.5 text-lime" />
                                    </span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </Reveal>

                    {/* estimator */}
                    <Reveal delay={0.15}>
                        <div className="rounded-3xl bg-white p-6 text-pine shadow-xl sm:p-8">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-bark">
                                Estimate your booking
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {SERVICES.map((s, i) => (
                                    <button
                                        key={s.label}
                                        onClick={() => {
                                            setServiceIdx(i);
                                            setHours(s.hrs);
                                        }}
                                        data-testid={`pricing-service-chip-${i}`}
                                        className={`rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
                                            i === serviceIdx
                                                ? "bg-pine text-cream"
                                                : "bg-mintbg text-pine hover:bg-line"
                                        }`}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-7 flex items-end justify-between">
                                <span className="text-sm font-bold text-bark">
                                    Hours
                                </span>
                                <span className="font-display text-4xl font-extrabold">
                                    {hours}
                                    <span className="ml-1 text-base font-semibold text-bark">
                                        {hours === 1 ? "hr" : "hrs"}
                                    </span>
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="8"
                                step="1"
                                value={hours}
                                onChange={(e) =>
                                    setHours(Number(e.target.value))
                                }
                                data-testid="pricing-calculator-slider"
                                aria-label="Hours"
                                className="brand-slider mt-3"
                                style={{ "--fill": `${fill}%` }}
                            />

                            <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
                                <span className="text-sm font-semibold text-bark">
                                    ₹{RATE}/hr × {hours}{" "}
                                    {hours === 1 ? "hr" : "hrs"}
                                </span>
                                <motion.span
                                    key={total}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                    data-testid="pricing-total"
                                    className="font-display text-4xl font-extrabold text-pine"
                                >
                                    ₹{fmt(total)}
                                </motion.span>
                            </div>

                            <button
                                onClick={() => open({ service: service.label, hours })}
                                data-testid="pricing-book-btn"
                                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-wa px-6 py-4 font-display text-base font-bold text-forest shadow-lg shadow-wa/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                <WaGlyph className="h-5 w-5" />
                                Book {hours} {hours === 1 ? "hr" : "hrs"} ·
                                ₹{fmt(total)} on WhatsApp
                            </button>
                            <p className="mt-3 text-center text-xs font-medium text-bark">
                                We confirm your slot on WhatsApp shortly after.
                            </p>

                            <div className="mt-5 flex items-center gap-3">
                                <span className="h-px flex-1 bg-line" />
                                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-bark">
                                    or book a full home package
                                </span>
                                <span className="h-px flex-1 bg-line" />
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <a
                                    href={waLink(
                                        "Hi Homzy! I want to book a Full Home Deep Clean — 1BHK (₹3,999). Please share your available slots.",
                                    )}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="pricing-package-1bhk"
                                    className="rounded-2xl border-2 border-pine/10 bg-cream p-4 text-center transition-colors duration-200 hover:border-leaf"
                                >
                                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-bark">
                                        1 BHK deep clean
                                    </p>
                                    <p className="mt-1 font-display text-2xl font-extrabold text-pine">
                                        ₹3,999
                                    </p>
                                </a>
                                <a
                                    href={waLink(
                                        "Hi Homzy! I want to book a Full Home Deep Clean — 2BHK (₹4,499). Please share your available slots.",
                                    )}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="pricing-package-2bhk"
                                    className="rounded-2xl border-2 border-pine/10 bg-cream p-4 text-center transition-colors duration-200 hover:border-leaf"
                                >
                                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-bark">
                                        2 BHK deep clean
                                    </p>
                                    <p className="mt-1 font-display text-2xl font-extrabold text-pine">
                                        ₹4,499
                                    </p>
                                </a>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
