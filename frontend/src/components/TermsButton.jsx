import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

const TERMS = [
    {
        h: "1. Bookings & confirmation",
        p: "All bookings are made through WhatsApp (+91 74868 75335). A booking is confirmed only after we reply and assign a slot. Slots are subject to availability.",
    },
    {
        h: "2. Pricing & payment",
        p: "Hourly help and add-on services are charged at a flat ₹79 per hour, per professional. Full home deep clean packages are fixed at ₹3,999 (1BHK) and ₹4,499 (2BHK). Payment is collected after the service is completed, via UPI or cash.",
    },
    {
        h: "3. Cancellations & rescheduling",
        p: "You can reschedule or cancel free of charge by messaging us on WhatsApp before the professional begins the job. Cancellations after arrival may be charged one hour (₹79).",
    },
    {
        h: "4. Access & preparation",
        p: "Please provide water and electricity access and secure valuables before the slot. Our professionals carry basic cleaning supplies; specific product preferences can be arranged via WhatsApp.",
    },
    {
        h: "5. Damage & liability",
        p: "Report any concern or damage within 24 hours of the service on WhatsApp, with photos. Our liability, if any, is limited to the value of the service booked.",
    },
    {
        h: "6. Service areas",
        p: "We currently serve Adajan, Vesu, City Light and Mota Varachha in Surat. Requests outside these areas are subject to confirmation.",
    },
    {
        h: "7. Contact",
        p: "For anything at all, message us on WhatsApp at +91 74868 75335 — a human replies.",
    },
];

export default function TermsButton({
    className = "",
    label = "Terms & Conditions",
    testid = "terms-button",
}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                data-testid={testid}
                className={className}
            >
                {label}
            </button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-h-[85vh] overflow-y-auto rounded-3xl border-line bg-white p-6 sm:max-w-xl sm:p-8">
                    <DialogHeader>
                        <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-pine">
                            Terms &{" "}
                            <span className="font-serifit font-semibold text-leaf">
                                conditions
                            </span>
                        </DialogTitle>
                        <DialogDescription className="text-sm text-bark">
                            The short, plain-language version — written for
                            humans, not lawyers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-2 space-y-5">
                        {TERMS.map((t) => (
                            <div key={t.h}>
                                <h3 className="font-display text-base font-bold text-pine">
                                    {t.h}
                                </h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-bark">
                                    {t.p}
                                </p>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
