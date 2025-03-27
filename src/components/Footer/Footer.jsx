import React from "react";

const Footer = ({ showSidebar }) => {
  return (
    <div className="px-2">
      <footer
        className={`footer py-3 border-top  ${
          showSidebar ? "toggled fade-in" : "fade-out"
        }  text-white text-center  py-1 `}
        style={{ width: "" }}
      >
        <p className="mb-0" style={{ fontSize: "10px" }}>
          &copy; {new Date().getFullYear()} CVSU-CCAT Registrar's Office
        </p>
        <p className="mb-0" style={{ fontSize: "9px" }}>
          All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
