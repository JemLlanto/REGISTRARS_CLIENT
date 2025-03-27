import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "boxicons/css/boxicons.min.css";
import Footer from "../../components/Footer/Footer";

const SideBar = ({ user }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const location = useLocation(); // Get current route for active menu
  const [shouldRender, setShouldRender] = useState(showSidebar);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  useEffect(() => {
    if (showSidebar) {
      setShouldRender(true);
    } else {
      // Wait for the fade-out animation to complete before hiding
      setTimeout(() => setShouldRender(false), 150); // Match animation duration
    }
  }, [showSidebar]);

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
          className="d-flex align-items-center justify-content-center border-bottom"
          style={{ height: "4rem", border: "white" }}
        >
          {/* Toggle Button - Registrar's Logo*/}
          <div className="">
            <img
              src="/Registrar.png"
              alt="Registrar Logo"
              className={`${showSidebar ? "fade-in me-2" : "fade-out"} ${
                !shouldRender ? "hidden" : ""
              }`}
              style={{
                height: "80%",
                width: "12rem",
                objectFit: "cover",
                // display: showSidebar ? "block" : "none",
                // opacity: showSidebar ? "1" : "0",
              }}
            />
          </div>

          <button
            className="sideBarToggler btn bg-transparent m-0 d-flex align-items-center justify-content-center"
            onClick={toggleSidebar}
            style={{ height: "3rem", width: "3rem" }}
          >
            <i
              className={`bx ${
                showSidebar ? "bx-x" : "bx-menu"
              } transition-icon`}
              style={{ color: "white" }}
            ></i>
          </button>
        </div>

        <div className="p-3">
          <ul className="sideBar-list list-unstyled d-flex flex-column gap-2">
            {/* homepage and dashboard */}
            {user.isAdmin ? (
              <li
                className={`list-group-items rounded py-1 px-2 position-relative ${
                  location.pathname.toLowerCase() === "/admin/home"
                    ? "active"
                    : ""
                }`}
              >
                <Link className="d-flex align-items-center" to="/admin/home">
                  <i className="bx bx-home"></i>
                  <p
                    className={`m-0 ${showSidebar ? "fade-in" : "fade-out"} ${
                      !shouldRender ? "hidden" : ""
                    }`}
                  >
                    Dashboard
                  </p>
                </Link>
                <span className="tooltip">Dashboard</span>
              </li>
            ) : (
              <li
                className={`list-group-items rounded py-1 px-2 position-relative ${
                  location.pathname.toLowerCase() === "/home" ? "active" : ""
                }`}
              >
                <Link className="d-flex align-items-center" to="/home">
                  <i className="bx bx-home"></i>
                  <p
                    className={`m-0 ${showSidebar ? "fade-in" : "fade-out"} ${
                      !shouldRender ? "hidden" : ""
                    }`}
                  >
                    Homepage
                  </p>
                </Link>
                <span className="tooltip">Homepage</span>
              </li>
            )}

            {/* student request form */}
            {user.isAdmin ? (
              <li
                className={`list-group-items rounded py-1 px-2 ${
                  location.pathname.toLowerCase() === "/admin/student-requests"
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  className="d-flex align-items-center"
                  to="/admin/student-requests"
                >
                  <i className="bx bx-user-check me-2"></i>
                  <p
                    className={`m-0 ${showSidebar ? "fade-in" : "fade-out"} ${
                      !shouldRender ? "hidden" : ""
                    }`}
                  >
                    Student Requests
                  </p>
                </Link>
                <span className="tooltip">Student Requests</span>
              </li>
            ) : null}

            {/* student requested list */}
            {user.isAdmin ? (
              <li
                className={`list-group-items  rounded py-1 px-2  ${
                  location.pathname.toLowerCase() ===
                  "/admin/manage-request-form"
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  className="d-flex align-items-center"
                  to="/admin/manage-request-form"
                >
                  <i className="bx bx-file"></i>
                  <p
                    className={`m-0 ${showSidebar ? "fade-in" : "fade-out"} ${
                      !shouldRender ? "hidden" : ""
                    }`}
                  >
                    Manage Requests
                  </p>
                </Link>
                <span className="tooltip">Manage Requests</span>
              </li>
            ) : (
              <li
                className={`list-group-items rounded py-1 px-2 ${
                  location.pathname.toLowerCase() === "/request-documents"
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  className="d-flex align-items-center"
                  to="/request-documents"
                >
                  <i className="bx bx-file"></i>
                  <p
                    className={`m-0 ${showSidebar ? "fade-in" : "fade-out"} ${
                      !shouldRender ? "hidden" : ""
                    }`}
                  >
                    Request Form
                  </p>
                </Link>
                <span className="tooltip">Request Form</span>
              </li>
            )}

            {/* about us and reports */}
            {user.isAdmin ? null : ( // </li> //   <span className="tooltip">Reports</span> //   </Link> //     <p className="m-0">Reports</p> //     <i className="bx bx-bar-chart-alt-2"></i> //   <Link className="d-flex align-items-center" to="/admin/reports"> // > //   }`} //       : "" //       ? "active" //     location.pathname.toLowerCase() === "/admin/reports" //   className={`list-group-items rounded py-1 px-2 ${ // <li
              <li
                className={`list-group-items rounded py-1 px-2 ${
                  location.pathname.toLowerCase() === "/about" ? "active" : ""
                }`}
              >
                <Link className="d-flex align-items-center" to="/about">
                  <i className="bx bx-info-circle"></i>
                  <p
                    className={`m-0 ${showSidebar ? "fade-in" : "fade-out"} ${
                      !shouldRender ? "hidden" : ""
                    }`}
                  >
                    About Us
                  </p>
                </Link>
                <span className="tooltip">About Us</span>
              </li>
            )}
            {/* about us and reports */}
            {user.isAdmin === 2 ? (
              <li
                className={`list-group-items rounded py-1 px-2 ${
                  location.pathname.toLowerCase() === "/admin/manage-admin"
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  className="d-flex align-items-center"
                  to="/admin/manage-admin"
                >
                  <i className="bx bx-bar-chart-alt-2"></i>
                  <p
                    className={`m-0 ${showSidebar ? "fade-in" : "fade-out"} ${
                      !shouldRender ? "hidden" : ""
                    }`}
                  >
                    Manage Admin
                  </p>
                </Link>
                <span className="tooltip">Manage Admin</span>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div>
        <Footer showSidebar={showSidebar}></Footer>
      </div>
    </div>
  );
};

export default SideBar;
