import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, Offcanvas, Button } from "react-bootstrap";
import axios from "axios";
import PhoneSidebar from "./PhoneSidebar";
import NotifButton from "../../components/NavBar/NotifButton";
import NotifButtonAdmin from "../../components/NavBar/NotifButtonAdmin";

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
        className=" p-1 w-100 d-flex justify-content-between align-items-center bg-white"
        style={{ height: "4rem" }}
      >
        {/* Logo*/}
        <img
          src="/cvsu-logo.png"
          alt="Registrar Logo"
          className="d-block d-md-none img-fluid"
          style={{ maxWidth: "50px", objectFit: "cover" }}
        />
        {/* Right Side*/}
        <div className="d-flex align-items-end justify-content-end ms-auto gap-2">
          {/* Notification Dropdown */}
          {/* {user.isAdmin ? (
            <NotifButtonAdmin user={user} />
          ) : (
            <NotifButton user={user} />
          )} */}
          <NotifButton user={user} />

          {/* User Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              bsPrefix="custom-dropdown-toggle"
              className="py-2 mt-1 d-flex align-items-center justify-content-end gap-2"
              id="dropdown-basic"
              style={{ backgroundColor: "var(--main-color)" }}
            >
              <p className="m-0" style={{ color: "var(--secondMain-color)" }}>
                {user.firstName}
              </p>
              <i
                className="bx bx-user-circle m-0 "
                style={{ color: "var(--secondMain-color)" }}
              ></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="text-center">
              <Dropdown.Item className="btn btn-white btn-no-hover">
                <Link
                  to="/ProfileSetup"
                  className="text-decoration-none text-dark border-0 bg-transparent "
                >
                  Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item className="btn btn-white btn-no-hover">
                <button
                  className="btn btn-white btn-no-hover w-100 text-center border-0 bg-transparent "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <PhoneSidebar user={user}></PhoneSidebar>
        </div>
      </div>
    </>
  );
};

export default NavBar;
