import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
const NavBar = () => {
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
          <p className="m-0 fs-6"> John Mark</p>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default NavBar;
