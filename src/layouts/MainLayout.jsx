import React, { Children, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./SideBar/SideBar";
import NavBar from "./SideBar/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // if (!auth) {
  //   alert("not logged in");
  //   navigate("/");
  // }

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

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/auth/logout")
      .then((res) => {
        location.reload(true);
      })
      .catch((err) => console.log(err));
  };

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
        {auth ? (
          <>
            <p>--- {id} --- you are authorized</p>
            <button className="btn btn-danger" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <p>{message}</p>
          </>
        )}
        <div className="d-flex">
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
      </div>
    </>
  );
};

export default MainLayout;
