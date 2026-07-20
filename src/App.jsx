import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import AdminDashboard, { AdminLogin } from "./components/AdminDashboard";
import { 
    User, Mail, Building, Calendar, Target, Check, 
    ChevronRight, Sparkles, AlertCircle, Copy
} from "lucide-react";

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
const Card = ({ children, active, onClick, className = "" }) => (
    <div
        onClick={onClick}
        className={`group h-full bg-zinc-900 rounded-2xl border transition-all duration-500 will-change-transform ${onClick ? "cursor-pointer hover:border-emerald-400/80 hover:shadow-[0_0_36px_rgba(16,185,129,0.25)] hover:-translate-y-1.5" : ""}
      ${active
                ? "opacity-100 translate-y-0 border-emerald-400/60 shadow-[0_0_36px_rgba(16,185,129,0.35)]"
                : "opacity-0 translate-y-6 border-zinc-800 shadow-none"} ${className}`}
    >
        {children}
    </div>
);

Card.propTypes = {
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

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

/* ------------------ Maintenance View ------------------ */
const MaintenanceView = () => (
    <div className="min-h-screen text-white relative overflow-hidden bg-zinc-950 flex flex-col items-center justify-center px-6 text-center">
        <TimeDistortionBackground />
        <div className="fixed inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />

        <div className="relative z-20 max-w-xl mx-auto p-8 md:p-12 rounded-3xl bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/80 shadow-[0_20px_60px_rgba(0,0,0,0.7)] animate-scale-up">
            <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 mb-6 shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <img
                    src="./legacy_and_assets/web-icon.png"
                    alt="LaunchGremlin logo"
                    width="48"
                    height="48"
                    className="w-12 h-12 object-contain mix-blend-screen"
                />
            </div>
            
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                System <span className="text-emerald-400">Upgrading</span>
            </h1>
            
            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                LaunchGremlin is currently undergoing scheduled maintenance &amp; system enhancements. We&apos;ll be back online shortly with improved AI capabilities.
            </p>

            <div className="flex items-center justify-center gap-3 px-4 py-3 bg-zinc-950/60 rounded-xl border border-zinc-800 text-xs font-mono text-emerald-400 max-w-xs mx-auto">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Status: Maintenance in progress</span>
            </div>
        </div>

        <footer className="relative z-20 mt-12 text-xs text-gray-600">
            © {new Date().getFullYear()} LaunchGremlin · Systems Operations
        </footer>
    </div>
);

/* ------------------ Main App ------------------ */
export default function App() {
    const progress = useScrollProgress();
    const [activeStep, setActiveStep] = useState(0);
    const [activeSection, setActiveSection] = useState("hero");

    const [leadName, setLeadName] = useState("");
    const [leadEmail, setLeadEmail] = useState("");
    const [leadCompany, setLeadCompany] = useState("");
    const [selectedService, setSelectedService] = useState("");
    const [serviceDetails, setServiceDetails] = useState({});
    const [additionalNotes, setAdditionalNotes] = useState("");
    const [challenge, setChallenge] = useState("");
    const [timeline, setTimeline] = useState("");
    const [budget, setBudget] = useState("");
    const [onboardingStep, setOnboardingStep] = useState(0);
    const [generatedGuide, setGeneratedGuide] = useState("");
    const [sending, setSending] = useState(false);
    const [leadStatus, setLeadStatus] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [copiedPreview, setCopiedPreview] = useState(false);
    const [activeOnboardingService, setActiveOnboardingService] = useState(null);

    const openServiceOnboarding = (serviceTitle) => {
        setSelectedService(serviceTitle);
        setActiveOnboardingService(serviceTitle);
        setServiceDetails({});
        setOnboardingStep(0);
        setFormErrors({});
        setLeadStatus("");
    };

    const copyPreviewToClipboard = () => {
        const guideText = generatedGuide || createProjectGuide();
        navigator.clipboard.writeText(guideText);
        setCopiedPreview(true);
        setTimeout(() => setCopiedPreview(false), 2000);
    };

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

    // Configuration for service-specific questions
    const serviceQuestions = {
        "Website Development": [
            {
                id: "websiteType",
                label: "What type of website do you need?",
                type: "select",
                options: [
                    "Landing Page (Single page)",
                    "Corporate Website (Multi-page)",
                    "E-commerce Store (Products/Payments)",
                    "Blog / Portfolio Website",
                    "Custom Web Application"
                ],
                placeholder: "Select website type"
            },
            {
                id: "featuresNeeded",
                label: "Required features & integrations",
                type: "text",
                placeholder: "e.g., Contact forms, newsletter signup, payment gateway, SEO setup"
            },
            {
                id: "designStyle",
                label: "Do you have design preferences or example sites?",
                type: "text",
                placeholder: "e.g., Minimalist, modern, dark theme. Examples: stripe.com, apple.com"
            }
        ],
        "Build Your First Product": [
            {
                id: "targetAudience",
                label: "Who is the target audience for this product?",
                type: "text",
                placeholder: "e.g., Small business owners, gym enthusiasts, college students"
            },
            {
                id: "coreFeature",
                label: "What is the single most important feature (MVP)?",
                type: "text",
                placeholder: "e.g., Users must be able to log and track their workouts daily"
            },
            {
                id: "platformType",
                label: "Preferred platform",
                type: "select",
                options: [
                    "Web Application (desktop & mobile browser)",
                    "Mobile App (iOS & Android stores)",
                    "Desktop Software (Windows & macOS)",
                    "Browser Extension"
                ],
                placeholder: "Select platform"
            }
        ],
        "AI Consulting": [
            {
                id: "timeConsumingProcess",
                label: "What manual workflow takes the most time in your business?",
                type: "text",
                placeholder: "e.g., Replying to customer emails, writing content, summarising documents"
            },
            {
                id: "desiredOutcome",
                label: "What is your main goal with AI?",
                type: "select",
                options: [
                    "Reduce operational costs / save time",
                    "Improve response times for customers",
                    "Generate marketing copy / content",
                    "Extract structured insights from files/data"
                ],
                placeholder: "Select primary goal"
            },
            {
                id: "internalData",
                label: "Do you have internal data you want the AI to learn from?",
                type: "text",
                placeholder: "e.g., Customer support logs, PDF manuals, product documentation"
            }
        ],
        "Data Analytics": [
            {
                id: "dataSource",
                label: "Where is your data currently stored?",
                type: "text",
                placeholder: "e.g., PostgreSQL database, Salesforce, Google Sheets, Stripe"
            },
            {
                id: "keyMetrics",
                label: "What are the key metrics you want to track?",
                type: "text",
                placeholder: "e.g., CAC, LTV, monthly recurring revenue (MRR), user retention"
            },
            {
                id: "visualizationPreference",
                label: "How do you want to view the data?",
                type: "select",
                options: [
                    "Looker Studio / PowerBI / Tableau dashboard",
                    "Custom built React dashboard / charts",
                    "Automated weekly PDF reports via email",
                    "Simple Excel / Google Sheets dashboard"
                ],
                placeholder: "Select preferred viewing format"
            }
        ],
        "AI Agent Implementation": [
            {
                id: "agentRole",
                label: "What specific role or task should the agent perform?",
                type: "text",
                placeholder: "e.g., Qualify leads, draft email replies, answer product FAQs"
            },
            {
                id: "interactionChannel",
                label: "Where should the agent live/interact?",
                type: "select",
                options: [
                    "Website Chat Widget",
                    "Email Inbox (auto-responder)",
                    "WhatsApp / Telegram / SMS",
                    "Slack / Microsoft Teams (internal)"
                ],
                placeholder: "Select integration channel"
            },
            {
                id: "knowledgeBase",
                label: "What knowledge source should the agent use?",
                type: "text",
                placeholder: "e.g., Our public help center documentation, FAQ list"
            }
        ]
    };

    const getCombinedSummary = () => {
        const questions = serviceQuestions[selectedService] || [];
        let summaryText = "";
        questions.forEach(q => {
            const val = serviceDetails[q.id] || "";
            if (val) {
                summaryText += `${q.label}:\n👉 ${val}\n\n`;
            }
        });
        if (additionalNotes.trim()) {
            summaryText += `Additional Project Notes:\n${additionalNotes.trim()}`;
        }
        return summaryText.trim();
    };

    // Simple Hash-based Router state
    const [route, setRoute] = useState(window.location.hash || "#/");
    const [adminToken, setAdminToken] = useState(localStorage.getItem("launchgremlin_admin_token") || "");

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash || "#/");
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // Render Admin Views if path is #/admin
    if (route === "#/admin" || route.startsWith("#/admin")) {
        if (!adminToken) {
            return (
                <AdminLogin 
                    onLoginSuccess={(token) => setAdminToken(token)} 
                />
            );
        }
        return (
            <AdminDashboard 
                token={adminToken} 
                onLogout={() => {
                    localStorage.removeItem("launchgremlin_admin_token");
                    setAdminToken("");
                    window.location.hash = "#/";
                }} 
            />
        );
    }

    // Maintenance Mode Toggle (Set to true to put public website under maintenance)
    const IS_MAINTENANCE_MODE = true;

    if (IS_MAINTENANCE_MODE) {
        return <MaintenanceView />;
    }



    const createProjectGuide = () => {
        const combinedSummary = getCombinedSummary();
        if (!combinedSummary) {
            return "Please select a service and fill in the project specs to generate your guide.";
        }

        const questions = serviceQuestions[selectedService] || [];
        let detailsBlock = "";
        questions.forEach(q => {
            const answer = serviceDetails[q.id] || "—";
            detailsBlock += `- **${q.label}**: ${answer}\n`;
        });
        if (additionalNotes.trim()) {
            detailsBlock += `- **Additional Notes**: ${additionalNotes.trim()}\n`;
        }

        const timelineText = timeline ? `Target Timeline: ${timeline}.` : "Timeline: Flexible.";
        const budgetText = budget ? `Target Budget: ${budget}.` : "Budget: Unspecified.";

        const roadmaps = {
            "Website Development": [
                "1. Design Discovery: Select colour themes, typography, and wireframe the home page layout.",
                "2. Static Build: Develop high-performance responsive page components with Tailwind CSS.",
                "3. Dynamic Integrations: Connect contact forms, content management (CMS), and SEO optimisation.",
                "4. Launch & DNS: Connect custom domains, configure CDN caching, and submit sitemaps to Google."
            ],
            "Build Your First Product": [
                "1. MVP Core Spec: Define the single most important user flow and slice off non-essential features.",
                "2. Core Database & Auth: Setup database schemas, user authentication, and secure API routes.",
                "3. Frontend Interface: Create functional views, onboarding screens, and interactive user actions.",
                "4. Feedback Loop: Deploy a beta version to test with early users and capture key usage metrics."
            ],
            "AI Consulting": [
                "1. Process Audit: Identify the highest-ROI opportunities to integrate AI in your daily workflows.",
                "2. Tech Stack Selection: Evaluate model choices (OpenAI, Anthropic, open-source) and cost profiles.",
                "3. Prompt & RAG Prototyping: Build prototype prompts and load test documents to check response quality.",
                "4. Integration Plan: Map out developer resources and security boundaries for deploying to production."
            ],
            "Data Analytics": [
                "1. Data Audit: Inventory existing tools (CRM, DBs, Google Analytics) and verify API access keys.",
                "2. ETL / Sync Setup: Setup automated pipelines to aggregate data into a single queryable source.",
                "3. Dashboard Modelling: Draft mockups of key performance indicator (KPI) widgets and filter views.",
                "4. Team Access: Launch the custom charts/dashboard and train team members on reading metrics."
            ],
            "AI Agent Implementation": [
                "1. Role & Persona Definition: Define the agent's tone, instructions, constraints, and success criteria.",
                "2. Tool & API Connectivity: Allow the agent to call necessary external tools (e.g., search documents, schedule meetings).",
                "3. Chat/Channel Deploy: Embed the widget on the site, connect the email webhook, or set up the WhatsApp gateway.",
                "4. Performance Monitoring: Review conversation transcripts, add custom corrections, and refine prompts."
            ]
        };

        const steps = roadmaps[selectedService] || [
            "1. Discovery and assumptions: define the core need, the target audience, and the simplest path forward.",
            "2. Build the first version: choose the simplest useful experience, key screens, and core actions.",
            "3. Add smart tools or automations: identify practical workflows, integrations, and simple AI helpers.",
            "4. Track what matters: capture useful metrics, review results, and improve the experience.",
            "5. Launch and refine: put something real in front of users, gather feedback, and improve it."
        ];

        return `LaunchGremlin Customised Project Guide\n` +
            `Service: ${selectedService || "Digital Development"}\n` +
            `Client / Company: ${leadCompany || "Your Company"}\n\n` +
            `========================================\n` +
            `1. PROJECT SPECS\n` +
            `========================================\n` +
            `${detailsBlock}\n` +
            `- **Main Challenge**: ${challenge || "Not specified"}\n` +
            `- **${timelineText}**\n` +
            `- **${budgetText}**\n\n` +
            `========================================\n` +
            `2. TAILORED ROADMAP\n` +
            `========================================\n` +
            `${steps.join('\n')}\n\n` +
            `========================================\n` +
            `3. RECOMMENDED NEXT STEPS\n` +
            `========================================\n` +
            `- Review the suggested roadmap above to align on core milestones.\n` +
            `- Schedule a 15-minute discovery call to finalise scope details.\n` +
            `- Get a formal fixed-price proposal and project agreement.`;
    };



    const guidePreview = generatedGuide || createProjectGuide();

    const validateStep = (step) => {
        const errors = {};

        if (step === 0) {
            if (!leadName.trim()) errors.leadName = "Enter your name.";
            if (leadEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail.trim())) {
                errors.leadEmail = "Enter a valid email address.";
            }
            if (!selectedService) errors.selectedService = "Choose the service you need.";
        }

        if (step === 1) {
            const questions = serviceQuestions[selectedService] || [];
            questions.forEach(q => {
                const val = serviceDetails[q.id] || "";
                if (!val.trim()) {
                    errors[q.id] = `Please complete: ${q.label}`;
                }
            });
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
            summary: getCombinedSummary(),
            service: selectedService,
            challenge: challenge.trim(),
            timeline: timeline.trim(),
            budget: budget.trim(),
            guide: createProjectGuide(),
        };

        try {
            let API_URL = import.meta.env.VITE_API_URL;
            let hasBackend = Boolean(API_URL);
            if (!API_URL) {
                const port = window.location.port;
                if (port && ["5173", "5174", "5175", "3000"].includes(port)) {
                    API_URL = "http://localhost:5000/api";
                    hasBackend = true;
                }
            }
            
            if (hasBackend) {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 6000);
                
                const response = await fetch(`${API_URL}/leads`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);

                const contentType = response.headers.get("content-type") || "";
                if (!response.ok || !contentType.includes("application/json")) {
                    console.warn("Backend API response not valid JSON or failed.");
                }
            }

            // Save lead locally in the browser as backup cache
            const existingLeads = JSON.parse(localStorage.getItem("launchgremlin_leads") || "[]");
            existingLeads.push({
                ...payload,
                created_at: new Date().toISOString(),
                id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)
            });
            localStorage.setItem("launchgremlin_leads", JSON.stringify(existingLeads));

            setGeneratedGuide(payload.guide);
            setLeadStatus("Project guide generated successfully — details saved!");
        } catch (error) {
            console.error("Backend save failed:", error);
            
            // Fallback: save locally anyway so customer isn't blocked
            const existingLeads = JSON.parse(localStorage.getItem("launchgremlin_leads") || "[]");
            existingLeads.push({
                ...payload,
                created_at: new Date().toISOString(),
                id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2)
            });
            localStorage.setItem("launchgremlin_leads", JSON.stringify(existingLeads));
            
            setGeneratedGuide(payload.guide);
            
            if (error.name === "AbortError") {
                setLeadStatus("Project guide generated — saved locally (backend timeout).");
            } else {
                setLeadStatus(`Project guide generated — saved locally (backend offline).`);
            }
        } finally {
            setSending(false);
        }
    };



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
                            width="40"
                            height="40"
                            className="w-10 h-10 object-contain shrink-0 mix-blend-screen"
                        />
                        <span className="font-bold tracking-tight text-xl md:text-2xl">
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

            <section
                ref={heroRef}
                id="hero"
                className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden min-h-[85vh]"
            >
                {/* Gremlin watermark */}
                <img
                    src="./legacy_and_assets/web-icon.png"
                    alt="Gremlin watermark"
                    className="absolute inset-0 m-auto w-[520px] max-w-full opacity-[0.06] pointer-events-none select-none"
                />

                <h1 className="relative z-10 text-6xl md:text-8xl font-extrabold mb-6 animate-fade-up">
                    Build smarter. Launch faster.
                </h1>
                <p className="relative z-10 text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-up [animation-delay:200ms]">
                    LaunchGremlin helps founders and teams move from idea to launch with simple digital products and AI-powered growth.
                </p>
                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-fade-up [animation-delay:300ms]">
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-8 py-4 text-sm font-semibold text-black shadow-[0_0_25px_rgba(16,185,129,0.22)] transition hover:bg-emerald-300"
                    >
                        Start Building
                    </a>
                    <a
                        href="#workflow"
                        className="inline-flex items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 px-8 py-4 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-300"
                    >
                        See What We Offer
                    </a>
                </div>
            </section>

            <section
                ref={workflowRef}
                id="workflow"
                className="relative px-6 py-20 max-w-6xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">
                    What we offer
                </h2>
                <p className="text-center text-gray-400 max-w-3xl mx-auto mb-10">
                    A product-first studio for founders who want useful digital products, faster launches, and AI-enabled growth.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
                    {[
                        {
                            title: "Website Development",
                            description: "Build a clean, fast website that helps your business look sharp and get found.",
                            icon: "Zap",
                            tags: ["Fast", "Professional", "Mobile-ready"],
                        },
                        {
                            title: "Data Analytics",
                            description: "Turn your numbers into clear insights so you can make better decisions.",
                            icon: "TrendingUp",
                            tags: ["Reports", "Insights", "Tracking"],
                        },
                        {
                            title: "Build Your First Product",
                            description: "Get your first product or tool off the ground without overthinking it.",
                            icon: "Rocket",
                            tags: ["Simple", "Practical", "Launch-ready"],
                        },
                        {
                            title: "AI Consulting",
                            description: "Get straight advice on where AI can save time in your business.",
                            icon: "Brain",
                            tags: ["Practical", "Clear", "Useful"],
                        },
                        {
                            title: "AI Agent Implementation",
                            description: "Set up simple AI helpers and automations that take work off your plate.",
                            icon: "Cpu",
                            tags: ["Helpful", "Time-saving", "Smart"],
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
                                <Card 
                                    active={activeStep >= i}
                                    onClick={() => openServiceOnboarding(service.title)}
                                    className="p-6 h-full flex flex-col justify-between gap-6 hover:border-emerald-400/80"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-3 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                                                    <IconComponent className="w-8 h-8" />
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                                                    {service.title}
                                                </h3>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                                        </div>
                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            {service.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-block px-3 py-1 text-xs md:text-sm font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 rounded-full transition-colors duration-200"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                                            <span>Start Interactive Onboarding</span>
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                <p className="text-center text-base text-gray-300 max-w-2xl mx-auto mt-10">
                    We help founders move fast, build what matters, and create digital products that launch with momentum.
                </p>

                <p className="text-center text-xs text-gray-500 mt-8 tracking-widest uppercase">
                    Built for speed, clarity, and product impact
                </p>
            </section>

            <section
                ref={teamRef}
                id="team"
                className="relative px-6 py-20 max-w-4xl mx-auto text-center"
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
                    LaunchGremlin is built by people who like getting things moving. We partner with founders and teams to create practical products and digital tools that help ideas gain traction.
                </p>
            </section>

            <section
                ref={contactRef}
                id="contact"
                className="relative px-6 py-20 max-w-5xl mx-auto text-center"
            >
                <div className="p-10 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Ready to launch your product?
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        Click any service card above or start an interactive project spec in under 60 seconds.
                    </p>
                    <button
                        onClick={() => openServiceOnboarding("Website Development")}
                        type="button"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-400 text-black font-bold text-base shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:bg-emerald-300 transition-all duration-300 hover:scale-105"
                    >
                        Start Interactive Spec →
                    </button>
                </div>
            </section>

            {/* Seamless Interactive Service Onboarding Modal */}
            {activeOnboardingService && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-up">
                    <div className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden my-auto animate-scale-up">
                        {/* Modal Header */}
                        <div className="bg-zinc-900/80 px-6 py-5 border-b border-zinc-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="p-2 rounded-xl bg-emerald-400/10 border border-emerald-400/30 text-emerald-400">
                                    <Sparkles className="w-5 h-5" />
                                </span>
                                <div>
                                    <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">Interactive Service Onboarding</span>
                                    <h3 className="text-xl font-bold text-white leading-tight">{activeOnboardingService}</h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setActiveOnboardingService(null)}
                                type="button"
                                className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-gray-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Subheader Stepper */}
                        <div className="bg-zinc-900/40 px-6 py-3 border-b border-zinc-800 flex items-center justify-between text-xs font-medium text-gray-400">
                            <div className="flex items-center gap-4 sm:gap-6">
                                <span className={onboardingStep === 0 ? "text-emerald-400 font-bold" : "text-gray-400"}>1. Your Info</span>
                                <span className="text-gray-600">→</span>
                                <span className={onboardingStep === 1 ? "text-emerald-400 font-bold" : "text-gray-400"}>2. Project Specs</span>
                                <span className="text-gray-600">→</span>
                                <span className={onboardingStep === 2 ? "text-emerald-400 font-bold" : "text-gray-400"}>3. Review & Submit</span>
                            </div>
                            <span className="text-emerald-400 font-mono text-[11px] bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                                Step {onboardingStep + 1} of 3
                            </span>
                        </div>

                        {/* Modal Body Grid */}
                        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-h-[75vh] overflow-y-auto custom-scrollbar">
                            {/* Left Column: Form Controls */}
                            <div className="lg:col-span-7 space-y-6">
                                {onboardingStep === 0 && (
                                    <div className="grid gap-6 sm:grid-cols-2 animate-slide-fade-in">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="leadName" className="text-sm text-gray-300 font-medium">Your name</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    id="leadName"
                                                    type="text"
                                                    value={leadName}
                                                    onChange={(event) => setLeadName(event.target.value)}
                                                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-900/50 border text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 ${
                                                        formErrors.leadName ? "border-rose-500/80 animate-shake" : "border-zinc-800"
                                                    }`}
                                                    placeholder="Jane Doe"
                                                />
                                            </div>
                                            {formErrors.leadName && (
                                                <span className="text-xs text-rose-400 flex items-center gap-1.5 mt-1 animate-shake">
                                                    <AlertCircle className="w-4 h-4" /> {formErrors.leadName}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="leadEmail" className="text-sm text-gray-300 font-medium">Email address <span className="text-xs text-gray-500 font-normal">(optional)</span></label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    id="leadEmail"
                                                    type="email"
                                                    value={leadEmail}
                                                    onChange={(event) => setLeadEmail(event.target.value)}
                                                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-900/50 border text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 ${
                                                        formErrors.leadEmail ? "border-rose-500/80 animate-shake" : "border-zinc-800"
                                                    }`}
                                                    placeholder="jane@company.com"
                                                />
                                            </div>
                                            {formErrors.leadEmail && (
                                                <span className="text-xs text-rose-400 flex items-center gap-1.5 mt-1 animate-shake">
                                                    <AlertCircle className="w-4 h-4" /> {formErrors.leadEmail}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2 sm:col-span-2">
                                            <label htmlFor="leadCompany" className="text-sm text-gray-300 font-medium">Company or product name</label>
                                            <div className="relative">
                                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                <input
                                                    id="leadCompany"
                                                    type="text"
                                                    value={leadCompany}
                                                    onChange={(event) => setLeadCompany(event.target.value)}
                                                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300"
                                                    placeholder="e.g., Acme Corp"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {onboardingStep === 1 && (
                                    <div className="grid gap-6 animate-slide-fade-in">
                                        {(serviceQuestions[selectedService] || []).map((q) => (
                                            <div key={q.id} className="flex flex-col gap-2">
                                                <label className="text-sm font-medium text-gray-300">{q.label}</label>
                                                {q.type === "select" ? (
                                                    <div className="relative">
                                                        <select
                                                            value={serviceDetails[q.id] || ""}
                                                            onChange={(e) => setServiceDetails(prev => ({ ...prev, [q.id]: e.target.value }))}
                                                            className={`w-full px-4 py-3.5 rounded-2xl bg-zinc-900/50 border text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 ${
                                                                formErrors[q.id] ? "border-rose-500/80 animate-shake" : "border-zinc-800"
                                                            }`}
                                                        >
                                                            <option value="">{q.placeholder}</option>
                                                            {q.options.map(opt => (
                                                                <option key={opt} value={opt}>{opt}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            value={serviceDetails[q.id] || ""}
                                                            onChange={(e) => setServiceDetails(prev => ({ ...prev, [q.id]: e.target.value }))}
                                                            placeholder={q.placeholder}
                                                            className={`w-full px-4 py-3.5 rounded-2xl bg-zinc-900/50 border text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 ${
                                                                formErrors[q.id] ? "border-rose-500/80 animate-shake" : "border-zinc-800"
                                                            }`}
                                                        />
                                                    </div>
                                                )}
                                                {formErrors[q.id] && (
                                                    <span className="text-xs text-rose-400 flex items-center gap-1.5 mt-1 animate-shake">
                                                        <AlertCircle className="w-4 h-4" /> {formErrors[q.id]}
                                                    </span>
                                                )}
                                            </div>
                                        ))}

                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="challenge" className="text-sm text-gray-300 font-medium">Main challenge</label>
                                                <div className="relative">
                                                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                    <input
                                                        id="challenge"
                                                        type="text"
                                                        value={challenge}
                                                        onChange={(event) => setChallenge(event.target.value)}
                                                        className={`w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-900/50 border text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300 ${
                                                            formErrors.challenge ? "border-rose-500/80 animate-shake" : "border-zinc-800"
                                                        }`}
                                                        placeholder="E.g. automate onboarding, validate product-market fit"
                                                    />
                                                </div>
                                                {formErrors.challenge && (
                                                    <span className="text-xs text-rose-400 flex items-center gap-1.5 mt-1 animate-shake">
                                                        <AlertCircle className="w-4 h-4" /> {formErrors.challenge}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="timeline" className="text-sm text-gray-300 font-medium">Timeline / urgency</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                                    <input
                                                        id="timeline"
                                                        type="text"
                                                        value={timeline}
                                                        onChange={(event) => setTimeline(event.target.value)}
                                                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300"
                                                        placeholder="e.g. 2–4 weeks"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-6 sm:grid-cols-2">
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="budget" className="text-sm text-gray-300 font-medium">Estimated Budget (ZAR)</label>
                                                <input
                                                    id="budget"
                                                    type="text"
                                                    value={budget}
                                                    onChange={(event) => setBudget(event.target.value)}
                                                    className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300"
                                                    placeholder="e.g. R10,000 – R35,000"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label htmlFor="additionalNotes" className="text-sm text-gray-300 font-medium">Additional Notes (optional)</label>
                                                <input
                                                    id="additionalNotes"
                                                    type="text"
                                                    value={additionalNotes}
                                                    onChange={(event) => setAdditionalNotes(event.target.value)}
                                                    className="w-full px-4 py-3.5 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-sm text-white focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.25)] transition-all duration-300"
                                                    placeholder="e.g. integration requests, design links"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {onboardingStep === 2 && (
                                    <div className="space-y-6 animate-slide-fade-in">
                                        <div className="rounded-2xl border border-emerald-400/20 bg-zinc-900/80 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
                                            <p className="text-xs uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2 font-mono">
                                                <Sparkles className="w-4 h-4" /> Confirm & Submit
                                            </p>
                                            <div className="grid gap-3 text-xs text-gray-300">
                                                <div>
                                                    <span className="font-semibold text-white block mb-0.5">Contact Details</span>
                                                    <p className="text-gray-300">{leadName || "—"}{leadEmail ? <span className="text-emerald-300"> · {leadEmail}</span> : ""}</p>
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-white block mb-0.5">Selected Service</span>
                                                    <p className="text-emerald-400 font-semibold">{selectedService}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-900">
                                    {onboardingStep > 0 && (
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            className="px-6 py-3.5 rounded-xl border border-zinc-800 text-gray-300 hover:text-white hover:border-zinc-700 text-xs font-semibold transition"
                                        >
                                            ← Back
                                        </button>
                                    )}
                                    {onboardingStep < 2 && (
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="flex-1 px-6 py-3.5 rounded-xl bg-emerald-400 text-black font-semibold text-xs shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:bg-emerald-300 transition"
                                        >
                                            Continue →
                                        </button>
                                    )}
                                    {onboardingStep === 2 && (
                                        <button
                                            type="button"
                                            onClick={submitLead}
                                            disabled={sending}
                                            className="flex-1 px-6 py-3.5 rounded-xl bg-emerald-400 text-black font-bold text-xs shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:bg-emerald-300 transition disabled:opacity-50"
                                        >
                                            {sending ? "Generating..." : "Submit Project Spec →"}
                                        </button>
                                    )}
                                </div>
                                {leadStatus && (
                                    <p className="text-xs text-emerald-400 p-3 bg-emerald-400/10 border border-emerald-400/20 rounded-xl">
                                        {leadStatus}
                                    </p>
                                )}
                            </div>

                            {/* Right Column: Terminal Guide Preview */}
                            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-0">
                                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-xl">
                                    <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                                            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                                            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                                            <span className="text-xs text-gray-500 font-mono ml-2">guide_preview.md</span>
                                        </div>
                                        <button
                                            onClick={copyPreviewToClipboard}
                                            type="button"
                                            className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 py-1 px-2.5 rounded-lg border border-emerald-400/20 hover:bg-emerald-400/10 transition"
                                        >
                                            {copiedPreview ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                            {copiedPreview ? "Copied" : "Copy"}
                                        </button>
                                    </div>
                                    <div className="p-5 max-h-[340px] overflow-y-auto custom-scrollbar font-mono text-xs leading-6 text-gray-200">
                                        <pre className="whitespace-pre-wrap break-words">{guidePreview}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <footer className="px-6 py-8 border-t border-zinc-800 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} LaunchGremlin
            </footer>
        </div>
    );
}
