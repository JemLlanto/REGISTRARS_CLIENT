import React, { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const Index = () => {
  const [activePage, setActivePage] = useState("login");

  return (
    <>
      {activePage === "login" ? (
        <Login setActivePage={setActivePage}></Login>
      ) : (
        <Register setActivePage={setActivePage}></Register>
      )}
    </>
  );
};

export default Index;
