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
          style={{ fontSize: "1.5rem", marginLeft: "10px", }}
        >
          ☰
        </Button>
        {/* OFFCANVAS SIDEBAR*/}
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
            <ul className="PhonesideBar-list list-unstyled d-flex flex-column gap-2">
              {[
                { path: user.isAdmin ? "/admin/home" : "/home", icon: "bx-home", label: user.isAdmin ? "Dashboard" : "Homepage" },
                { path: user.isAdmin ? "/admin/manage-request-form" : "/request-documents", icon: "bx-file", label: "Request Form" },
                user.isAdmin && { path: "/admin/student-requests", icon: "bx-user-check me-2", label: "Student Requests" },
                { path: user.isAdmin ? "/admin/reports" : "/about", icon: user.isAdmin ? "bx-file" : "bx-info-circle", label: user.isAdmin ? "Reports" : "About Us" }
              ].filter(Boolean).map(({ path, icon, label }) => (
                <li key={path} className={`p-list-group-items ${location.pathname.toLowerCase() === path ? "active" : ""}`}>
                  <Link className="d-flex align-items-center" to={path} onClick={handleClose}>
                    <i className={`bx ${icon}`}></i>
                    <p className="m-0">{label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Offcanvas.Body>

        </Offcanvas>
      </>
    </div>
  );
};

export default PhoneSidebar;
