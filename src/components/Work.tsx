import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { config } from "../config";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      const getScrollAmount = () => {
        const track = document.querySelector(".work-flex") as HTMLElement;
        if (!track) return 0;
        return Math.max(0, track.offsetWidth - window.innerWidth);
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: () => -getScrollAmount(),
        ease: "none",
      });

      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      const handleImageLoad = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("load", handleImageLoad);

      return () => {
        clearTimeout(refreshTimer);
        window.removeEventListener("load", handleImageLoad);
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    });

    mm.add("(max-width: 768px)", () => {
      gsap.set(".work-flex", { clearProps: "transform,x" });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section className="work-section" id="work" aria-label="Selected Projects">
      <div className="work-container section-container">
        <h2 className="work-heading">
          My <span>Work</span>
        </h2>

        <div className="work-flex" role="list">
          {config.projects.map((project, index) => {
            const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
            const techList = project.technologies.split(",").map((t) => t.trim());

            return (
              <div
                className="work-box"
                key={project.id}
                role="listitem"
                aria-label={`${project.title} - ${project.category}`}
              >
                {/* Card Top: Number, Title, Category */}
                <div className="work-info-header">
                  <span className="work-card-num" aria-hidden="true">
                    {formattedIndex}
                  </span>
                  <div className="work-card-titles">
                    <h3 className="work-card-title">{project.title}</h3>
                    <p className="work-card-category">{project.category}</p>
                  </div>
                </div>

                {/* Screenshot */}
                <WorkImage
                  image={project.image}
                  alt={`${project.title} screenshot`}
                  link={project.link}
                />

                {/* Description */}
                <p className="work-card-desc">{project.description}</p>

                {/* Tech Chips */}
                <div className="work-tech-chips" aria-label="Technologies used">
                  {techList.map((tech) => (
                    <span key={tech} className="work-tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="work-card-actions">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-btn work-btn-primary"
                    data-cursor="disable"
                    title={`Open live demo for ${project.title}`}
                  >
                    <span>Live Demo</span>
                    <MdArrowOutward aria-hidden="true" />
                  </a>

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn work-btn-secondary"
                      data-cursor="disable"
                      title={`View GitHub source code for ${project.title}`}
                    >
                      <FaGithub aria-hidden="true" />
                      <span>Source Code</span>
                      <MdArrowOutward aria-hidden="true" />
                    </a>
                  ) : (
                    <span
                      className="work-btn work-btn-disabled"
                      title="Repository is currently private or access is restricted"
                    >
                      <span>Private Repo</span>
                    </span>
                  )}

                  {(project as any).docs && (
                    <a
                      href={(project as any).docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn work-btn-subtle"
                      data-cursor="disable"
                      title="View Backend Documentation"
                    >
                      <span>Docs</span>
                      <MdArrowOutward aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          {/* See All Works CTA Box */}
          <div className="work-box work-box-cta" role="listitem">
            <div className="see-all-works">
              <span className="work-cta-badge">Complete Archive</span>
              <h3>Explore All Projects</h3>
              <p>
                Browse full repository specifications, live systems, and academic prototypes.
              </p>
              <Link to="/myworks" className="see-all-btn" data-cursor="disable">
                <span>View Full Catalog</span>
                <MdArrowOutward aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
