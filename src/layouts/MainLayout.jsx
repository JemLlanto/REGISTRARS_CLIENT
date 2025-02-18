import React, { Children } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./SideBar/SideBar";
import NavBar from "./SideBar/NavBar";

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="w-100 d-flex" style={{ backgroundColor: "#f2f2f2" }}>
        <div>
          <SideBar></SideBar>
        </div>
        <div className="w-100">
          <NavBar></NavBar>
          <div className="d-flex justify-content-center align-items-center">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
