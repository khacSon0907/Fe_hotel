import React from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Otp from "../pages/auth/Otp";

export default function AppRouter() {
  return <BrowserRouter>
            <Routes>
                <Route  element = {<MainLayout/>}>
                    <Route path="/" element= {<Home/>}/>
                </Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/otp" element={<Otp/> }/>
            </Routes>
        </BrowserRouter>;
}
