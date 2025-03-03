import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Offcanvas, Button } from "react-bootstrap";
import axios from "axios";

const NavBar = ({ user }) => {
  const [show, setShow] = useState(false);
  const location = useLocation(); // Get current route

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/auth/logout")
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {/* NAVBAR */}
      <div
        className="px-4 p-1 w-100 d-flex justify-content-between align-items-center bg-white"
        style={{ height: "4rem" }}
      >
        {/* Logo*/}
        <img
          src="/cvsu-logo.png"
          alt="Registrar Logo"
          className="d-block img-fluid"
          style={{ maxWidth: "50px", objectFit: "cover" }}
        />

        {/* Right Side*/}
        <div className="d-flex align-items-center">
          {/* User Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              bsPrefix="custom-dropdown-toggle"
              className="py-2 px-3 px-md-5 mt-2 d-flex align-items-center"
              id="dropdown-basic"
              style={{ backgroundColor: "var(--main-color)" }}
            >
              <i
                className="bx bx-user-circle px-2 fs-5 m-0 d-none d-md-block"
                style={{ color: "var(--secondMain-color)" }}
              ></i>
              <p className="m-0" style={{ color: "var(--secondMain-color)" }}>
                {user.firstName}
              </p>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to="/ProfileSetup"
                  className="text-decoration-none text-dark"
                >
                  Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <button
                  className="btn btn-light w-100 text-center border-0 bg-transparent"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* Offcanvas Toggle Button (Visible only on Mobile) */}
          <Button
            variant="link"
            onClick={handleShow}
            className="d-md-none text-dark text-decoration-none fw-bold"
            style={{ fontSize: "1.5rem", marginLeft: "10px" }}
          >
            ☰
          </Button>
        </div>
      </div>

      {/* OFFCANVAS SIDEBAR*/}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "170px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="sideBar-list list-unstyled d-flex flex-column gap-2">
            <li
              className={`list-group-items ${
                location.pathname === (user.isAdmin ? "/admin/Home" : "/Home")
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
                <p className="m-0">{user.isAdmin ? "Dashboard" : "Homepage"}</p>
              </Link>
            </li>

            <li
              className={`list-group-items ${
                location.pathname ===
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

            <li
              className={`list-group-items ${
                location.pathname ===
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
                  className={`bx ${
                    user.isAdmin ? "bx-file" : "bx-info-circle"
                  }`}
                ></i>
                <p className="m-0">{user.isAdmin ? "Reports" : "About Us"}</p>
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default NavBar;
