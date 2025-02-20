import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import Footer from "../../components/Footer/Footer";

const SideBar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation(); // Get current route for active menu

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div
      className={`SideBar d-flex flex-column justify-content-between ${
        showSidebar ? "toggled" : ""
      }`}
    >
      <div>
        <div className="d-flex align-items-center mb-3  bg-white border position-relative">
          <img
            src="/Registrar.png"
            alt="Registrar Logo"
            style={{ width: "70%" }}
          />
          <button className="btn m-0 p-2" onClick={toggleSidebar}>
            <i
              className={showSidebar ? "bx bx-menu " : "bx bx-x"}
              style={{ color: "black" }}
            ></i>
          </button>
        </div>
        <div className=" listGroup">
          <ul className="sideBar-list list-unstyled">
            <li
              className={`list-group-items ${
                location.pathname === "/Home" ? "active" : ""
              }`}
            >
              <Link to="/Home" className="d-flex">
                <i className="bx bx-home"></i>
                <p className="m-0"> Homepage</p>
              </Link>
            </li>
            <li
              className={`list-group-items ${
                location.pathname === "/RequestDocuments" ? "active" : ""
              }`}
            >
              <Link to="/RequestDocuments">
                <i className="bx bx-file"></i>
                <p className="m-0"> Request Documents</p>
              </Link>
            </li>

            <li
              className={`list-group-items ${
                location.pathname === "/About" ? "active" : ""
              }`}
            >
              <Link to="/About">
                <i className="bx bx-info-circle"></i>
                <p className="m-0"> About Us</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <Footer showSidebar={showSidebar}></Footer>
      </div>
    </div>
  );
};

export default SideBar;
