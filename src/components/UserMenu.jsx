import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import noavatar from "../assets/noavatar.png";
import '../styles/components/userMenu.scss'

export default function UserMenu() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const isLoggedIn = Boolean(localStorage.getItem("accessToken")) && user;

  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleChangePassWord = () => {
    navigate("/change-password");
    handleClose();
  };

  const handleAdmin = () => {
    navigate("/admin");
    handleClose();
  };

  const handleHome = () => {
    navigate("/");
    handleClose();
  };


  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  // Bấm ngoài menu thì đóng
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isLoggedIn) {
    return (
      <button className="btn-login" onClick={handleLogin}>
        <i className="fas fa-sign-in-alt"></i> Đăng nhập
      </button>
    );
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <div className="user-avatar" onClick={handleToggle}>
        <img
          src={user?.avatarUrl || noavatar}
          alt="avatar"
          className="avatar-img"
        />
      </div>

      {open && (
        <div className="user-dropdown">
          <div className="user-info">
            <strong>{user?.fullname}</strong>
            {user?.role === "ADMIN" && (
              <span className="admin-badge">Admin</span>
            )}
          </div>
          <ul>
            <li onClick={handleProfile}>
              <i className="fas fa-user"></i> Hồ sơ
            </li>
            {user?.authProvider !== "GOOGLE" && (
              <li onClick={handleChangePassWord}>
                <i className="fas fa-lock"></i> Đổi mật khẩu
              </li>
            )}

            {user?.role === "ADMIN" && (
              <>
                <li onClick={handleAdmin}>
                  <i className="fas fa-tools"></i> Quản trị
                </li>
                <li onClick={handleHome}>
                  <i className="fas fa-home"></i> Home
                </li>
              </>
            )}
            <li onClick={handleLogout} className="logout">
              <i className="fas fa-sign-out-alt"></i> Đăng xuất
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
