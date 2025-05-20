import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Preloader from "../../components/Preloader/Preloader";
import Register from "../../components/auth/Register";
import Login from "../../components/auth/Login";
import { Background } from "../../components/Background/Background";
import CookieConsent from "../../components/auth/CookieConsent";

const Index = () => {
  const [activePage, setActivePage] = useState("login");
  const [auth, setAuth] = useState(false);
  const storedToken = localStorage.getItem("token");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const fetchUserData = () => {
    // console.log("Raw token from localStorage to be sent:", storedToken);
    if (storedToken) {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((res) => {
          if (res.data.Status === "Success") {
            if (!res.data.data.isAdmin) {
              navigate("/home");
            } else {
              navigate("/admin/home");
            }
          } else {
            navigate("/");
            localStorage.removeItem("formData");
            localStorage.removeItem("token");
          }
        })
        .catch((err) => {
          // console.log("Error fetching user:", err.response?.data || err.message);
          setAuth(false);
        });
    }
  };
  useEffect(() => {
    // console.log("Raw token from localStorage:", storedToken);

    if (!storedToken || storedToken === "null" || storedToken.trim() === "") {
      // console.log("No valid token found — logging out");
      setAuth(false);
      return;
    }

    fetchUserData();
  }, [storedToken]);

  return (
    <>
      <Preloader />
      {activePage === "login" ? (
        <Login setActivePage={setActivePage}></Login>
      ) : (
        <Register setActivePage={setActivePage}></Register>
      )}
      <Background />
      <CookieConsent></CookieConsent>
    </>
  );
};

export default Index;
