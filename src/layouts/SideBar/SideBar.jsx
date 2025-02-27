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
      style={{ backgroundColor: "var(--main-color)" }}
    >
      <div>
        {/* Navbar/Header */}
        <div
          className="image-container d-flex align-items-center justify-content-center border-bottom"
          style={{ height: "4rem", border: "white" }}
        >
          {/* Toggle Button - Moved to Left */}
          <div className={`${showSidebar ? "fade-in" : "fade-out"}`}>
            <img
              src="/Registrar.png"
              alt="Registrar Logo"
              className="logo-img"
              style={{
                height: "80%",
                width: "12rem",
                objectFit: "cover",
                display: showSidebar ? "block" : "none",
                opacity: showSidebar ? "1" : "0",
              }}
            />
          </div>

          <button
            className="btn m-0  d-flex align-items-center justify-content-center"
            onClick={toggleSidebar}
            style={{ marginRight: "auto" }}
          >
            <i
              className={`bx ${
                showSidebar ? "bx-x" : "bx-menu "
              } transition-icon`}
              style={{ color: "white" }}
            ></i>
          </button>

          {/* Show logo only when sidebar is open */}
        </div>

        <div className="p-2 ">
          <>
            <ul className="sideBar-list list-unstyled d-flex flex-column gap-2">
              {user.isAdmin ? (
                <li
                  className={`list-group-items  ${
                    location.pathname === "/admin/Home" ? "active" : ""
                  }`}
                >
                  <Link to="/admin/home">
                    <i className="bx bx-home"></i>
                    <p className="m-0">Dashboard</p>
                  </Link>
                </li>
              ) : (
                <li
                  className={`list-group-items rounded py-1  px-2 ${
                    location.pathname === "/Home" ? "active" : ""
                  }`}
                >
                  <Link className="d-flex align-items-center" to="/Home">
                    <i className="bx bx-home"></i>
                    <p className="m-0"> Homepage</p>
                  </Link>
                </li>
              )}
              {user.isAdmin ? (
                <li
                  className={`list-group-items ${
                    location.pathname === "/admin/ManageRequestForm"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    className="d-flex align-items-center"
                    to="/admin/manage-request-form"
                  >
                    <i className="bx bx-file"></i>
                    <p className="m-0">Request Form</p>
                  </Link>
                </li>
              ) : (
                <li
                  className={`list-group-items rounded py-1  px-2 ${
                    location.pathname === "/request-documents" ? "active" : ""
                  }`}
                >
                  <Link
                    className="d-flex align-items-center"
                    to="/request-documents"
                  >
                    <i className="bx bx-file "></i>
                    <p className="m-0"> Request Form</p>
                  </Link>
                </li>
              )}

              {user.isAdmin ? (
                <li
                  className={`list-group-items ${
                    location.pathname === "/admin/Reports" ? "active" : ""
                  }`}
                >
                  <Link
                    className="d-flex align-items-center"
                    to="/admin/reports"
                  >
                    <i className="bx bx-file"></i>
                    <p className="m-0"> Reports</p>
                  </Link>
                </li>
              ) : (
                <li
                  className={`list-group-items rounded py-1  px-2 ${
                    location.pathname === "/About" ? "active" : ""
                  }`}
                >
                  <Link className="d-flex align-items-center" to="/About">
                    <i className="bx bx-info-circle"></i>
                    <p className="m-0"> About Us</p>
                  </Link>
                </li>
              )}
            </ul>
          </>
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
