import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../../screens/login/Login";
import { Register } from "../../screens/register/Register";
import Home from "../../screens/home/Home";
import ResponsiveAppBar from "../../components/Navbar";

const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterConfig;
