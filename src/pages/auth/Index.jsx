import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Preloader from "../../components/Preloader/Preloader";

const Index = () => {
  const [activePage, setActivePage] = useState("login");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        if (res.data.Status === "Success") {
          // If user is authenticated, redirect to home
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        // If there's an error, user stays on login page
      });
  }, [navigate]);

  return (
    <>
      <Preloader />
      {activePage === "login" ? (
        <Login setActivePage={setActivePage}></Login>
      ) : (
        <Register setActivePage={setActivePage}></Register>
      )}
    </>
  );
};

export default Index;
