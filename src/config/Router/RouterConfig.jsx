import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '/src/screens/login/Login.jsx';
import { Register } from "../../screens/register/Register";
import Home from "../../screens/home/Home";
import ResponsiveAppBar from "../../components/Navbar";
import ProtectedRoute from "./protectedRoute";

const RouterConfig = () => {
  return (
    <>
      <BrowserRouter>
        <ResponsiveAppBar/>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={<Home/>}/>}/>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterConfig;
