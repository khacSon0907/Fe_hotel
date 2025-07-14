import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import "../styles/layouts/MainLayout.scss";
import { getCurrentUser } from "../services/useService";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../store/userSlice";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getCurrentUser()
        .then((res) => {
          if (res?.success) {
            console.log(" trang home ", res);
            
            dispatch(setUser(res.data));
          } else {
            dispatch(clearUser());
            console.log("Token không hợp lệ hoặc user không tồn tại.");
          }
        })
        .catch((err) => {
          dispatch(clearUser());
          console.error("Lỗi load user:", err);
        });
    } else {
      dispatch(clearUser());
    }
  }, [dispatch]);

  return (
    <div className="main-layout">
      <Header />
      <div className={`page-content ${isHome ? "home-page" : ""}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
