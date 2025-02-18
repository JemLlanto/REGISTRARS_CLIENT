import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../layouts/SideBar/SideBar";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SideBar></SideBar>
    </>
  );
}
