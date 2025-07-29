import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ClosedForm = ({ user, fetchUserData }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Run this check at an interval to update the form state
    const checkTime = async () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const isWorkingDays = day >= 1 && day <= 4;
      const isWorkingHours =
        (hour > 8 && hour < 16) ||
        (hour === 8 && minutes >= 0) ||
        (hour === 16 && minutes === 0);
      const isWithinOperatingHours = isWorkingDays && isWorkingHours;

      //   // console.log("Current Time:", now.toLocaleString());
      //   // console.log("isWorkingDays:", isWorkingDays);
      //   // console.log("isWorkingHours:", isWorkingHours);
      //   // console.log("isWithinOperatingHours:", isWithinOperatingHours);
      //   // console.log("user.isAutomatic:", user.isAutomatic);
      //   // console.log("user.isOn:", user.isOn);

      if (user.isAutomatic) {
        setIsOpen(isWithinOperatingHours);
      } else {
        setIsOpen(user.isOn);
      }
    };

    // Check immediately when component mounts
    checkTime();

    // Set up interval to check time periodically
    const intervalId = setInterval(() => {
      checkTime();
      fetchUserData(); // Fetch only every interval, not on every render
    }, 10000); // Check every 1 minute

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [user]);

  return (
    <>
      {user.hasUncompletedRequest ? (
        <>
          {/* <div
            className="position-absolute text-center rounded d-flex flex-column align-items-center justify-content-center"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "rgb(230, 230, 230, .95)",
              zIndex: "50",
            }}
          >
            <span
              className="m-0 text-danger d-flex align-items-center justify-content-center"
              style={{
                fontSize: "clamp(3rem, 5dvw, 5rem)",
              }}
            >
              <i className="bx bx-block"></i>
            </span>

            <h2 className="m-0 text-danger mb-2 fw-bold">
              An active request is currently in progress.
            </h2>
            <div className="mb-4 d-flex flex-column align-items-center justify-content-center">
              <h5 className="mb-2">
                Please allow the current request to be completed before
                submitting a new one.
              </h5>
              <p className="mb-0">
                You may view the status of your request{" "}
                <Link to="/home">
                  <span className="fw-bold">here</span>
                </Link>
                .
              </p>
            </div>
          </div> */}
        </>
      ) : (
        <>
          {isOpen ? null : (
            <>
              {user ? (
                <div
                  className="position-absolute text-center rounded d-flex flex-column align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgb(230, 230, 230, .95)",
                    zIndex: "50",
                  }}
                >
                  <h2 className="m-0 text-danger mb-2 fw-bold">
                    Online Request Temporarily Close
                  </h2>
                  <div className="mb-4 d-flex flex-column align-items-center justify-content-center">
                    <p className="mb-2">
                      <span className="fw-bold">Days:</span> Monday through
                      Thursday
                    </p>
                    <p className="mb-0">
                      <span className="fw-bold">Hours:</span> 8:00 AM to 4:00 PM
                    </p>
                  </div>

                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <h3
                      className="h5 mb-3"
                      style={{ color: "var(--main-color)" }}
                    >
                      Closed On
                    </h3>
                    <ul className="list-unstyled d-flex flex-column align-items-center justify-content-center">
                      <li className="mb-2">
                        <p className="m-0">Fridays</p>
                      </li>
                      <li className="mb-2">
                        <p className="m-0">Saturdays</p>
                      </li>
                      <li className="mb-2">
                        <p className="m-0">Sundays</p>
                      </li>
                      <li className="mb-2">
                        <p className="m-0">Holidays (local and national)</p>
                      </li>
                      <li>
                        <p className="m-0">Campus/University-wide events</p>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ClosedForm;
