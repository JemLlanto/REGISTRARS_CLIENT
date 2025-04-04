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

  axios.defaults.withCredentials = true;

  const fetchUserData = () => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setUser(res.data.data);
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .catch((err) => {
        console.log(err);
        setAuth(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   if (id) {
  //     axios
  //       .get(`${
  //   import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
  // }/api/auth/fetchUserData?userID=${id}`)
  //       .then((res) => setUser(res.data))
  //       .catch((err) => console.log("Error fetching user data:", err));
  //   }
  // }, [id]);

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
        height: "100dvh",
        overflow: "auto", // Ensures scrolling when content overflows
      }}
    >
      {!user.isAdmin && user.isNewAccount ? (
        <NewAccountPopup user={user} />
      ) : null}{" "}
      <div className="d-flex overflow-hidden" style={{ height: "100dvh" }}>
        <div className="d-none d-md-block" style={{ zIndex: "1000" }}>
          <SideBar user={user} />
        </div>
        <div className="w-100">
          <NavBar user={user} />
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ zIndex: "0" }}
          >
            <Outlet context={{ user, fetchUserData }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
