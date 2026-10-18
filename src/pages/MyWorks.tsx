import { Link } from "react-router-dom";
import { config } from "../config";
import "./MyWorks.css";
import WorkImage from "../components/WorkImage";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from "react-icons/fa6";

const MyWorks = () => {
  return (
    <div className="myworks-page">
      <div className="myworks-header">
        <Link to="/" className="back-button" data-cursor="disable">
          ← Back to Home
        </Link>
        <h1>
          All <span>Works</span>
        </h1>
        <p>A collection of all eight verified projects, prototypes, and deployments</p>
      </div>

      <div className="myworks-grid">
        {config.projects.map((project, index) => {
          const formattedIndex = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
          const techList = project.technologies.split(",").map((t) => t.trim());

          return (
            <div
              className="myworks-card"
              key={project.id}
              role="article"
              aria-label={`${project.title} - ${project.category}`}
            >
              <div className="myworks-card-header">
                <span className="myworks-card-number">{formattedIndex}</span>
                <div className="myworks-card-titles">
                  <h3>{project.title}</h3>
                  <p className="myworks-card-category">{project.category}</p>
                </div>
              </div>

              <div className="myworks-card-image">
                <WorkImage
                  image={project.image}
                  alt={`${project.title} screenshot`}
                  link={project.link}
                />
              </div>

              <div className="myworks-card-info">
                <p className="myworks-card-description">{project.description}</p>

                <div className="myworks-card-chips" aria-label="Technologies">
                  {techList.map((tech) => (
                    <span key={tech} className="myworks-tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="myworks-card-actions">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="myworks-btn myworks-btn-primary"
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
                      className="myworks-btn myworks-btn-secondary"
                      data-cursor="disable"
                      title={`View GitHub source code for ${project.title}`}
                    >
                      <FaGithub aria-hidden="true" />
                      <span>Source Code</span>
                      <MdArrowOutward aria-hidden="true" />
                    </a>
                  ) : (
                    <span
                      className="myworks-btn myworks-btn-disabled"
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
                      className="myworks-btn myworks-btn-subtle"
                      data-cursor="disable"
                      title="View Backend Documentation"
                    >
                      <span>Docs</span>
                      <MdArrowOutward aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyWorks;
