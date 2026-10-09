import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, className = "", once = true }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.15 }}
            transition={{ duration: 0.7, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}

export function MaskedLines({ lines, delay = 0, stagger = 0.13, className = "" }) {
    return (
        <span className={`block ${className}`}>
            {lines.map((line, i) => (
                <span
                    key={i}
                    className="block overflow-hidden pb-[0.09em] -mb-[0.09em]"
                >
                    <motion.span
                        className="block will-change-transform"
                        initial={{ y: "112%" }}
                        animate={{ y: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: delay + i * stagger,
                            ease: EASE,
                        }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
