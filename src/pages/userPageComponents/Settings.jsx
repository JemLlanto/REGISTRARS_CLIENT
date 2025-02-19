import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import SideBar from "../../layouts/SideBar/SideBar";
import MainLayout from "../../layouts/MainLayout";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainLayout>
      <div className="p-4 w-100">
        <div
          className="rounded-2 shadow-sm"
          style={{ backgroundColor: " #007bff" }}
        >
          <h5 className="m-0 p-2  " style={{ color: "white" }}>
            About Us
          </h5>
        </div>
        <div className="w-100 h-50">
          <div className="d-flex align-items-center justify-content-around mt-5">
            <p>Username</p>
            <p>Date</p>
            <p>Pending</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
