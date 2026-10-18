import { PropsWithChildren, useEffect, useState, useRef } from "react";
import "./styles/Landing.css";
import { config } from "../config";
import gsap from "gsap";

export const ROLES = [
  "AI/ML ENGINEER",
  "APPLIED AI BUILDER",
  "OPEN-SOURCE CONTRIBUTOR",
] as const;

const Landing = ({ children }: PropsWithChildren) => {
  const nameParts = config.developer.fullName.split(" ");
  const firstName = nameParts[0] || config.developer.name;
  const lastName = nameParts.slice(1).join(" ") || "";

  const [roleIndex, setRoleIndex] = useState(0);
  const roleTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let isCancelled = false;

    // Slide in the current role with a smooth reveal
    if (roleTextRef.current) {
      gsap.fromTo(
        roleTextRef.current,
        { y: 35, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
      );
    }

    // Wait, then animate out completely before advancing to the next role
    const timer = setTimeout(() => {
      if (isCancelled || !roleTextRef.current) return;

      gsap.to(roleTextRef.current, {
        y: -35,
        opacity: 0,
        filter: "blur(5px)",
        duration: 0.45,
        ease: "power2.in",
        onComplete: () => {
          if (isCancelled) return;
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        },
      });
    }, 3200);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [roleIndex]);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName.toUpperCase()}
              {' '}
              <br />
              {lastName && <span>{lastName.toUpperCase()}</span>}
            </h1>
          </div>
          <div className="landing-info">
            <h3>An</h3>
            <div className="landing-role-container">
              <h2 className="landing-role-text" ref={roleTextRef}>
                {ROLES[roleIndex]}
              </h2>
            </div>
          </div>
          {/* Mobile photo - shows only on mobile when 3D character is hidden */}
          <div className="mobile-photo">
            <img
              src={`${import.meta.env.BASE_URL}images/mypicnbg.png`}
              alt={config.developer.fullName}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
