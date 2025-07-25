import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Otp from "../pages/auth/Otp";
import HotelSearchPage from "../pages/hotel/HotelSearchPage";
import AdminLayout from "../layouts/AdminLayout";
import AdminRoute from "./AdminRoute";
import CreateHotel from "../pages/admin/CreateHotel";
import BookingRoom from '../pages/hotel/BookingRoom'
import { getCurrentUser } from "../services/useService";
import { setUser, clearUser } from "../store/userSlice"
import CreateRoom from '../pages/admin/CreateRoom'
import ListRoom from "../pages/rooms/ListRoom";
import Booking from "../pages/rooms/Booking";
import BookingHistoryPage from '../pages/Booking/BookingHistoryPage ';
import BookingManagementPage from "../pages/admin/BookingManagementPage ";

export default function AppRouter() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getCurrentUser()
        .then((res) => {
          if (res?.success) {
            dispatch(setUser(res.data));
          } else {
            dispatch(clearUser());
            console.log("Token không hợp lệ hoặc user không tồn tại.");
          }
        })
        .catch((err) => {
          dispatch(clearUser());
          console.error("Lỗi load user:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      dispatch(clearUser());
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout chính của khách */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search-hotel" element={<HotelSearchPage />} />
          <Route path="/hotel" element={<BookingRoom/>} />
          <Route path="/rooms" element={<ListRoom />} />
          <Route path="/booking" element={<Booking/>} />
          <Route path="/booking-history" element={<BookingHistoryPage />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="hotels" element={<CreateHotel />} />
          <Route path="rooms" element={<CreateRoom />} />
          <Route path="booking-rooms" element={<BookingManagementPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
