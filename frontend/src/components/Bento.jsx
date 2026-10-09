import { motion } from "framer-motion";
import { ArrowUpRight, WashingMachine } from "lucide-react";
import { Reveal, EASE } from "@/components/Reveal";
import { useBooking } from "@/context/booking";

const KITCHEN_IMG =
    "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwxfHxob3VzZSUyMGNsZWFuaW5nJTIwcGVyc29uJTIwd2lwaW5nJTIwY291bnRlciUyMGtpdGNoZW4lMjBzcHJheSUyMGJvdHRsZSUyMHNwYXJrbGluZ3xlbnwwfHx8fDE3OTE1MTY1Mjh8MA&ixlib=rb-4.1.0&q=85";
const SPRAY_IMG =
    "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwzfHxob3VzZSUyMGNsZWFuaW5nJTIwcGVyc29uJTIwd2lwaW5nJTIwY291bnRlciUyMGtpdGNoZW4lMjBzcHJheSUyMGJvdHRsZSUyMHNwYXJrbGluZ3xlbnwwfHx8fDE3OTE1MTY1Mjh8MA&ixlib=rb-4.1.0&q=85";
const MOP_IMG =
    "https://images.unsplash.com/photo-1758273238564-806f750a2cce?crop=entropy&cs=srgb&fm=jpg&q=85";
const APARTMENT_IMG =
    "https://images.unsplash.com/photo-1776673687936-65e63a5a3e05?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODh8MHwxfHNlYXJjaHw0fHxtb2Rlcm4lMjBicmlnaHQlMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMHByaXN0aW5lJTIwd2hpdGUlMjBncmVlbiUyMHBsYW50c3xlbnwwfHx8fDE3OTE1MTY1Mjd8MA&ixlib=rb-4.1.0&q=85";

const CARDS = [
    {
        id: "kitchen",
        title: "Kitchen deep clean",
        desc: "Degreased stove, chimney & tiles. Counters and sink shining like day one.",
        price: "₹237 · approx 3 hrs",
        img: KITCHEN_IMG,
        span: "lg:col-span-7",
        service: "Kitchen deep clean",
        hours: 3,
    },
    {
        id: "bathroom",
        title: "Bathroom sanitation",
        desc: "Tiles, taps, commode & drains — scrubbed, disinfected and left dry.",
        price: "₹79 · approx 1 hr",
        img: SPRAY_IMG,
        span: "lg:col-span-5",
        service: "Bathroom sanitation",
        hours: 1,
    },
    {
        id: "hourly",
        title: "Hourly house help",
        desc: "Sweeping, mopping, dusting, dishes — you decide the checklist.",
        price: "₹79/hr · you pick the hours",
        img: APARTMENT_IMG,
        span: "lg:col-span-4",
        service: "Hourly house help",
        hours: 3,
    },
    {
        id: "laundry",
        title: "Utensils & laundry",
        desc: "Dishes washed & arranged, clothes washed, dried and folded away.",
        price: "₹79/hr",
        icon: WashingMachine,
        span: "lg:col-span-4",
        solid: true,
        service: "Utensils & laundry",
        hours: 2,
    },
    {
        id: "dusting",
        title: "Dusting & mopping",
        desc: "Fans, shelves, floors and every corner you stopped noticing.",
        price: "₹79/hr",
        img: MOP_IMG,
        span: "lg:col-span-4",
        service: "Dusting & mopping",
        hours: 2,
    },
    {
        id: "sofa",
        title: "Sofa cleaning",
        desc: "Deep foam shampoo for sofas & chairs — dust, stains and odours lifted out.",
        price: "₹79 · approx 1 hr",
        img: "https://images.unsplash.com/photo-1686178827149-6d55c72d81df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHw0fHxzb2ZhJTIwdXBob2xzdGVyeSUyMGNsZWFuaW5nJTIwZm9hbSUyMGNvdWNofGVufDB8fHx8MTc5MTUxODI4OHww&ixlib=rb-4.1.0&q=85",
        span: "lg:col-span-7",
        service: "Sofa cleaning",
        hours: 1,
    },
    {
        id: "balcony",
        title: "Balcony cleaning",
        desc: "Floors, grills and pots wiped fresh — your little outdoors, ready again.",
        price: "₹79/hr",
        img: "https://images.unsplash.com/photo-1762704452342-54991a995f09?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDB8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiYWxjb255JTIwcGxhbnRzJTIwbW9ybmluZyUyMGxpZ2h0JTIwY2xlYW58ZW58MHx8fHwxNzkxNTE4Mjg4fDA&ixlib=rb-4.1.0&q=85",
        span: "lg:col-span-5",
        service: "Balcony cleaning",
        hours: 1,
    },
];

function Card({ card, index }) {
    const { open } = useBooking();
    const Icon = card.icon;

    return (
        <Reveal
            delay={index * 0.07}
            className={`${card.span} col-span-full h-full`}
        >
            <button
                onClick={() =>
                    open({ service: card.service, hours: card.hours })
                }
                data-testid={`service-card-${card.id}`}
                className={`group relative block h-full w-full overflow-hidden rounded-3xl text-left transition-shadow duration-300 hover:shadow-2xl ${
                    card.solid
                        ? "bg-pine text-cream"
                        : "border border-line bg-white text-pine"
                }`}
            >
                {card.img && (
                    <>
                        <img
                            src={card.img}
                            alt={card.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                    </>
                )}
                {card.solid && (
                    <Icon
                        className="absolute right-6 top-6 h-10 w-10 text-lime"
                        strokeWidth={1.5}
                    />
                )}

                <div className="relative flex h-full min-h-[280px] flex-col justify-end p-6 lg:min-h-[320px] lg:p-8">
                    <h3
                        className={`font-display text-2xl font-bold tracking-tight lg:text-3xl ${
                            card.solid ? "text-cream" : "text-cream"
                        }`}
                    >
                        {card.title}
                    </h3>
                    <p
                        className={`mt-2 max-w-sm text-sm leading-relaxed ${
                            card.solid ? "text-cream/70" : "text-cream/80"
                        }`}
                    >
                        {card.desc}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="inline-flex rounded-full bg-lime/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-lime backdrop-blur">
                            {card.price}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-pine opacity-0 transition-all duration-300 group-hover:opacity-100">
                            <ArrowUpRight className="h-5 w-5" />
                        </span>
                    </div>
                </div>
            </button>
        </Reveal>
    );
}

export default function Bento() {
    return (
        <section id="services" className="relative py-20 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <Reveal>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-leaf">
                            What we do
                        </p>
                        <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-pine sm:text-5xl">
                            Pick a chore.{" "}
                            <span className="font-serifit font-semibold text-leaf">
                                We do the rest.
                            </span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="max-w-sm text-base leading-relaxed text-bark lg:text-right">
                            Tap any card to book it on WhatsApp. Every pro
                            arrives on time, with their own supplies.
                        </p>
                    </Reveal>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[320px]">
                    {CARDS.map((card, i) => (
                        <Card key={card.id} card={card} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
