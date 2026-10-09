import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import WaGlyph from "@/components/WaGlyph";
import { useBooking } from "@/context/booking";
import { waLink, bookingMessage } from "@/lib/whatsapp";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SERVICES = [
    "Hourly house help",
    "Kitchen deep clean",
    "Bathroom sanitation",
    "Utensils & laundry",
    "Dusting & mopping",
    "Sofa cleaning",
    "Balcony cleaning",
];
const TIMES = [
    "08:00 AM",
    "10:00 AM",
    "12:00 PM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM",
];

const todayISO = () => new Date().toISOString().slice(0, 10);

const fmtDate = (d) => {
    try {
        return new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
    } catch {
        return d;
    }
};

const inputCls =
    "w-full rounded-xl border border-line bg-cream/60 px-4 py-3 text-sm font-medium text-pine outline-none transition placeholder:text-bark/50 focus:border-leaf focus:ring-2 focus:ring-leaf/30";
const labelCls =
    "mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-bark";

export default function BookingModal() {
    const { prefill, open, close } = useBooking();
    const isOpen = prefill !== null;

    const [form, setForm] = useState({
        name: "",
        phone: "",
        service: SERVICES[0],
        hours: 3,
        date: todayISO(),
        time: TIMES[1],
        area: "",
        note: "",
    });
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (prefill) {
            setForm((f) => ({
                ...f,
                service: prefill.service || f.service,
                hours: prefill.hours || f.hours,
            }));
        }
    }, [prefill]);

    const set = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const submit = (e) => {
        e.preventDefault();
        const digits = form.phone.replace(/\D/g, "");
        if (!form.name.trim() || digits.length < 10 || !form.area.trim()) {
            toast.error("Please add your name, a valid phone number and your area.");
            return;
        }

        const msg = bookingMessage({
            name: form.name.trim(),
            service: form.service,
            hours: form.hours,
            date: fmtDate(form.date),
            time: form.time,
            area: form.area.trim(),
            note: form.note.trim(),
        });

        const win = window.open(waLink(msg), "_blank");
        if (!win) {
            toast.error(
                "Pop-up blocked — allow pop-ups or tap the WhatsApp bubble at the bottom right."
            );
        } else {
            toast.success("Opening WhatsApp with your booking…");
        }

        setSending(true);
        axios
            .post(`${API}/bookings`, {
                name: form.name.trim(),
                phone: digits,
                service: form.service,
                hours: Number(form.hours),
                preferred_date: form.date,
                preferred_time: form.time,
                area: form.area.trim(),
                note: form.note.trim() || null,
            })
            .catch(() => console.error("booking log failed"))
            .finally(() => setSending(false));

        close();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(v) => !v && close()}>
            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl border-line bg-white p-6 sm:max-w-lg sm:p-8">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl font-extrabold tracking-tight text-pine">
                        Book your{" "}
                        <span className="font-serifit font-semibold text-leaf">
                            homzy
                        </span>{" "}
                        moment
                    </DialogTitle>
                    <DialogDescription className="text-sm text-bark">
                        Fill this in — it opens WhatsApp with your booking
                        ready to send.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={submit} data-testid="booking-form" className="mt-5 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="bk-name" className={labelCls}>
                                Your name
                            </label>
                            <input
                                id="bk-name"
                                data-testid="booking-input-name"
                                className={inputCls}
                                placeholder="Riya Sharma"
                                value={form.name}
                                onChange={set("name")}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="bk-phone" className={labelCls}>
                                WhatsApp number
                            </label>
                            <input
                                id="bk-phone"
                                data-testid="booking-input-phone"
                                className={inputCls}
                                placeholder="98765 43210"
                                type="tel"
                                value={form.phone}
                                onChange={set("phone")}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <span className={labelCls}>Service</span>
                        <div className="flex flex-wrap gap-2">
                            {SERVICES.map((s) => (
                                <button
                                    type="button"
                                    key={s}
                                    onClick={() =>
                                        setForm((f) => ({ ...f, service: s }))
                                    }
                                    data-testid={`booking-service-chip-${s.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                                    className={`rounded-full px-3.5 py-2 text-xs font-bold transition-all duration-150 sm:text-sm ${
                                        form.service === s
                                            ? "bg-pine text-cream"
                                            : "bg-mintbg text-pine hover:bg-line"
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                            <label htmlFor="bk-hours" className={labelCls}>
                                Hours
                            </label>
                            <select
                                id="bk-hours"
                                data-testid="booking-select-hours"
                                className={inputCls}
                                value={form.hours}
                                onChange={set("hours")}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
                                    <option key={h} value={h}>
                                        {h} hr · ₹{(h * 79).toLocaleString("en-IN")}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="bk-date" className={labelCls}>
                                Date
                            </label>
                            <input
                                id="bk-date"
                                data-testid="booking-input-date"
                                type="date"
                                min={todayISO()}
                                className={inputCls}
                                value={form.date}
                                onChange={set("date")}
                            />
                        </div>
                        <div>
                            <label htmlFor="bk-time" className={labelCls}>
                                Time
                            </label>
                            <select
                                id="bk-time"
                                data-testid="booking-select-time"
                                className={inputCls}
                                value={form.time}
                                onChange={set("time")}
                            >
                                {TIMES.map((t) => (
                                    <option key={t}>{t}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="bk-area" className={labelCls}>
                            Your area / locality
                        </label>
                        <input
                            id="bk-area"
                            data-testid="booking-input-area"
                            className={inputCls}
                            placeholder="Adajan, Vesu, City Light, Mota Varachha…"
                            value={form.area}
                            onChange={set("area")}
                            list="area-options"
                            required
                        />
                        <datalist id="area-options">
                            <option value="Adajan" />
                            <option value="Vesu" />
                            <option value="City Light" />
                            <option value="Mota Varachha" />
                        </datalist>
                    </div>

                    <div>
                        <label htmlFor="bk-note" className={labelCls}>
                            Anything specific? (optional)
                        </label>
                        <textarea
                            id="bk-note"
                            data-testid="booking-input-note"
                            className={`${inputCls} min-h-[72px] resize-none`}
                            placeholder="Focus on the kitchen, bring a mop for tiles…"
                            value={form.note}
                            onChange={set("note")}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={sending}
                        data-testid="booking-submit-btn"
                        className="flex w-full items-center justify-center gap-2.5 rounded-full bg-wa px-6 py-4 font-display text-base font-bold text-forest shadow-lg shadow-wa/25 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
                    >
                        <WaGlyph className="h-5 w-5" />
                        Open WhatsApp & send booking
                    </button>
                    <p className="text-center text-xs font-medium text-bark">
                        We'll confirm your pro and slot on WhatsApp shortly.
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}
