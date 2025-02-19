import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap";
import "react-bootstrap";
import "./layouts/style/style.css";
import "./layouts/style/Side&NavBar.css";
import "./App.css";

// USER ROUTES
import Index from "./pages/auth/Index";
import Home from "./pages/user/Home";
import RequestDocuments from "./pages/user/RequestDocument";
import About from "./pages/user/About";
// ADMIN ROUTES

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/RequestDocuments" element={<RequestDocuments />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
