import React, { useRef } from "react";
import "./styles/WhatIDo.css";
import { lenis } from "./Navbar";

export interface WhatIDoItem {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  chips: string[];
  featured: { name: string; url?: string }[];
}

export const WHAT_I_DO_DATA: WhatIDoItem[] = [
  {
    num: "01",
    title: "AI / ML & GenAI",
    subtitle: "LLMs, RAG & Computer Vision",
    description:
      "I build AI products on top of LLM APIs - RAG chatbots, AI agents, prompt-engineered workflows, and real-time computer vision with pose tracking.",
    chips: [
      "Groq",
      "Gemini",
      "MiniMax",
      "RAG",
      "Prompt Engineering",
      "AI Agents",
      "MediaPipe",
    ],
    featured: [
      { name: "Optima AI", url: "https://sml-code-optimiser.vercel.app" },
      { name: "ARQuest", url: "https://arquest-kunal.vercel.app" },
      { name: "PivotVault", url: "https://pivot-vault.vercel.app" },
    ],
  },
  {
    num: "02",
    title: "Frontend & 3D",
    subtitle: "Interactive Web & Spatial Experiences",
    description:
      "Fast, responsive interfaces and immersive 3D visualizations that make complex ideas easy to explore.",
    chips: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "TypeScript",
      "Three.js",
    ],
    featured: [
      { name: "PathForge AI", url: "https://pathforgeai.vercel.app" },
      { name: "Locentra", url: "https://locentra.vercel.app" },
      { name: "EduCore", url: "https://educore-tau.vercel.app" },
    ],
  },
  {
    num: "03",
    title: "Backend & Data",
    subtitle: "APIs, Auth & Databases",
    description:
      "Clean REST APIs and data layers that power real, deployed apps - from realtime dashboards to code-execution sandboxes.",
    chips: [
      "Node.js",
      "Express",
      "FastAPI",
      "Prisma",
      "Firebase",
      "Supabase",
      "PostgreSQL",
    ],
    featured: [
      { name: "Saras AI", url: "https://saras-ai.vercel.app" },
      { name: "Ascend", url: "https://ascend-eta-ruby.vercel.app" },
    ],
  },
  {
    num: "04",
    title: "Open Source & Dev Workflow",
    subtitle: "Building in Public",
    description:
      "Open-source contributor at Vicharanashala, IIT Ropar, shipping learning tools through GitHub pull requests, reviews and collaboration.",
    chips: ["Git", "GitHub", "Linux", "VS Code", "Vercel", "DSA"],
    featured: [
      { name: "Tenali", url: "https://github.com/Vicharanashala/tenali" },
      {
        name: "Yaksha AI",
        url: "https://github.com/Vicharanashala/yaksha-backend",
      },
      { name: "OBLIQ website", url: "https://obliq.in" },
    ],
  },
];

const getCardIcon = (num: string) => {
  switch (num) {
    case "01":
      return (
        <svg
          className="what-card-icon-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
      );
    case "02":
      return (
        <svg
          className="what-card-icon-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m21 16-9 5-9-5V8l9-5 9 5v8z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 12v9.5" />
        </svg>
      );
    case "03":
      return (
        <svg
          className="what-card-icon-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );
    case "04":
    default:
      return (
        <svg
          className="what-card-icon-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <path d="M6 9v12" />
          <path d="M18 9a9 9 0 0 1-9 9" />
          <circle cx="18" cy="6" r="3" />
        </svg>
      );
  }
};

const WhatIDo = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Subtle 3D tilt on mousemove
  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5.5;
    const rotateY = ((x - centerX) / centerX) * 5.5;

    card.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    card.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  // Scroll to Work section or open project
  const handleProjectClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url?: string
  ) => {
    // If user holds cmd/ctrl or url is external and wants new tab, allow native
    if (e.metaKey || e.ctrlKey) return;

    e.preventDefault();
    const workSection = document.querySelector(".work-section") as HTMLElement;
    if (workSection) {
      if (lenis) {
        lenis.scrollTo(workSection, { offset: 0, duration: 1.2 });
      } else {
        workSection.scrollIntoView({ behavior: "smooth" });
      }
    } else if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="whatIDO" id="what-i-do" aria-label="What I Do">
      <div className="what-box what-header-box">
        <h2 className="title what-title">
          W<span className="hat-h2">HAT</span>
          <div className="what-title-sub">
            &nbsp;I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      <div className="what-box what-cards-box">
        <div className="what-box-in">
          <div className="what-cards-grid" role="list">
            {WHAT_I_DO_DATA.map((item, index) => (
              <div
                key={item.num}
                ref={(el) => (cardsRef.current[index] = el)}
                className="what-card"
                role="listitem"
                tabIndex={0}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{ animationDelay: `${0.1 + index * 0.12}s` }}
              >
                {/* Big faded index in corner */}
                <span className="what-card-num" aria-hidden="true">
                  {item.num}
                </span>

                {/* Card Top: Icon + Title + Subtitle */}
                <div className="what-card-header">
                  <div className="what-card-title-row">
                    <div className="what-card-icon">{getCardIcon(item.num)}</div>
                    <h3 className="what-card-title">{item.title}</h3>
                  </div>
                  <div className="what-card-subtitle">{item.subtitle}</div>
                </div>

                {/* Card Body: Description */}
                <p className="what-card-desc">{item.description}</p>

                {/* Tech Chips */}
                <div
                  className="what-card-chips"
                  aria-label={`Technologies for ${item.title}`}
                >
                  {item.chips.map((chip) => (
                    <span key={chip} className="what-chip">
                      {chip}
                    </span>
                  ))}
                </div>

                {/* Featured Projects */}
                <div className="what-card-featured">
                  <span className="what-featured-label">Featured:</span>
                  <div className="what-featured-links">
                    {item.featured.map((proj) => (
                      <a
                        key={proj.name}
                        href={proj.url || "#work"}
                        className="what-featured-link"
                        onClick={(e) => handleProjectClick(e, proj.url)}
                        title={`View ${proj.name} in Work section`}
                      >
                        <span>{proj.name}</span>
                        <svg
                          className="what-featured-arrow"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
