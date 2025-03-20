import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
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
          variant="link"
          onClick={handleShow}
          className="d-md-none text-dark text-decoration-none fw-bold"
          style={{ fontSize: "1.5rem", marginLeft: "10px" }}
        >
          ☰
        </Button>

        {/* OFFCANVAS SIDEBAR */}
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          style={{ width: "25rem" }}
        >
          <Offcanvas.Header closeButton style={{ backgroundColor: "var(--main-color)", height: "5rem" }}>
            <img
              src="/Registrar.png"
              alt="Registrar Logo"
              className="logo-img"
              style={{
                height: "80%",
                width: "12rem",
                objectFit: "cover",
              }}
            />
          </Offcanvas.Header>

          <Offcanvas.Body className="PhoneSidebar" style={{ backgroundColor: "var(--main-color)" }}>
            <ul className="sideBar-list list-unstyled d-flex flex-column gap-2">
              {/* Homepage & Dashboard */}
              <li className={`p-list-group-items rounded py-1 px-2 position-relative ${location.pathname.toLowerCase() === (user.isAdmin ? "/admin/home" : "/home") ? "active" : ""}`}>
                <Link className="d-flex align-items-center" to={user.isAdmin ? "/admin/home" : "/home"} onClick={handleClose}>
                  <i className="bx bx-home"></i>
                  <p className="m-0">{user.isAdmin ? "Dashboard" : "Homepage"}</p>
                </Link>
              </li>

              {/* Student Requests (Admin Only) */}
              {user.isAdmin && (
                <li className={`p-list-group-items rounded py-1 px-2 ${location.pathname.toLowerCase() === "/admin/student-requests" ? "active" : ""}`}>
                  <Link className="d-flex align-items-center" to="/admin/student-requests" onClick={handleClose}>
                    <i className="bx bx-user-check me-2"></i>
                    <p className="m-0">Student Requests</p>
                  </Link>
                </li>
              )}

              {/* Manage Requests / Request Form */}
              <li className={`p-list-group-items rounded py-1 px-2 ${location.pathname.toLowerCase() === (user.isAdmin ? "/admin/manage-request-form" : "/request-documents") ? "active" : ""}`}>
                <Link className="d-flex align-items-center" to={user.isAdmin ? "/admin/manage-request-form" : "/request-documents"} onClick={handleClose}>
                  <i className="bx bx-file"></i>
                  <p className="m-0">{user.isAdmin ? "Manage Requests" : "Request Form"}</p>
                </Link>
              </li>

              {/* About Us (Non-Admin Only) */}
              {!user.isAdmin && (
                <li className={`p-list-group-items rounded py-1 px-2 ${location.pathname.toLowerCase() === "/about" ? "active" : ""}`}>
                  <Link className="d-flex align-items-center" to="/about" onClick={handleClose}>
                    <i className="bx bx-info-circle"></i>
                    <p className="m-0">About Us</p>
                  </Link>
                </li>
              )}

              {/* Manage Admin (Only for Admin Level 2) */}
              {user.isAdmin === 2 && (
                <li className={`p-list-group-items rounded py-1 px-2 ${location.pathname.toLowerCase() === "/admin/manage-admin" ? "active" : ""}`}>
                  <Link className="d-flex align-items-center" to="/admin/manage-admin" onClick={handleClose}>
                    <i className="bx bx-bar-chart-alt-2"></i>
                    <p className="m-0">Manage Admin</p>
                  </Link>
                </li>
              )}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </div>
  );
};


export default PhoneSidebar;
