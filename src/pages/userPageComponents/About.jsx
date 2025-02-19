import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import SideBar from "../../layouts/SideBar/SideBar";
import MainLayout from "../../layouts/MainLayout";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainLayout>
      <div className="p-4 w-100 overflow-auto" style={{ maxHeight: "650px" }}>
        <div
          className="rounded-2 shadow-sm"
          style={{ backgroundColor: " #007bff" }}
        >
          <h5 className="m-0 p-2  " style={{ color: "white" }}>
            About Us:
          </h5>
        </div>
        <div className="d-flex align-items-center justify-content-center w-100 h-50 bg-white shadow-sm rounded-2 flex-column mt-5">
          <div className="">
            <img
              src="/OfficeLogo.png"
              alt="Registrar Logo"
              style={{ width: "20rem" }}
            />
          </div>
          <div className="m-0 mt-3">
            <h3>OFFICE HOURS</h3>
          </div>
          <div className="mt-3">
            <h1>MONDAY - THURSDAY</h1>
          </div>
          <div>
            <p>07:00 AM to 06:00 PM</p>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center w-100 h-50 bg-white shadow-sm rounded-2 flex-column mt-4">
          <div className="">
            <img
              src="/OfficeLogo.png"
              alt="Registrar Logo"
              style={{ width: "20rem" }}
            />
          </div>
          <div className="m-0 mt-3">
            <h4>MANAGEMENT INFORMATION SYSTEMS</h4>
          </div>
          <div className="mt-3 m-0">
            <p className="text-center">SCHEDULE:</p>
            <h1>ADDING, CHANGING, AND DROPPING OF SUBJECTS</h1>
          </div>
          <div className="mb-2">
            <h5>CUT-OFF TIME: 4:00 PM</h5>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center w-100 h-50 bg-white shadow-sm rounded-2 flex-column mt-4">
          <div className="">
            <img
              src="/OfficeLogo.png"
              alt="Registrar Logo"
              style={{ width: "20rem" }}
            />
          </div>
          <div className="m-0 mt-3">
            <h4>MANAGEMENT INFORMATION SYSTEMS</h4>
          </div>
          <div className="mt-3 m-0">
            <h1>Withdrawal of Registration / Enrollment</h1>
          </div>
          <div className="mb-2">
            <p className="text-center">until</p>
            <h3>MARCH 11, 2025</h3>
            <h5>CUT-OFF TIME: 4:00 PM</h5>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
