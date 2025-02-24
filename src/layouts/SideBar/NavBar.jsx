import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";

const NavBar = ({ user }) => {
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/auth/logout")
      .then((res) => {
        location.reload(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="px-4 p-1 w-100 d-flex  justify-content-end bg-white border"
      style={{ height: "4rem" }}
    >
      <>
        <Dropdown>
          <Dropdown.Toggle
            bsPrefix="custom-dropdown-toggle"
            className="w-100 py-2 px-5 mt-2 d-flex justify-content-center align-items-center"
            id="dropdown-basic"
            style={{
              backgroundColor: "var(--main-color)",
            }}
          >
            <p
              className="m-0 fs-7"
              style={{ color: "var(--secondMain-color)" }}
            >
              {user.firstName}
            </p>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item className="btn btn-close-white d-flex align-items-center text-center justify-content-center">
              <Link
                to="/ProfileSetup"
                className="text-decoration-none text-dark"
              >
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Item className="btn btn-close-white no-hover">
              <button
                className="btn btn-light w-100 text-center border-0 bg-transparent"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </>
    </div>
  );
};

export default NavBar;
