import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import axios from "axios";

const NavBar = ({ user }) => {
  const [notifCount, setNotifCount] = useState(3);
  const [showNotif, setShowNotif] = useState(false);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/auth/logout")
      .then(() => {
        location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  const handleNotifClick = () => {
    setShowNotif(!showNotif);
    setNotifCount(0); // Mark notifications as read
  };

  return (
    <div
      className="px-4 p-1 w-100 d-flex justify-content-end align-items-center bg-white"
      style={{ height: "4rem" }}
    >
      {/* Notification Dropdown */}
      <Dropdown show={showNotif} onToggle={setShowNotif}>
        <Dropdown.Toggle
          as={Button}
          variant="transparent"
          className="position-relative me-3"
          onClick={handleNotifClick}
          bsPrefix="custom-toggle"
        ></Dropdown.Toggle>

        <Dropdown.Menu className="p-2" style={{ minWidth: "250px" }}>
          <Dropdown.ItemText className="fw-bold">
            Notifications
          </Dropdown.ItemText>
          <Dropdown.Divider />
          <Dropdown.Item href="#">✅ Your request was approved</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* User Dropdown */}
      <Dropdown>
        <Dropdown.Toggle
          bsPrefix="custom-dropdown-toggle"
          className="py-2 px-5 d-flex justify-content-center align-items-center"
          id="dropdown-basic"
          style={{
            backgroundColor: "var(--main-color)",
          }}
        >
          <p className="m-0 fs-7" style={{ color: "var(--secondMain-color)" }}>
            {user?.firstName}
          </p>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item className="d-flex align-items-center justify-content-center">
            <Link to="/ProfileSetup" className="text-decoration-none text-dark">
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
    </div>
  );
};

export default NavBar;
