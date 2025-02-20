import React from "react";

const Footer = ({ showSidebar }) => {
  return (
    <footer
      className={`footer ${
        showSidebar ? "toggled" : ""
      } bg-white text-dark text-center  py-1 `}
      style={{ width: "15rem" }}
    >
      <p className="mb-0" style={{ fontSize: "8px" }}>
        &copy; {new Date().getFullYear()} CVSU-CCAT Registrar's Office
      </p>
      <p className="mb-0" style={{ fontSize: "8px" }}>
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
