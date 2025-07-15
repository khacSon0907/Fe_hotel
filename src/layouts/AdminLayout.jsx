import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import '../styles/layouts/AdminLayout.scss'


export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}
