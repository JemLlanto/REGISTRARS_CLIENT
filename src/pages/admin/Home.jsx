import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { user } = useOutletContext();

  return (
    <div className="p-4 w-100">
      <div
        className="rounded-2 shadow-sm"
        style={{ backgroundColor: " #007bff" }}
      >
        <h5 className="m-0 p-2" style={{ color: "white" }}>
          Pending Request:
        </h5>
      </div>
      <div className="w-100 h-50 bg-light shadow-sm rounded-2">
        <div className="d-flex align-items-center justify-content-around mt-5">
          <p>Username</p>
          <p>Date</p>
          <p>Pending</p>
        </div>
        <div className="d-flex align-items-center justify-content-around">
          <p>{user?.firstName || "Loading..."}</p>
          <p>Feb 19, 2025</p>
          <p></p>
        </div>
      </div>
      <div className="w-100 h-50 bg-light shadow-sm rounded-2 p-5 mt-5">
        <div className="d-flex align-items-center justify-content-around mt-5">
          Free space
        </div>
      </div>
    </div>
  );
}
