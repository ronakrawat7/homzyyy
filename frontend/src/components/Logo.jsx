export function SparkPath({ className = "h-4 w-4" }) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="currentColor">
            <path d="M32 4c2.6 17.6 10.4 25.4 28 28-17.6 2.6-25.4 10.4-28 28-2.6-17.6-10.4-25.4-28-28 17.6-2.6 25.4-10.4 28-28Z" />
        </svg>
    );
}

export function SparkMark({ className = "h-9 w-9" }) {
    return (
        <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
            <rect width="64" height="64" rx="16" fill="#0F382C" />
            <path d="M32 12 52 30h-7v20H19V30h-7L32 12Z" fill="#10B981" />
            <path
                d="M32 30c1 5.4 3.6 8 9 9-5.4 1-8 3.6-9 9-1-5.4-3.6-8-9-9 5.4-1 8-3.6 9-9Z"
                fill="#F4F9F5"
            />
        </svg>
    );
}

export default function Logo({ light = false, className = "" }) {
    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <SparkMark className="h-9 w-9" />
            <span
                className={`font-display text-2xl font-extrabold tracking-tight ${
                    light ? "text-cream" : "text-pine"
                }`}
            >
                homzy
                <span className="text-lime">.</span>
            </span>
        </span>
    );
}
