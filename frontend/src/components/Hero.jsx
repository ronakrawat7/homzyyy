import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { BadgeCheck, IndianRupee, Clock } from "lucide-react";
import { MaskedLines, EASE } from "@/components/Reveal";
import WaGlyph from "@/components/WaGlyph";
import { SparkPath } from "@/components/Logo";
import { useBooking } from "@/context/booking";
import { waLink, WA_DEFAULT_MSG } from "@/lib/whatsapp";

const HERO_IMG =
    "https://images.unsplash.com/photo-1782898623050-d257ab5e4f8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTV8MHwxfHNlYXJjaHwyfHxjbGVhbiUyMEluZGlhbiUyMGhvbWUlMjBtb2Rlcm4lMjBsaXZpbmclMjByb29tJTIwZGVlcCUyMGNsZWFuaW5nJTIwaG91c2VrZWVwZXIlMjBraXRjaGVuJTIwc3BhcmtsZXxlbnwwfHx8fDE3OTE1MTY1MjB8MA&ixlib=rb-4.1.0&q=85";

const TRUST = [
    { icon: BadgeCheck, label: "Verified pros" },
    { icon: IndianRupee, label: "Flat ₹79/hr" },
    { icon: Clock, label: "Pay after the job" },
];

export default function Hero() {
    const { open } = useBooking();
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], [0, 70]);
    const blobY = useTransform(scrollYProgress, [0, 1], [0, -60]);

    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), {
        stiffness: 120,
        damping: 16,
    });
    const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), {
        stiffness: 120,
        damping: 16,
    });
    const onMove = (e) => {
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
    };
    const reset = () => {
        mx.set(0.5);
        my.set(0.5);
    };

    return (
        <section
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={reset}
            className="relative overflow-hidden"
        >
            {/* ambient blobs */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    style={{ y: blobY }}
                    className="absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-lime/20 blur-3xl"
                />
                <motion.div
                    style={{ y: blobY }}
                    className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-leaf/10 blur-3xl"
                />
            </div>

            <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-16 lg:pb-28">
                {/* copy */}
                <div className="relative z-10 pt-28 lg:col-span-7 lg:pt-40">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                        className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 shadow-sm"
                        data-testid="hero-eta-pill"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-wa" />
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-leaf sm:text-xs">
                            Booked on WhatsApp · from ₹79/hr
                        </span>
                    </motion.div>

                    <h1 className="mt-7 font-display text-[2.75rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
                        <MaskedLines
                            delay={0.25}
                            lines={[
                                <>Your home,</>,
                                <>
                                    <span className="font-serifit font-semibold text-leaf">
                                        spotless
                                    </span>{" "}
                                    in
                                </>,
                                <>60 minutes.</>,
                            ]}
                        />
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.8, ease: EASE }}
                        className="mt-6 max-w-md text-base leading-relaxed text-bark sm:text-lg"
                    >
                        Verified house help & deep cleaning in Surat, booked in
                        one tap on WhatsApp. Pay per hour, after the job is
                        done.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
                        className="mt-6 flex flex-wrap items-center gap-2"
                        data-testid="hero-area-pills"
                    >
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-bark">
                            <SparkPath className="h-3 w-3 text-leaf" />
                            Serving in Surat:
                        </span>
                        {["Adajan", "Vesu", "City Light", "Mota Varachha"].map(
                            (area) => (
                                <span
                                    key={area}
                                    className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-pine"
                                >
                                    {area}
                                </span>
                            ),
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.95, ease: EASE }}
                        className="mt-8 flex flex-wrap items-center gap-4"
                    >
                        <button
                            onClick={() => open()}
                            data-testid="hero-book-btn"
                            className="group inline-flex items-center gap-2.5 rounded-full bg-wa px-7 py-4 font-display text-base font-bold text-forest shadow-lg shadow-wa/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:text-lg"
                        >
                            <WaGlyph className="h-5 w-5" />
                            Book on WhatsApp
                        </button>
                        <a
                            href="#services"
                            data-testid="hero-secondary-link"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-pine/15 bg-white px-7 py-4 font-display text-base font-bold text-pine transition-colors duration-200 hover:border-pine sm:text-lg"
                        >
                            See services
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1.15 }}
                        className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
                    >
                        {TRUST.map(({ icon: Icon, label }) => (
                            <span
                                key={label}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-pine/80"
                            >
                                <Icon className="h-4 w-4 text-leaf" />
                                {label}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* visual */}
                <div className="relative pb-16 lg:col-span-5 lg:py-28">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: EASE }}
                        style={{
                            y: imgY,
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d",
                        }}
                        className="relative mx-auto max-w-md lg:max-w-none"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line shadow-2xl shadow-pine/20">
                            <img
                                src={HERO_IMG}
                                alt="A spotless living room after a Homzy clean"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-pine/25 via-transparent to-transparent" />
                        </div>

                        {/* ₹79 chip */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.6,
                            }}
                            className="absolute -right-2 bottom-20 rounded-2xl bg-pine px-5 py-4 text-cream shadow-xl sm:-right-6"
                            data-testid="hero-rate-chip"
                        >
                            <p className="font-display text-3xl font-extrabold">
                                ₹79
                            </p>
                            <p className="text-xs font-semibold text-cream/70">
                                per hour · flat
                            </p>
                        </motion.div>

                        {/* rotating badge */}
                        <div className="absolute -bottom-8 left-6 hidden h-28 w-28 items-center justify-center rounded-full bg-wa shadow-xl shadow-pine/25 sm:flex">
                            <svg
                                viewBox="0 0 120 120"
                                className="absolute inset-0 h-full w-full animate-spin-slow"
                                aria-hidden="true"
                            >
                                <defs>
                                    <path
                                        id="badge-circle"
                                        d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                                    />
                                </defs>
                                <text
                                    className="fill-forest text-[10px] font-bold uppercase"
                                    letterSpacing="2.5"
                                >
                                    <textPath href="#badge-circle" textLength="274" lengthAdjust="spacingAndGlyphs">
                                        Booked on WhatsApp · ₹79/hr · Booked on WhatsApp ·
                                    </textPath>
                                </text>
                            </svg>
                            <SparkPath className="relative h-8 w-8 text-forest" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
