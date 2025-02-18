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
        <h2 className="m-0 p-2">Pending Request</h2>
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
