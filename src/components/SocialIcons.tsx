import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import { config } from "../config";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons" id="social">
        <a
          href={config.contact.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          title="Visit GitHub Profile"
          className="social-icon-link"
          data-cursor="disable"
        >
          <FaGithub />
        </a>
        <a
          href={config.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          title="Visit LinkedIn Profile"
          className="social-icon-link"
          data-cursor="disable"
        >
          <FaLinkedinIn />
        </a>
      </div>
      <a
        className="resume-button"
        href={`${import.meta.env.BASE_URL}resume.pdf`}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="disable"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;

