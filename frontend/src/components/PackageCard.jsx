import { Reveal } from "@/components/Reveal";
import { waLink } from "@/lib/whatsapp";

const PACKAGES = [
    {
        id: "1bhk",
        label: "1 BHK — full deep clean",
        price: "₹3,999",
        msg: "Hi Homzy! I want to book a Full Home Deep Clean — 1BHK (₹3,999). Please share your available slots.",
    },
    {
        id: "2bhk",
        label: "2 BHK — full deep clean",
        price: "₹4,499",
        msg: "Hi Homzy! I want to book a Full Home Deep Clean — 2BHK (₹4,499). Please share your available slots.",
    },
];

export default function PackageSection() {
    return (
        <section className="pb-20 lg:pb-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
                <Reveal>
                    <div
                        className="grid items-center gap-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pine to-forest p-8 text-cream shadow-2xl shadow-pine/25 sm:p-12 lg:grid-cols-2 lg:p-16"
                        data-testid="package-section"
                    >
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.25em] text-lime">
                                Full home packages
                            </p>
                            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                                One price.{" "}
                                <span className="font-serifit font-semibold text-lime">
                                    Whole home spotless.
                                </span>
                            </h2>
                            <p className="mt-5 max-w-md text-base leading-relaxed text-cream/75">
                                Kitchen, bathrooms, bedrooms and living areas —
                                every floor, corner and fixture. One flat rate,
                                no hourly meter running.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {PACKAGES.map((pkg) => (
                                <a
                                    key={pkg.id}
                                    href={waLink(pkg.msg)}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid={`package-${pkg.id}-btn`}
                                    className="group flex items-center justify-between gap-4 rounded-3xl border border-cream/15 bg-cream/5 p-6 transition-all duration-200 hover:border-lime/60 hover:bg-cream/10"
                                >
                                    <div>
                                        <p className="font-display text-lg font-bold sm:text-xl">
                                            {pkg.label}
                                        </p>
                                        <p className="mt-1 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-lime">
                                            Book on WhatsApp
                                        </p>
                                    </div>
                                    <p className="font-display text-3xl font-extrabold text-lime sm:text-4xl">
                                        {pkg.price}
                                    </p>
                                </a>
                            ))}
                            <p className="text-center text-xs font-medium text-cream/50">
                                Bigger home? Message us on WhatsApp for a
                                custom quote.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
