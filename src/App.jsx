import React, { useEffect, useRef, useState } from "react";

/**
 * LaunchGremlin — Production-ready interactive site
 */

/* ------------------ Hooks ------------------ */
const useScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const h = document.documentElement;
            const scrolled = h.scrollTop;
            const height = h.scrollHeight - h.clientHeight;
            setProgress(height ? scrolled / height : 0);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return progress;
};

/* ------------------ UI Primitives ------------------ */
const Card = ({ children, active }) => (
    <div
        className={`h-full bg-zinc-900 rounded-2xl border transition-all duration-700
      ${active
                ? "opacity-100 translate-y-0 border-emerald-400/60 shadow-[0_0_36px_rgba(16,185,129,0.45)]"
                : "opacity-0 translate-y-6 border-zinc-800 shadow-none"}`}
    >
        {children}
    </div>
);

/* ------------------ Background ------------------ */
const TimeDistortionBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        let raf;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        const particles = Array.from({ length: 140 }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.6,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(16,185,129,0.85)";
                ctx.shadowBlur = 18;
                ctx.shadowColor = "rgba(16,185,129,0.9)";
                ctx.fill();
            });

            raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
        />
    );
};

/* ------------------ Main App ------------------ */
export default function App() {
    const progress = useScrollProgress();
    const [activeStep, setActiveStep] = useState(0);
    const [activeSection, setActiveSection] = useState("hero");

    const heroRef = useRef(null);
    const workflowRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);

    /* Workflow scroll activation */
    useEffect(() => {
        if (!workflowRef.current) return;
        const steps = workflowRef.current.querySelectorAll('[data-step]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number(entry.target.getAttribute('data-step'));
                        setActiveStep(idx);
                    }
                });
            },
            { threshold: 0.6 }
        );
        steps.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    /* Section observer (header highlighting) */
    useEffect(() => {
        const sections = [
            { id: "hero", ref: heroRef },
            { id: "workflow", ref: workflowRef },
            { id: "team", ref: teamRef },
            { id: "contact", ref: contactRef },
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.4 }
        );

        sections.forEach(({ ref }) => ref.current && observer.observe(ref.current));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen text-white relative overflow-hidden bg-zinc-950">
            <div className="fixed inset-0 -z-40 bg-zinc-950" />

            <TimeDistortionBackground />

            <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-black/40 border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="/legacy_and_assets/web-icon-transparent.png"
                            alt="LaunchGremlin logo"
                            className="w-25 h-25 drop-shadow-[0_0_16px_rgba(16,185,129,0.9)]"
                        />
                        <span className="font-bold tracking-tight text-xl md:text-3xl">
                            Launch<span className="text-emerald-400">Gremlin</span>
                        </span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-l text-gray-300">
                        <a
                            href="#workflow"
                            className={`transition-colors duration-300 ${activeSection === "workflow"
                                ? "text-emerald-400 animate-pulse"
                                : "hover:text-emerald-400"
                                }`}
                        >
                            How It Works
                        </a>
                        <a
                            href="#team"
                            className={`transition-colors duration-300 ${activeSection === "team"
                                ? "text-emerald-400"
                                : "hover:text-emerald-400"
                                }`}
                        >
                            Team
                        </a>
                        <a
                            href="#contact"
                            className={`transition-colors duration-300 ${activeSection === "contact"
                                ? "text-emerald-400"
                                : "hover:text-emerald-400"
                                }`}
                        >
                            Contact
                        </a>
                    </nav>
                </div>
            </header>

            {/* Scroll progress */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-zinc-800 z-50">
                <div
                    className="h-full bg-emerald-400 transition-all duration-150"
                    style={{ width: `${progress * 100}%` }}
                />
            </div>

            {/* Hero */}
            <section
                ref={heroRef}
                id="hero"
                className="relative flex flex-col items-center justify-center text-center px-6 py-40 overflow-hidden min-h-screen"
            >
                {/* Gremlin watermark */}
                <img
                    src="/legacy_and_assets/web-icon.png"
                    alt="Gremlin watermark"
                    className="absolute inset-0 m-auto w-[520px] max-w-full opacity-[0.06] pointer-events-none select-none"
                />

                <h1 className="relative z-10 text-6xl md:text-8xl font-extrabold mb-8 animate-fade-up">
                    We use <span className="text-emerald-400 drop-shadow-[0_0_18px_rgba(16,185,129,0.9)]">AI</span> to do the busy work
                    <br />
                    so <span className="text-emerald-400 drop-shadow-[0_0_18px_rgba(16,185,129,0.9)]">humans</span> can build the future.
                </h1>
                <p className="relative z-10 text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-up [animation-delay:200ms]">
                    We build and compound ideas using AI as a force multiplier.
                </p>
            </section>

            {/* Workflow */}
            <section
                ref={workflowRef}
                id="workflow"
                className="relative px-6 py-32 max-w-6xl mx-auto"
            >
                <div className="grid md:grid-cols-4 gap-8 items-stretch">
                    {["Opportunity Discovery", "Market & Validation", "Build & Launch", "Scale & Growth"].map(
                        (title, i) => (
                            <div key={title} data-step={i}>
                                <Card active={activeStep >= i}>
                                    <div className="p-6 h-full flex flex-col">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="relative flex w-3 h-3">
                                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-pulse-slow" />
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]">
                                                    {activeStep >= i && (
                                                        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
                                                    )}
                                                </span>
                                            </span>
                                            <h3 className="text-xl font-semibold">{title}</h3>
                                        </div>
                                        <p className="text-gray-300 text-sm mb-6">
                                            {title === "Opportunity Discovery" && "AI scans markets and human behaviour."}
                                            {title === "Market & Validation" && "Agents stress‑test ideas before humans commit."}
                                            {title === "Build & Launch" && "Products are built fast with AI assistance."}
                                            {title === "Scale & Growth" && "Learning loops feed the next generation."}
                                        </p>
                                        <div className="mt-auto h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full w-1/3 bg-emerald-400/70 animate-flow"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )
                    )}
                </div>

                <p className="text-center text-xs text-gray-500 mt-16 tracking-widest uppercase">
                    Insights loop back · System continuously evolves
                </p>

                <div className="mt-12 flex justify-center relative">
                    <svg
                        className="absolute -top-32 left-1/2 -translate-x-1/2 pointer-events-none"
                        width="420"
                        height="160"
                        viewBox="0 0 420 160"
                        fill="none"
                    >
                        <path
                            d="M40 20 C 210 140, 210 140, 380 20"
                            stroke="rgba(16,185,129,0.35)"
                            strokeWidth="2"
                            strokeDasharray="6 10"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="0"
                                to="-200"
                                dur="6s"
                                repeatCount="indefinite"
                            />
                        </path>
                    </svg>

                    <div className="relative w-40 h-40 rounded-full border border-emerald-400/60 shadow-[0_0_24px_rgba(16,185,129,0.35)] flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-6 rounded-full border border-emerald-400/30 animate-[spin_6s_linear_infinite_reverse]" />
                        <span className="text-xs tracking-widest font-semibold text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.9)]">
                            COMPOUND
                        </span>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section
                ref={teamRef}
                id="team"
                className="relative px-6 py-32 max-w-4xl mx-auto text-center"
            >
                {/* Gremlin watermark */}
                <img
                    src="/legacy_and_assets/web-icon.png"
                    alt="Gremlin watermark"
                    className="absolute inset-0 m-auto w-[520px] max-w-full opacity-[0.06] pointer-events-none select-none"
                />
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Small team. <span className="text-emerald-400">Big leverage.</span>
                </h2>
                <p className="text-gray-300 text-lg max-w-5xl mx-auto">
                    LaunchGremlin is built by a lean, founder‑led team working alongside AI systems. We optimise for clarity of thought, speed of execution, and long‑term compounding.
                </p>
            </section>

            {/* Contact */}
            <section
                ref={contactRef}
                id="contact"
                className="relative px-6 py-32 max-w-5xl mx-auto text-center"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Get in touch</h2>
                <p className="text-gray-300 mb-8 text-lg">
                    Curious about what we’re building or want to collaborate?
                </p>
                <a
                    href="mailto:hello@launchgremlin.com"
                    className="inline-block px-10 py-4 rounded-xl border border-emerald-400 text-emerald-400 font-semibold hover:bg-emerald-400 hover:text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                >
                    Contact us
                </a>
            </section>

            <footer className="px-6 py-12 border-t border-zinc-800 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} LaunchGremlin · Durban, South Africa
            </footer>
        </div>
    );
}
