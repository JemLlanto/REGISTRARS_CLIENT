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
              {/* homepage and dashboard */}
              <li
                className={`p-list-group-items ${location.pathname === (user.isAdmin ? "/admin/Home" : "/Home")
                  ? "active"
                  : ""
                  }`}
              >
                <Link
                  className="d-flex align-items-center"
                  to={user.isAdmin ? "/admin/home" : "/Home"}
                  onClick={handleClose}
                >
                  <i className="bx bx-home"></i>
                  <p className="m-0">
                    {user.isAdmin ? "Dashboard" : "Homepage"}
                  </p>
                </Link>
              </li>
              {/* request form */}
              <li
                className={`p-list-group-items ${location.pathname ===
                  (user.isAdmin
                    ? "/admin/ManageRequestForm"
                    : "/request-documents")
                  ? "active"
                  : ""
                  }`}
              >
                <Link
                  className="d-flex align-items-center"
                  to={
                    user.isAdmin
                      ? "/admin/manage-request-form"
                      : "/request-documents"
                  }
                  onClick={handleClose}
                >
                  <i className="bx bx-file"></i>
                  <p className="m-0">Request Form</p>
                </Link>
              </li>
              {/* student requested list */}
              {user.isAdmin ? (
                <li
                  className={`list-group-items  rounded py-1 px-2  ${location.pathname.toLowerCase() === "/admin/manage-request-form"
                    ? "active"
                    : ""
                    }`}
                >
                  <Link className="d-flex align-items-center" to="/admin/manage-request-form">
                    <i className="bx bx-file"></i>
                    <p className="m-0">Request Form</p>
                  </Link>
                </li>
              ) : (
                <li
                  className={`list-group-items rounded py-1 px-2 ${location.pathname.toLowerCase() === "/request-documents" ? "active" : ""
                    }`}
                >
                  <Link className="d-flex align-items-center" to="/request-documents">
                    <i className="bx bx-file"></i>
                    <p className="m-0">Request Form</p>
                  </Link>
                </li>
              )}
              {/* about and reports */}
              <li
                className={`p-list-group-items ${location.pathname ===
                  (user.isAdmin ? "/admin/Reports" : "/About")
                  ? "active"
                  : ""
                  }`}
              >
                <Link
                  className="d-flex align-items-center"
                  to={user.isAdmin ? "/admin/reports" : "/About"}
                  onClick={handleClose}
                >
                  <i
                    className={`bx ${user.isAdmin ? "bx-file" : "bx-info-circle"
                      }`}
                  ></i>
                  <p className="m-0">{user.isAdmin ? "Reports" : "About Us"}</p>
                </Link>
              </li>
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    </div>
  );
};

export default PhoneSidebar;
