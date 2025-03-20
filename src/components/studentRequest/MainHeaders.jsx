import React from "react";
import { Dropdown } from "react-bootstrap";

const MainHeaders = ({ status, handleSelect }) => {
  return (
    <div
      className="p-2 text-start w-100 rounded-2 p-2 d-none d-sm-block mt-2"
      style={{ backgroundColor: "var(--yellow-color)" }}
    >
      <div
        className="m-0 d-flex align-items-center justify-content-center"
        style={{ color: "var(--background-color)" }}
      >
        <div className="w-100 d-flex align-items-center justify-content-center">
          <h5 className="m-0">Name</h5>
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center">
          <h5 className="m-0">Purpose</h5>
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center">
          <h5 className="m-0">Date</h5>
        </div>
        <div className="w-100 d-flex align-items-center justify-content-center">
          <Dropdown>
            <Dropdown.Toggle
              className="d-flex align-items-center text-white"
              variant="transparent"
              id="dropdown-basic"
              bsPrefix=""
            >
              <h5 className="m-0">
                Status
                {status ? (
                  <>
                    (
                    {String(status).charAt(0).toUpperCase() +
                      String(status).slice(1)}
                    )
                  </>
                ) : null}
              </h5>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSelect(null)}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("pending")}>
                Pending
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("processing")}>
                Processing
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("ready to pickup")}>
                For Pickup
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("completed")}>
                Completed
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("cancelled")}>
                Cancelled
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default MainHeaders;
