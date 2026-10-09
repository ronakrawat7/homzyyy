import { createContext, useCallback, useContext, useState } from "react";

const BookingCtx = createContext(null);

export function BookingProvider({ children }) {
    const [prefill, setPrefill] = useState(null);
    const open = useCallback((pre = {}) => setPrefill(pre || {}), []);
    const close = useCallback(() => setPrefill(null), []);
    return (
        <BookingCtx.Provider value={{ prefill, open, close }}>
            {children}
        </BookingCtx.Provider>
    );
}

export const useBooking = () => useContext(BookingCtx);
