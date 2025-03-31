import React, { useEffect, useState } from "react";

const ClosedForm = ({ user }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [alreadyOpen, setAlreadyOpen] = useState(true);

  const checkTime = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours(); // 0-23 format
    const minutes = now.getMinutes();
    const openingTime = hour === 11 && minutes > 13;
    const closingTime = hour === 16 && minutes < 0;

    if (user.isAutomatic) {
      if (
        day >= 1 &&
        day <= 4 &&
        (openingTime || // After 8:30 AM
          closingTime) // Before 4:30 PM
      ) {
        if (!alreadyOpen) {
          alert("Form Opened");
        }
        setIsOpen(true);
      } else {
        if (isOpen) {
          alert("Form Closed");
        }
        setIsOpen(false);
        setAlreadyOpen(false);
      }
    } else {
      setIsOpen(user.isOn);
    }
  };

  useEffect(() => {
    // Run checkTime immediately when component mounts
    checkTime();

    // Set an interval to check every minute (60000ms)
    const interval = setInterval(checkTime, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [user, isOpen]);

  return (
    <>
      {isOpen ? null : (
        <div
          className="position-absolute rounded d-flex flex-column align-items-center justify-content-center"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(230, 230, 230, .95)",
            zIndex: "50",
          }}
        >
          <h1 className="m-0 text-danger mb-2 fw-bold">
            Form Submission Temporarily Unavailable {isOpen ? "yes" : "no"}
          </h1>
          <div className="mb-4 d-flex flex-column align-items-center justify-content-center">
            <h2 className="h5 mb-3" style={{ color: "var(--main-color)" }}>
              Current Operating Hours
            </h2>
            <p className="mb-2">
              <span className="fw-bold">Days:</span> Monday through Thursday
            </p>
            <p className="mb-0">
              <span className="fw-bold">Hours:</span> 8:00 AM to 4:00 PM
            </p>
          </div>

          <div className="d-flex flex-column align-items-center justify-content-center">
            <h2 className="h5 mb-3" style={{ color: "var(--main-color)" }}>
              Closed On
            </h2>
            <ul className="list-unstyled d-flex flex-column align-items-center justify-content-center">
              <li className="mb-2">• Fridays</li>
              <li className="mb-2">• Saturdays</li>
              <li className="mb-2">• Sundays</li>
              <li className="mb-2">• Holidays (local and national)</li>
              <li>• Campus/University-wide events</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default ClosedForm;
