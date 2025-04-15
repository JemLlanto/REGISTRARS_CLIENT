import React from "react";
import { Dropdown } from "react-bootstrap";

const MainHeaders = ({ status, handleSelect }) => {
  return (
    <div
      className="d-flex rounded-2 "

    >
      {/* Desktop View */}
      <div className="fade-in d-none d-md-flex w-100 text-white" style={{ backgroundColor: "var(--yellow-color)" }}>
        {/* Column: Name */}
        <div className="flex-fill d-flex align-items-center justify-content-center">
          <p className="m-0">Name</p>
        </div>
        {/* Column: Purpose */}
        <div className="flex-fill d-flex align-items-center justify-content-center">
          <p className="m-0">Purpose</p>
        </div>
        {/* Column: Request Date */}
        <div className="flex-fill d-flex align-items-center justify-content-center">
          <p className="m-0">Request Date</p>
        </div>
        {/* Column: Status Dropdown */}
        <div className="flex-fill d-flex align-items-center justify-content-center">
          <Dropdown>
            <Dropdown.Toggle
              className="d-flex align-items-center text-white"
              variant="transparent"
              id="dropdown-basic"
              bsPrefix=""
              style={{
                outline: "none",
                boxShadow: "none",
                border: "none",
              }}
            >
              <p className="m-0">
                Status
                {status ? (
                  <>
                    (
                    {String(status).charAt(0).toUpperCase() +
                      String(status).slice(1)}
                    )
                  </>
                ) : null}
              </p>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSelect(null)}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("pending")}>Pending</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("processing")}>Processing</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("ready to pickup")}>For Pickup</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("completed")}>Completed</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSelect("cancelled")}>Cancelled</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>



      {/* Mobile View */}
      <div className="d-block d-md-none ">
        <Dropdown>
          <Dropdown.Toggle
            className="d-flex align-items-center text-white"
            variant="transparent"
            id="dropdown-basic"
            bsPrefix=""
            style={{
              outline: "none",
              boxShadow: "none",
              border: "none",
            }}
          >
            <p className="m-0">
              Status
              {status ? (
                <>
                  (
                  {String(status).charAt(0).toUpperCase() +
                    String(status).slice(1)}
                  )
                </>
              ) : null}
            </p>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSelect(null)}>All</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect("pending")}>Pending</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect("processing")}>Processing</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect("ready to pickup")}>For Pickup</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect("completed")}>Completed</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect("cancelled")}>Cancelled</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default MainHeaders;
