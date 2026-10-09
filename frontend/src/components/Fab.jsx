import { motion } from "framer-motion";
import WaGlyph from "@/components/WaGlyph";
import { waLink, WA_DEFAULT_MSG } from "@/lib/whatsapp";

export default function Fab() {
    return (
        <motion.a
            href={waLink(WA_DEFAULT_MSG)}
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            data-testid="fab-whatsapp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
            whileHover={{ scale: 1.08 }}
            className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-xl shadow-pine/30"
        >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wa opacity-30" />
            <WaGlyph className="relative h-7 w-7" />
        </motion.a>
    );
}
