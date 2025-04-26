import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./SideBar/SideBar";
import NavBar from "./SideBar/NavBar";
import axios from "axios";
import { useNavigate, Outlet } from "react-router-dom";
import "boxicons";
import NewAccountPopup from "../components/NewAccount/NewAccountPopup";

const MainLayout = () => {
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  axios.defaults.withCredentials = true;

  const fetchUserData = () => {
    const storedToken = localStorage.getItem("token");
    // console.log("Raw token from localStorage to be sent:", storedToken);

    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setUser(res.data.data);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
          localStorage.removeItem("formData");
          localStorage.removeItem("token");
        }
      })
      .catch((err) => {
        // console.log("Error fetching user:", err.response?.data || err.message);
        setAuth(false);
        localStorage.removeItem("formData");
        localStorage.removeItem("token");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    // console.log("Raw token from localStorage:", storedToken);

    if (!storedToken || storedToken === "null" || storedToken.trim() === "") {
      // console.log("No valid token found — logging out");
      setAuth(false);
      setIsLoading(false);
      localStorage.removeItem("formData");
      localStorage.removeItem("token");
      return;
    }

    fetchUserData();
  }, [storedToken]);

  useEffect(() => {
    if (!isLoading && !auth) {
      navigate("/");
    }
  }, [auth, isLoading, navigate]);

  return (
    <div
      className="w-100 d-flex flex-column custom-scrollbar "
      style={{
        backgroundColor: "var(--bodyBackground-color)",
      }}
    >
      {!user.isAdmin && user.isNewAccount ? (
        <NewAccountPopup user={user} />
      ) : null}{" "}
      <div className="d-flex overflow-hidden" style={{ height: "" }}>
        <div className="d-none d-md-block" style={{ zIndex: "1000" }}>
          <SideBar user={user} />
        </div>
        <div className="w-100" style={{ height: "100dvh" }}>
          <NavBar user={user} />
          <div
            className="d-flex justify-content-center pt-2 p-md-4 overflow-hidden"
            style={{ zIndex: "0", height: "95%" }}
          >
            <Outlet context={{ user, fetchUserData }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
