import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    // Gates stay closed initially, then slide open
    tl.to(".gate-left", { x: "-100vw", duration: 1.5, ease: "power4.inOut", delay: 1.5 })
      .to(".gate-right", { x: "100vw", duration: 1.5, ease: "power4.inOut" }, "-=1.5") // Sync animation
      .to(".preloader-logo", { opacity: 0, scale: 0.6, duration: 0.6, ease: "power2.inOut" }, "-=2");

    // Remove preloader after animation
    setTimeout(() => setLoading(false), 3000);
  }, []);

  return (
    loading && (
      <div className="preloader-container">
        <div className="gate gate-left"></div>
        <div className="gate gate-right"></div>
        <img src="/preloader.png" alt="Loading Logo" className="preloader-logo" />
      </div>
    )
  );
};

export default Preloader;
