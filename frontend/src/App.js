import React, { useEffect } from "react";
import Lenis from "lenis";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { BookingProvider } from "@/context/booking";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Bento from "@/components/Bento";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Promise from "@/components/Promise";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Fab from "@/components/Fab";
import BookingModal from "@/components/BookingModal";
import PackageSection from "@/components/PackageCard";
import "@/App.css";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-cream p-8 text-center">
                    <div>
                        <p className="font-display text-2xl font-bold text-pine">
                            Something went wrong.
                        </p>
                        <p className="mt-2 text-bark">
                            Refresh the page to try again.
                        </p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

function SmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.1, anchors: true });
        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, []);
    return null;
}

function App() {
    return (
        <ErrorBoundary>
            <BookingProvider>
                <BrowserRouter>
                    <SmoothScroll />
                    <div
                        id="top"
                        className="min-h-screen overflow-x-clip bg-cream font-body text-pine"
                    >
                        <Nav />
                        <main>
                            <Hero />
                            <Marquee />
                            <Bento />
                            <PackageSection />
                            <HowItWorks />
                            <Pricing />
                            <Promise />
                            <Faq />
                        </main>
                        <Footer />
                        <Fab />
                        <BookingModal />
                        <Toaster position="top-center" richColors />
                    </div>
                </BrowserRouter>
            </BookingProvider>
        </ErrorBoundary>
    );
}

export default App;
