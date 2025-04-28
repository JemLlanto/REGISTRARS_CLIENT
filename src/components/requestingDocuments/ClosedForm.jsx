import React, { useEffect, useState } from "react";

const ClosedForm = ({ user, fetchUserData }) => {
  const [isOpen, setIsOpen] = useState(true);

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

      //   console.log("Current Time:", now.toLocaleString());
      //   console.log("isWorkingDays:", isWorkingDays);
      //   console.log("isWorkingHours:", isWorkingHours);
      //   console.log("isWithinOperatingHours:", isWithinOperatingHours);
      //   console.log("user.isAutomatic:", user.isAutomatic);
      //   console.log("user.isOn:", user.isOn);

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
            Form Submission Temporarily Unavailable
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
