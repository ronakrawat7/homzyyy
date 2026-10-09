export const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER;

export const waLink = (text) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const WA_DEFAULT_MSG =
    "Hi Homzy! I want to book home help at ₹79/hr. Please share your available slots.";

export const bookingMessage = (b) =>
    [
        "Hi Homzy! New booking request:",
        `• Service: ${b.service}`,
        `• Hours: ${b.hours}`,
        `• When: ${b.date} at ${b.time}`,
        `• Area: ${b.area}`,
        `• Name: ${b.name}`,
        b.note ? `• Note: ${b.note}` : null,
    ]
        .filter(Boolean)
        .join("\n");
