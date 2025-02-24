import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import Footer from "../../components/Footer/Footer";

const SideBar = ({ user }) => {
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
        {/* Navbar/Header */}
        <div
          className="d-flex align-items-center justify-content-between bg-light border p-2"
          style={{ height: "4rem" }}
        >
          {/* Toggle Button - Moved to Left */}
          <div className={`${showSidebar ? "fade-in" : "fade-out"}`}>
            <img
              src="/Registrar.png"
              alt="Registrar Logo"
              className="logo-img"
              style={{
                height: "80%",
                width: "10rem",
                objectFit: "cover",
                display: showSidebar ? "block" : "none",
                opacity: showSidebar ? "1" : "0",
              }}
            />
          </div>

          <button
            className="btn m-0 p-2 d-flex align-items-center justify-content-center"
            onClick={toggleSidebar}
            style={{ marginRight: "auto" }}
          >
            <i
              className={`bx ${
                showSidebar ? "bx-x" : "bx-menu "
              } transition-icon`}
              style={{ color: "black" }}
            ></i>
          </button>

          {/* Show logo only when sidebar is open */}
        </div>
        <div className=" listGroup">
          {user?.isAdmin ? (
            <>
              <ul className="sideBar-list list-unstyled">
                <li
                  className={`list-group-items ${
                    location.pathname === "/admin/Home" ? "active" : ""
                  }`}
                >
                  <Link to="/admin/Home" className="d-flex">
                    <i className="bx bx-home"></i>
                    <p className="m-0">Dashboard</p>
                  </Link>
                </li>
                <li
                  className={`list-group-items ${
                    location.pathname === "/RequestDocuments" ? "active" : ""
                  }`}
                >
                  <Link to="/RequestDocuments">
                    <i className="bx bx-file"></i>
                    <p className="m-0"> Reports</p>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul className="sideBar-list list-unstyled mt-3">
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
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="">
        <Footer showSidebar={showSidebar}></Footer>
      </div>
    </div>
  );
};

export default SideBar;
