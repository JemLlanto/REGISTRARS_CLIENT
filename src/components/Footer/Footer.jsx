import React from "react";

const Footer = ({ showSidebar }) => {
  return (
    <footer
      className={`footer ${
        showSidebar ? "toggled" : ""
      }  text-white text-center  py-1 `}
      style={{ width: "17rem" }}
    >
      <p className="mb-0" style={{ fontSize: "10px" }}>
        &copy; {new Date().getFullYear()} CVSU-CCAT Registrar's Office
      </p>
      <p className="mb-0" style={{ fontSize: "9px" }}>
        All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
