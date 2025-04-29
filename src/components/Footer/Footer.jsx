import React from "react";

const Footer = ({ showSidebar }) => {
  return (
    <div className="px-2">
      <footer
        className={`footer py-3 border-top  ${
          showSidebar ? "toggled fade-in" : "fade-out"
        }  text-white text-start  py-1 `}
        style={{ width: "" }}
      >
        <p className="mb-0">
          <span style={{ fontSize: "clamp(0.85rem, 1vw, .9rem)" }}>
            &copy; {new Date().getFullYear()} CVSU-CCAT Registrar's Office
          </span>
        </p>
        <p className="mb-0">
          <span style={{ fontSize: "clamp(0.85rem, 1.75vw, .9rem)" }}>
            All rights reserved.
          </span>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
