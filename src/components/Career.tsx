import "./styles/Career.css";

export interface ExperienceItem {
  position: string;
  company: string;
  isRemote?: boolean;
  status: "CURRENT" | "COMPLETED";
  yearLabel: string;
  dates: string;
  bullets: string[];
}

export const CAREER_EXPERIENCES: ExperienceItem[] = [
  {
    company: "OBLIQ",
    position: "Open-Source Developer",
    status: "CURRENT",
    yearLabel: "NOW",
    dates: "2025 - Present",
    bullets: [
      "Contributing to OBLIQ's website project through the organization's public GitHub repositories.",
      "Working in a collaborative pull-request workflow.",
    ],
  },
  {
    company: "Vicharanashala, IIT Ropar",
    position: "Open-Source & AI Development Intern",
    isRemote: true,
    status: "COMPLETED",
    yearLabel: "2026",
    dates: "May 2026 - Jul 2026",
    bullets: [
      "Contributed to open-source learning and community platforms, including Tenali (a mathematics quiz platform) and crowd-source-faq.",
      "Built interactive Bayes' Theorem and Normal Distribution learning modules using the MiniMax API, plus an animated Tenali Raman mascot system with multiple emotion states.",
      "Designed and submitted Yaksha AI, a FAQ portal concept with a 3D knowledge graph, a Groq-powered RAG chatbot, and participation-focused gamification.",
    ],
  },
  {
    company: "IBM",
    position: "Intern",
    status: "COMPLETED",
    yearLabel: "2026",
    dates: "2026",
    bullets: ["Completed an IBM internship program."],
  },
];

const Career = () => {
  return (
    <section
      className="career-section section-container"
      id="career"
      aria-label="My career and experience"
    >
      <div className="career-container">
        <h2 className="career-heading">
          My career <span>&</span>
          <br /> experience
        </h2>

        <div className="career-info">
          {/* Background track line and GSAP animated fill line */}
          <div className="career-timeline-track" aria-hidden="true" />
          <div className="career-timeline" aria-hidden="true" />

          {CAREER_EXPERIENCES.map((exp, index) => {
            const isCurrent = exp.status === "CURRENT";
            return (
              <div
                key={index}
                className={`career-info-box ${isCurrent ? "career-box-current" : ""}`}
                role="article"
                aria-label={`${exp.position} at ${exp.company}`}
              >
                {/* Column 1: Title + Company + Tags + Dates */}
                <div className="career-role-col">
                  <h4 className="career-position">{exp.position}</h4>
                  <div className="career-company-row">
                    <h5 className="career-company">{exp.company}</h5>
                    {exp.isRemote && (
                      <span className="career-tag career-tag-remote">Remote</span>
                    )}
                    <span
                      className={`career-tag ${
                        isCurrent
                          ? "career-tag-current"
                          : "career-tag-completed"
                      }`}
                    >
                      {isCurrent ? "CURRENT" : "Completed"}
                    </span>
                  </div>
                  <span className="career-dates">{exp.dates}</span>
                </div>

                {/* Column 2: Year / NOW label + Timeline Dot */}
                <div className="career-year-col">
                  <h3
                    className={`career-year-text ${
                      isCurrent ? "career-year-now" : ""
                    }`}
                  >
                    {exp.yearLabel}
                  </h3>
                  <div className="career-dot-wrapper">
                    <div
                      className={`career-dot ${
                        isCurrent ? "career-dot-current" : "career-dot-completed"
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Column 3: Description Bullets */}
                <div className="career-desc-col">
                  <ul className="career-bullets">
                    {exp.bullets.map((bullet, bIndex) => (
                      <li key={bIndex} className="career-bullet-item">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Career;
