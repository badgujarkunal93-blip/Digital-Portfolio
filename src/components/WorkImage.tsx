import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  alt?: string;
  link?: string;
}

const resolveAssetPath = (path: string) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) return path;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

const WorkImage = ({ image, alt, link }: Props) => {
  const [hasError, setHasError] = useState(false);
  const isExternalLink = Boolean(link && !link.startsWith("/"));

  const imageContent = (
    <div className="work-image-inner">
      {hasError ? (
        <div className="work-image-fallback" aria-label={alt || "Project preview"}>
          <div className="work-fallback-icon">
            <svg
              viewBox="0 0 24 24"
              width="36"
              height="36"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <span className="work-fallback-title">{alt || "Project Preview"}</span>
          <span className="work-fallback-badge">Live System</span>
        </div>
      ) : (
        <img
          src={resolveAssetPath(image)}
          alt={alt || "Project screenshot"}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
        />
      )}
      <div className="work-link-overlay" aria-hidden="true">
        <div className="work-link-circle">
          <MdArrowOutward />
        </div>
      </div>
    </div>
  );

  return (
    <div className="work-image">
      {link ? (
        isExternalLink ? (
          <a
            className="work-image-in"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="disable"
            title={`Open live demo: ${alt || ""}`}
          >
            {imageContent}
          </a>
        ) : (
          <Link
            className="work-image-in"
            to={link}
            data-cursor="disable"
            title={`View project: ${alt || ""}`}
          >
            {imageContent}
          </Link>
        )
      ) : (
        <div className="work-image-in">{imageContent}</div>
      )}
    </div>
  );
};

export default WorkImage;
