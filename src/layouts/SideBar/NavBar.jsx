import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Spinner } from "react-bootstrap";
import axios from "axios";
import PhoneSidebar from "./PhoneSidebar";
import NotifButton from "../../components/NavBar/NotifButton";

const NavBar = ({ user }) => {
  const [show, setShow] = useState(false);
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // For navigation

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleLogout = () => {
    localStorage.removeItem("formData");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <div
        className=" p-1 px-2 w-100 d-flex justify-content-between align-items-center bg-white"
        style={{ height: "4rem", top: "0", left: "0", zIndex: "1000" }}
      >
        {/* Logo*/}
        <Link to={!user.isAdmin ? "/home" : "/admin/home"}>
          <img
            src="/CvSU-CCATMINI.png"
            alt="Registrar Logo"
            className="d-block d-lg-none img-fluid"
            style={{ maxWidth: "130px", objectFit: "cover", cursor: "pointer" }}
          />
        </Link>

        {/* Right Side*/}
        <div className="d-flex align-items-center justify-content-end ms-auto me-2 me-md-0">
          {/* Notification Dropdown */}
          {/* {user.isAdmin ? (
            <NotifButtonAdmin user={user} />
          ) : (
            <NotifButton user={user} />
          )} */}
          <div className="me-0 me-md-2">
            <NotifButton user={user} />
          </div>

          {/* User Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              bsPrefix="custom-dropdown-toggle"
              className="py-2 px-3 m-2 d-flex align-items-center justify-content-end gap-2 shadow-none border-0"
              id="dropdown-basic"
              style={{ backgroundColor: "var(--main-color)" }}
            >
              {!user ? (
                <>
                  <div className="justify-content-center d-flex align-items-center gap-2">
                    <p
                      className="m-0 d-none d-md-block"
                      style={{ color: "var(--secondMain-color)" }}
                    >
                      Loading...
                    </p>
                    <span className="">
                      <Spinner animation="border" variant="white" size="sm" />
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <p
                    className="m-0 d-none d-md-block"
                    style={{ color: "var(--secondMain-color)" }}
                  >
                    {user.firstName}
                  </p>
                  <i
                    className="bx bx-user-circle m-0 my-1 my-md-0"
                    style={{ color: "var(--secondMain-color)" }}
                  ></i>
                </>
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu className="text-center ">
              {!user ? (
                <>
                  <div className="justify-content-center d-flex align-items-center gap-2 text-black">
                    <p className="m-0 d-none d-md-block">Loading</p>
                    <Spinner animation="border" variant="black" size="sm" />
                  </div>
                </>
              ) : (
                <>
                  <Dropdown.Item
                    as={Link}
                    to="/profile-setup"
                    className="text-dark bg-white py-0"
                  >
                    <button className="w-100 btn btn-light border border-0 d-flex align-items-center justify-content-center ">
                      <i className="bx bx-user me-2 m-0"></i>
                      <p className="m-0">Profile</p>
                    </button>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-dark bg-white py-0"
                    onClick={handleLogout}
                  >
                    <button className="w-100 btn btn-light border border-0 d-flex align-items-center justify-content-center ">
                      <i className="bx bx-log-out me-2 m-0"></i>
                      <p className="m-0">Logout</p>
                    </button>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <PhoneSidebar user={user}></PhoneSidebar>
        </div>
      </div>
    </>
  );
};

export default NavBar;
