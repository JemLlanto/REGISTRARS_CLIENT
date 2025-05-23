import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import Footer from "../../components/Footer/Footer";
const PhoneSidebar = ({ user }) => {
  const [show, setShow] = useState(false);
  const location = useLocation(); // Get current route

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <>
        {/* Offcanvas Toggle Button (Visible only on Mobile) */}
        <Button
          variant="light"
          onClick={handleShow}
          className="d-flex justify-content-center align-items-center d-lg-none text-dark border-0 text-decoration-none fw-bold p-2"
          style={{ fontSize: "1.5rem", height: "auto" }}
        >
          <i className="bx bx-menu m-0"></i>
        </Button>

        {/* OFFCANVAS SIDEBAR */}
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          style={{ width: "25rem" }}
        >
          <Offcanvas.Header
            closeButton
            className="border-bottom"
            style={{ backgroundColor: "var(--main-color)", height: "5rem" }}
          >
            <img
              src="/CvSU-CCAT.png"
              alt="Registrar Logo"
              className="logo-img"
              style={{
                height: "80%",
                width: "12rem",
                objectFit: "cover",
              }}
            />
          </Offcanvas.Header>

          <Offcanvas.Body
            className="PhoneSidebar d-flex flex-column justify-content-between"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            <ul className="sideBar-list list-unstyled d-flex flex-column gap-2">
              {/* Homepage & Dashboard */}
              <li
                className={`p-list-group-items rounded py-1 px-2 position-relative ${
                  location.pathname.toLowerCase() ===
                  (user.isAdmin ? "/admin/home" : "/home")
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  className="d-flex align-items-center gap-1"
                  to={user.isAdmin ? "/admin/home" : "/home"}
                  onClick={handleClose}
                >
                  <i className="bx bx-home bx-sm"></i>
                  <p className="m-0">
                    {user.isAdmin ? "Dashboard" : "Homepage"}
                  </p>
                </Link>
              </li>

              {/* Student Requests (Admin Only) */}
              {user?.isAdmin ? (
                <li
                  className={`p-list-group-items rounded py-1 px-2 ${
                    location.pathname.toLowerCase() ===
                    "/admin/student-requests"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    className="d-flex align-items-center gap-1"
                    to="/admin/student-requests"
                    onClick={handleClose}
                  >
                    <i className="bx bx-user-check bx-sm"></i>
                    <p className="m-0">Student Requests</p>
                  </Link>
                </li>
              ) : null}

              {/* Manage Requests / Request Form */}
              <li
                className={`p-list-group-items rounded py-1 px-2 ${
                  location.pathname.toLowerCase() ===
                  (user.isAdmin
                    ? "/admin/manage-request-form"
                    : "/request-documents")
                    ? "active"
                    : ""
                }`}
              >
                <Link
                  className="d-flex align-items-center gap-1"
                  to={
                    user.isAdmin
                      ? "/admin/manage-request-form"
                      : "/request-documents"
                  }
                  onClick={handleClose}
                >
                  <i className="bx bx-file bx-sm"></i>
                  <p className="m-0">
                    {user.isAdmin ? "Manage Form" : "Request Form"}
                  </p>
                </Link>
              </li>

              {/* Manage Admin (Only for Admin Level 2) */}
              {user.isAdmin === 2 && (
                <li
                  className={`p-list-group-items rounded py-1 px-2 ${
                    location.pathname.toLowerCase() === "/admin/manage-admin"
                      ? "active"
                      : ""
                  }`}
                >
                  <Link
                    className="d-flex align-items-center gap-1"
                    to="/admin/manage-admin"
                    onClick={handleClose}
                  >
                    <i className="bx bx-bar-chart-alt-2 bx-sm"></i>
                    <p className="m-0">Manage Admin</p>
                  </Link>
                </li>
              )}

              {/* About Us (Non-Admin Only) */}
              <li
                className={`p-list-group-items rounded py-1 px-2 ${
                  location.pathname.toLowerCase() === "/about" ? "active" : ""
                }`}
              >
                <Link
                  className="d-flex align-items-center gap-1 bx-sm"
                  to="/about"
                  onClick={handleClose}
                >
                  <i className="bx bx-info-circle"></i>
                  <p className="m-0">About Us</p>
                </Link>
              </li>
            </ul>
          </Offcanvas.Body>
          <footer
            className=" text-center py-3 border-top"
            style={{ backgroundColor: "var(--main-color)" }}
          >
            <div className="text-white ">
              <p className="mb-0" style={{ fontSize: "10px" }}>
                &copy; {new Date().getFullYear()} CvSU-CCAT Registrar's Office
              </p>
              <p className="mb-0" style={{ fontSize: "9px" }}>
                All rights reserved.
              </p>
            </div>
          </footer>
        </Offcanvas>
      </>
    </div>
  );
};

export default PhoneSidebar;
