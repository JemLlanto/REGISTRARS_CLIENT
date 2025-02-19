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
    <div className="p-2 w-100 d-flex  justify-content-end bg-white ">
      <Dropdown>
        <Dropdown.Toggle
          className="w-100 py-2 px-4 d-flex justify-content-center align-items-center "
          id="dropdown-basic"
          style={{
            backgroundColor: "rgb(0, 61, 192);",
          }}
        >
          <p className="m-0 fs-6"> {user.firstName}</p>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="/ProfileSetup" className="text-decoration-none text-dark">
              Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <button className="btn btn-light" onClick={handleLogout}>
              Log out
            </button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default NavBar;
