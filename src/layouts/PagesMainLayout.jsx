import React, { Children, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./SideBar/SideBar";
import NavBar from "./SideBar/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Home from "../pages/userPageComponents/Home";

const PagesMainLayout = () => {
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setId(res.data.userID);
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
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/auth/fetchUserData?userID=${id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.log("Error fetching user data:", err));
    }
  }, [id]);

  useEffect(() => {
    if (!isLoading && !auth) {
      navigate("/");
    }
  }, [auth, isLoading, navigate]);
  return (
    <>
      <div
        className="w-100 d-flex flex-column"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <div className="d-flex">
          <div>
            <SideBar></SideBar>
          </div>
          <div className="w-100">
            <NavBar user={user}></NavBar>
            <div className="d-flex justify-content-center align-items-center">
              <Home user={user}></Home>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PagesMainLayout;
