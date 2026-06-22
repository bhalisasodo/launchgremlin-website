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
        className={`group h-full bg-zinc-900 rounded-2xl border transition-all duration-500 will-change-transform
      ${active
                ? "opacity-100 translate-y-0 border-emerald-400/60 shadow-[0_0_36px_rgba(16,185,129,0.35)] hover:-translate-y-1 hover:shadow-[0_0_36px_rgba(16,185,129,0.18)]"
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

    const [leadName, setLeadName] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [leadCompany, setLeadCompany] = useState("");
    const [leadSummary, setLeadSummary] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [challenge, setChallenge] = useState("");
    const [timeline, setTimeline] = useState("");
    const [budget, setBudget] = useState("");
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [generatedGuide, setGeneratedGuide] = useState("");
    const [sending, setSending] = useState(false);
    const [leadStatus, setLeadStatus] = useState("");

    const heroRef = useRef(null);
    const workflowRef = useRef(null);
    const teamRef = useRef(null);
    const contactRef = useRef(null);

    const createProjectGuide = () => {
        if (!leadSummary.trim()) {
            return "Enter your idea or project details above to see the guide generated here.";
        }

        return `Project guide for ${leadCompany || "your business"} \n\n` +
            `Overview:\n` +
            `${leadSummary.trim()}\n\n` +
            `Primary focus:\n` +
            `${selectedService || "AI product"} — ${challenge || "define the core challenge and target outcome."}\n\n` +
            `Timeline & budget:\n` +
            `${timeline || "Flexible timeline."} ${budget ? `Budget: ${budget}.` : "Budget not specified."}\n\n` +
            `Objective:\n` +
            `Turn this concept into a launch-ready AI product with clear milestones, target outcomes, and a lean execution plan.\n\n` +
            `Suggested roadmap:\n` +
            `1. Discovery and assumptions: define user needs, success criteria, and AI value props.\n` +
            `2. MVP design: choose the smallest viable core experience, UI flows, and data inputs.\n` +
            `3. AI automation and agent architecture: identify automation workflows, integration points, and agent roles.\n` +
            `4. Data and analytics: capture metrics, build dashboards, and validate model outputs.\n` +
            `5. Launch and iteration: deploy a lightweight pilot, gather feedback, and refine the next version.\n\n` +
            `Next steps:\n` +
            `- Validate the opportunity with a short discovery sprint.\n` +
            `- Build the first real MVP using AI-assisted development.\n` +
            `- Use analytics to measure traction and improve the product.\n\n` +
            `Contact details:\n` +
            `${leadName ? `Name: ${leadName}\n` : ""}` +
            `${leadEmail ? `Email: ${leadEmail}\n` : ""}`;
    };

    const [formErrors, setFormErrors] = useState({});

    const guidePreview = generatedGuide || createProjectGuide();

    const validateStep = (step) => {
        const errors = {};

        if (step === 0) {
            if (!leadName.trim()) errors.leadName = "Enter your name.";
            if (!leadEmail.trim()) {
                errors.leadEmail = "Enter your email.";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
                errors.leadEmail = "Enter a valid email address.";
            }
            if (!selectedService) errors.selectedService = "Choose the service you need.";
        }

        if (step === 1) {
            if (!leadSummary.trim()) errors.leadSummary = "Describe your idea or product.";
            if (!challenge.trim()) errors.challenge = "Share your main challenge.";
        }

        return errors;
    };

    const validateAll = () => {
        return {
            ...validateStep(0),
            ...validateStep(1),
        };
    };

    const handleNext = () => {
        const errors = validateStep(onboardingStep);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});
        setOnboardingStep((current) => Math.min(2, current + 1));
    };

    const handleBack = () => {
        setFormErrors({});
        setOnboardingStep((current) => Math.max(0, current - 1));
    };

    const submitLead = async () => {
        setLeadStatus("");
        const errors = validateAll();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            setLeadStatus("Please fix the highlighted fields before sending.");
            return;
        }

        setFormErrors({});
        setSending(true);
        const payload = {
            name: leadName.trim(),
            email: leadEmail.trim(),
            company: leadCompany.trim(),
            summary: leadSummary.trim(),
            service: selectedService,
            challenge: challenge.trim(),
            timeline: timeline.trim(),
            budget: budget.trim(),
            guide: createProjectGuide(),
        };

        try {
            const response = await fetch("/api/lead", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data?.message || "Unable to send lead.");
            }

            setGeneratedGuide(data.guide || payload.guide);
            setLeadStatus("Lead sent successfully — we’ll follow up shortly.");
        } catch (error) {
            setLeadStatus(`Error sending lead: ${error.message}`);
        } finally {
            setSending(false);
        }
    };

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
                            src="./legacy_and_assets/web-icon.png"
                            alt="LaunchGremlin logo"
                            width="56"
                            height="56"
                            className="object-contain"
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
                            Services
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
                    src="./legacy_and_assets/web-icon.png"
                    alt="Gremlin watermark"
                    className="absolute inset-0 m-auto w-[520px] max-w-full opacity-[0.06] pointer-events-none select-none"
                />

                <h1 className="relative z-10 text-6xl md:text-8xl font-extrabold mb-8 animate-fade-up">
                    AI automation, startup MVPs, and agent systems for ambitious founders.
                </h1>
                <p className="relative z-10 text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-up [animation-delay:200ms]">
                    LaunchGremlin sits at the intersection of AI and startup product execution. We move fast on AI automation builds, MVP development, AI consulting, data analytics projects, and autonomous agent implementation.
                </p>
            </section>

            {/* Services */}
            <section
                ref={workflowRef}
                id="workflow"
                className="relative px-6 py-32 max-w-6xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                    What we offer
                </h2>
                <p className="text-center text-gray-400 max-w-3xl mx-auto mb-14">
                    A founder-led studio for AI and startup-adjacent challenges. We move quickly from concept to delivery across automation, products, analytics, and autonomous systems.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
                    {[
                        {
                            title: "AI Automation Builds",
                            description: "Automate workflows, content, and systems with AI.",
                            icon: "Zap",
                            tags: ["Workflow", "Integration", "Optimization"],
                        },
                        {
                            title: "Startup MVP Development",
                            description: "Launch high-velocity, product-ready MVPs.",
                            icon: "Rocket",
                            tags: ["Rapid Build", "Launch Ready", "Scalable"],
                        },
                        {
                            title: "AI Consulting",
                            description: "Strategic AI guidance for product direction and execution.",
                            icon: "Brain",
                            tags: ["Strategy", "Roadmap", "Execution"],
                        },
                        {
                            title: "Data Analytics Projects",
                            description: "Insight-driven analytics and performance pipelines.",
                            icon: "TrendingUp",
                            tags: ["Real-time", "Insights", "Performance"],
                        },
                        {
                            title: "AI Agent Implementation",
                            description: "Design and deploy autonomous AI agents.",
                            icon: "Cpu",
                            tags: ["Autonomous", "Intelligent", "24/7"],
                        },
                    ].map((service, i) => {
                        const IconComponent = {
                            Zap: (props) => (
                                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            ),
                            Rocket: (props) => (
                                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l-2 2m0 0L5 9l5.5 5.5L14 14l4 4-3.5 1.5L9 19z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3.5 3.5L14 12" />
                                </svg>
                            ),
                            Brain: (props) => (
                                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5c-3.59 0-6.5 2.91-6.5 6.5 0 1.5.5 2.87 1.34 3.98L5 17.5l3 2.5 1.5-2.5h4l1.5 2.5 3-2.5-1.84-2.52A6.48 6.48 0 0018.5 11c0-3.59-2.91-6.5-6.5-6.5z" />
                                </svg>
                            ),
                            TrendingUp: (props) => (
                                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17l6-6 4 4 8-8" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 7h7v7" />
                                </svg>
                            ),
                            Cpu: (props) => (
                                <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <rect x="6" y="6" width="12" height="12" rx="2" ry="2" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m16-6h2m-2 6h2" />
                                </svg>
                            ),
                        }[service.icon] || (() => null);

                        return (
                            <div key={service.title} data-step={i} className={i >= 3 ? "xl:col-start-2" : ""}>
                                <Card active={activeStep >= i}>
                                    <div className="p-6 h-full flex flex-col justify-between gap-6">
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                                                    <IconComponent className="w-8 h-8" />
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                                                    {service.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {service.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-block px-3 py-1 text-xs md:text-sm font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-full transition-colors duration-200 hover:bg-emerald-400/15"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-base text-gray-300 max-w-2xl mx-auto mt-10">
                    We help founders accelerate AI product execution with automation, rapid MVP development, analytics insight, and autonomous systems.
                </p>

                <p className="text-center text-xs text-gray-500 mt-8 tracking-widest uppercase">
                    Designed for AI-first founders · Built to move fast
                </p>
            </section>

            {/* Team */}
            <section
                ref={teamRef}
                id="team"
                className="relative px-6 py-32 max-w-4xl mx-auto text-center"
            >
                {/* Gremlin watermark */}
                <img
                    src="./legacy_and_assets/web-icon.png"
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
                className="relative px-6 py-32 max-w-6xl mx-auto"
            >
                <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] items-start">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-bold">
                                Launch your idea with a guided onboarding flow.
                            </h2>
                            <p className="text-gray-400 text-lg max-w-3xl">
                                Move through a quick onboarding wizard, refine your idea, and generate a shareable project guide before submitting the lead.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex flex-wrap items-center gap-2">
                                {[
                                    { label: "Contact", step: 0 },
                                    { label: "Project", step: 1 },
                                    { label: "Review", step: 2 },
                                ].map(({ label, step }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={() => setOnboardingStep(step)}
                                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                                            onboardingStep === step
                                                ? "border-emerald-400 bg-emerald-400/10 text-emerald-200"
                                                : "border-zinc-800 bg-zinc-900 text-gray-400 hover:border-emerald-400 hover:text-emerald-300"
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                            <div className="text-sm text-gray-500">
                                Step {onboardingStep + 1} of 3
                            </div>
                        </div>

                        {onboardingStep === 0 && (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="flex flex-col text-sm text-gray-300">
                                    Your name
                                    <input
                                        type="text"
                                        value={leadName}
                                        onChange={(event) => setLeadName(event.target.value)}
                                        className={`mt-2 px-4 py-3 rounded-2xl bg-zinc-900 border text-white focus:outline-none focus:border-emerald-400 ${
                                            formErrors.leadName ? "border-rose-500" : "border-zinc-800"
                                        }`}
                                        placeholder="Jane Doe"
                                    />
                                    {formErrors.leadName && (
                                        <span className="text-xs text-rose-400 mt-2">{formErrors.leadName}</span>
                                    )}
                                </label>
                                <label className="flex flex-col text-sm text-gray-300">
                                    Email address
                                    <input
                                        type="email"
                                        value={leadEmail}
                                        onChange={(event) => setLeadEmail(event.target.value)}
                                        className={`mt-2 px-4 py-3 rounded-2xl bg-zinc-900 border text-white focus:outline-none focus:border-emerald-400 ${
                                            formErrors.leadEmail ? "border-rose-500" : "border-zinc-800"
                                        }`}
                                        placeholder="jane@company.com"
                                    />
                                    {formErrors.leadEmail && (
                                        <span className="text-xs text-rose-400 mt-2">{formErrors.leadEmail}</span>
                                    )}
                                </label>
                                <label className="flex flex-col text-sm text-gray-300 sm:col-span-2">
                                    Company or product name
                                    <input
                                        type="text"
                                        value={leadCompany}
                                        onChange={(event) => setLeadCompany(event.target.value)}
                                        className="mt-2 px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400"
                                        placeholder="LaunchGremlin Labs"
                                    />
                                </label>
                                <label className="flex flex-col text-sm text-gray-300 sm:col-span-2">
                                    Primary service you're interested in
                                    <select
                                        value={selectedService}
                                        onChange={(event) => setSelectedService(event.target.value)}
                                        className={`mt-2 px-4 py-3 rounded-2xl bg-zinc-900 border text-white focus:outline-none focus:border-emerald-400 ${
                                            formErrors.selectedService ? "border-rose-500" : "border-zinc-800"
                                        }`}
                                    >
                                        <option value="">Select a service</option>
                                        <option value="AI Automation Builds">AI Automation Builds</option>
                                        <option value="Startup MVP Development">Startup MVP Development</option>
                                        <option value="AI Consulting">AI Consulting</option>
                                        <option value="Data Analytics Projects">Data Analytics Projects</option>
                                        <option value="AI Agent Implementation">AI Agent Implementation</option>
                                    </select>
                                    {formErrors.selectedService && (
                                        <span className="text-xs text-rose-400 mt-2">{formErrors.selectedService}</span>
                                    )}
                                </label>
                            </div>
                        )}

                        {onboardingStep === 1 && (
                            <div className="grid gap-4">
                                <label className="flex flex-col text-sm text-gray-300">
                                    Idea or project summary
                                    <textarea
                                        value={leadSummary}
                                        onChange={(event) => setLeadSummary(event.target.value)}
                                        className={`mt-2 min-h-[150px] px-4 py-3 rounded-2xl bg-zinc-900 border text-white focus:outline-none focus:border-emerald-400 resize-none ${
                                            formErrors.leadSummary ? "border-rose-500" : "border-zinc-800"
                                        }`}
                                        placeholder="Describe the project, target users, desired outcome, and any AI or startup goals."
                                    />
                                    {formErrors.leadSummary && (
                                        <span className="text-xs text-rose-400 mt-2">{formErrors.leadSummary}</span>
                                    )}
                                </label>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="flex flex-col text-sm text-gray-300">
                                        Main challenge
                                        <input
                                            type="text"
                                            value={challenge}
                                            onChange={(event) => setChallenge(event.target.value)}
                                            className={`mt-2 px-4 py-3 rounded-2xl bg-zinc-900 border text-white focus:outline-none focus:border-emerald-400 ${
                                                formErrors.challenge ? "border-rose-500" : "border-zinc-800"
                                            }`}
                                            placeholder="E.g. automate onboarding, validate product-market fit"
                                        />
                                        {formErrors.challenge && (
                                            <span className="text-xs text-rose-400 mt-2">{formErrors.challenge}</span>
                                        )}
                                    </label>
                                    <label className="flex flex-col text-sm text-gray-300">
                                        Timeline / urgency
                                        <input
                                            type="text"
                                            value={timeline}
                                            onChange={(event) => setTimeline(event.target.value)}
                                            className="mt-2 px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400"
                                            placeholder="E.g. 6 weeks, ASAP, Q4 launch"
                                        />
                                    </label>
                                </div>
                                <label className="flex flex-col text-sm text-gray-300">
                                    Budget context (optional)
                                    <input
                                        type="text"
                                        value={budget}
                                        onChange={(event) => setBudget(event.target.value)}
                                        className="mt-2 px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-emerald-400"
                                        placeholder="E.g. early-stage, pre-seed, flexible"
                                    />
                                </label>
                            </div>
                        )}

                        {onboardingStep === 2 && (
                            <div className="space-y-6">
                                <div className="rounded-3xl border border-emerald-400/20 bg-zinc-900/80 p-6">
                                    <p className="text-sm uppercase tracking-[0.25em] text-emerald-400 mb-3">Review & confirm</p>
                                    <div className="grid gap-3 text-sm text-gray-300">
                                        <div>
                                            <span className="font-semibold text-white">Contact</span>
                                            <p>{leadName || "—"} · {leadEmail || "—"}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-white">Service</span>
                                            <p>{selectedService || "—"}</p>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-white">Summary</span>
                                            <p>{leadSummary || "—"}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">
                                    You can adjust any field by going back. When you are ready, generate the final guide and send your request.
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            {onboardingStep > 0 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-zinc-800 text-gray-300 hover:border-emerald-400 hover:text-emerald-300 transition"
                                >
                                    Back
                                </button>
                            )}
                            {onboardingStep < 2 && (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-emerald-400 text-black font-semibold shadow-[0_0_25px_rgba(16,185,129,0.22)] hover:bg-emerald-300 transition"
                                >
                                    Continue
                                </button>
                            )}
                            {onboardingStep === 2 && (
                                <button
                                    type="button"
                                    onClick={submitLead}
                                    disabled={sending}
                                    className="inline-flex items-center justify-center px-8 py-4 rounded-2xl bg-emerald-400 text-black font-semibold shadow-[0_0_25px_rgba(16,185,129,0.22)] hover:bg-emerald-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {sending ? "Sending…" : "Send request"}
                                </button>
                            )}
                        </div>
                        {leadStatus && (
                            <p className="text-sm mt-3 text-gray-200">{leadStatus}</p>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-950/80 p-8 shadow-[0_0_35px_rgba(0,0,0,0.4)]">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">AI project guide</p>
                                    <h3 className="text-2xl font-semibold mt-2">Instant preview</h3>
                                </div>
                                <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-300">
                                    Real-time
                                </span>
                            </div>
                            <pre className="whitespace-pre-wrap break-words text-sm leading-6 text-gray-200">{guidePreview}</pre>
                        </div>
                        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900/80 p-6 text-sm text-gray-400">
                            <p className="font-semibold text-gray-200 mb-3">Why this works</p>
                            <ul className="space-y-2 list-disc list-inside">
                                <li>Collects lead details and idea context in one place.</li>
                                <li>Creates a structured, shareable plan without extra setup.</li>
                                <li>Supports faster follow-up from LaunchGremlin with a built-in brief.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="px-6 py-12 border-t border-zinc-800 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} LaunchGremlin · Durban, South Africa
            </footer>
        </div>
    );
}
