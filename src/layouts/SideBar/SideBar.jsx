import React, { useState } from "react";

const SideBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };
  return (
    <div className={`SideBar ${showSidebar ? "toggled" : ""}`}>
      <h1>REGISTRAR</h1>
      <button onClick={toggleSidebar} className="mt-5">
        show
      </button>
    </div>
  );
};

export default SideBar;
