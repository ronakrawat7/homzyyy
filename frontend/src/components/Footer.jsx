import Logo from "@/components/Logo";
import WaGlyph from "@/components/WaGlyph";
import TermsButton from "@/components/TermsButton";
import { Reveal } from "@/components/Reveal";
import { useBooking } from "@/context/booking";
import { waLink, WA_DEFAULT_MSG } from "@/lib/whatsapp";

export default function Footer() {
    const { open } = useBooking();

    return (
        <footer className="bg-pine text-cream">
            <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-8 lg:px-16 lg:pt-28">
                <Reveal className="mx-auto max-w-3xl text-center">
                    <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
                        Ready for the{" "}
                        <span className="font-serifit font-semibold text-lime">
                            homzy
                        </span>{" "}
                        touch?
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-cream/70 sm:text-lg">
                        One WhatsApp message. That's the whole process.
                    </p>
                    <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => open()}
                            data-testid="footer-book-btn"
                            className="inline-flex items-center gap-2.5 rounded-full bg-wa px-8 py-4 font-display text-lg font-bold text-forest shadow-lg shadow-wa/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            <WaGlyph className="h-5 w-5" />
                            Book on WhatsApp
                        </button>
                        <a
                            href={waLink(WA_DEFAULT_MSG)}
                            target="_blank"
                            rel="noreferrer"
                            data-testid="footer-direct-wa-link"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-cream/20 px-8 py-4 font-display text-lg font-bold text-cream transition-colors duration-200 hover:border-cream/50"
                        >
                            Open chat directly
                        </a>
                    </div>
                </Reveal>

                <div className="mt-14 flex justify-center">
                    <TermsButton
                        testid="footer-terms-link"
                        className="text-sm font-semibold text-cream/60 underline-offset-4 transition-colors duration-200 hover:text-lime hover:underline"
                    />
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-cream/10 pt-8 sm:flex-row">
                    <Logo light />
                    <p className="text-sm font-medium text-cream/60 text-center">
                        Serving Surat · Adajan · Vesu · City Light · Mota
                        Varachha
                    </p>
                    <p className="text-sm font-medium text-cream/60">
                        © {new Date().getFullYear()} Homzy
                    </p>
                </div>
            </div>
        </footer>
    );
}
