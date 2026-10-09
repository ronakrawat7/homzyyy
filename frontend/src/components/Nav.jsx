import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import WaGlyph from "@/components/WaGlyph";
import { useBooking } from "@/context/booking";
import { EASE } from "@/components/Reveal";

const LINKS = [
    { label: "Services", href: "#services" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
];

export default function Nav() {
    const { open } = useBooking();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "border-b border-line bg-cream/85 shadow-sm backdrop-blur-xl"
                    : "bg-transparent"
            }`}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 lg:h-20 lg:px-16">
                <a href="#top" data-testid="nav-logo" aria-label="Homzy home">
                    <Logo />
                </a>

                <div className="hidden items-center gap-8 lg:flex">
                    {LINKS.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                            className="text-sm font-semibold text-pine/75 transition-colors hover:text-leaf"
                        >
                            {l.label}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => open()}
                        data-testid="nav-book-btn"
                        className="hidden items-center gap-2 rounded-full bg-wa px-5 py-2.5 font-display text-sm font-bold text-forest shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:inline-flex"
                    >
                        <WaGlyph className="h-4 w-4" />
                        Book on WhatsApp
                    </button>
                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        data-testid="nav-menu-btn"
                        aria-label="Toggle menu"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white/80 text-pine lg:hidden"
                    >
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        className="overflow-hidden border-b border-line bg-cream/95 backdrop-blur-xl lg:hidden"
                    >
                        <div className="space-y-1 px-4 py-4 sm:px-8">
                            {LINKS.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    onClick={() => setMobileOpen(false)}
                                    data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                                    className="block rounded-xl px-3 py-3 font-display text-lg font-bold text-pine transition-colors hover:bg-mintbg"
                                >
                                    {l.label}
                                </a>
                            ))}
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    open();
                                }}
                                data-testid="nav-mobile-book-btn"
                                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-wa px-5 py-3.5 font-display text-base font-bold text-forest"
                            >
                                <WaGlyph className="h-5 w-5" />
                                Book on WhatsApp
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
