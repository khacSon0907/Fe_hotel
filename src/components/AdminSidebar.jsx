import { NavLink } from "react-router-dom";

import "../styles/components/AdminSidebar.scss";

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">Quản lý Hotel</div>

      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/admin/hotels"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Quản lý khách sản
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/rooms"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Quản lý Phòng
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/booking-rooms"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Quản lý Đặt Phòng
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/categories"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Quản lý Dịch vụ
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
