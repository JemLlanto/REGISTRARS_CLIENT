import React from "react";

const Footer = ({ showSidebar }) => {
  return (
    <footer
      className={`footer ${
        showSidebar ? "toggled" : ""
      } bg-white text-dark text-center  py-1 `}
      style={{ width: "20rem" }}
    >
      <p className="mb-0" style={{ fontSize: "10px" }}>
        &copy; {new Date().getFullYear()} CVSU-CCAT Registrar's Office
      </p>
      <p className="mb-0" style={{ fontSize: "10px" }}>
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
