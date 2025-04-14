import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export const GooleLogin = () => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  useEffect(() => {
    // Load the Google API script
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        initializeGoogleButton();
      };
    };

    loadGoogleScript();
  }, []);

  const initializeGoogleButton = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID, // Replace with your actual client ID
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleLoginButton"),
        {
          //   theme: "filled_white",
          size: "large",
          shape: "rectangular",
          text: "signin_with",
        }
      );
    }
  };

  const handleGoogleResponse = (response) => {
    // Send the token to your backend
    axios
      .post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/google-login`,
        {
          token: response.credential,
        }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          // Store the token in localStorage
          localStorage.setItem("token", res.data.token);

          // Show success alert
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: res.data.message,
            confirmButtonColor: "#3085d6",
          }).then(() => {
            // Redirect based on admin status
            if (res.data.isAdmin) {
              navigate("/admin/home");
            } else {
              navigate("/home");
            }
          });
        } else {
          // Show error alert
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: res.data.Error || "Login failed",
          });
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred during login",
        });
      });
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-center mb-2">
        <div className="bg-white" style={{ height: "1px", flex: 1 }}></div>
        <p className="m-0 mx-3 text-center text-white">Sign in with Google</p>
        <div className="bg-white" style={{ height: "1px", flex: 1 }}></div>
      </div>
      <div
        className="google-login-container d-flex justify-content-center align-items-center bg-white rounded py-1"
        style={{ width: "100%" }}
      >
        <div className="" id="googleLoginButton" style={{}}></div>
      </div>
    </>
  );
};
