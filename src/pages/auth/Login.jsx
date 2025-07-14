import "../../styles/pages/login.scss";
import bgLogin from "../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth";

import {
  loginUser,
  getCurrentUser,
  loginWithGoogle,
} from "../../services/useService";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ GOOGLE LOGIN
  const handleLoginWithGoogle = async () => {
    try {
      // login popup Google
      const result = await signInWithPopup(auth, provider);

      const idToken = await result.user.getIdToken();

      // gửi idToken lên backend
      const res = await loginWithGoogle(idToken);

      console.log("res", res);

      const accessToken = res?.data?.accessToken || res?.accessToken;

      if (res.success && accessToken) {
        // Lưu token
        localStorage.setItem("accessToken", accessToken);

        // Lấy thông tin user
        const userRes = await getCurrentUser();

        dispatch(setUser(userRes.data));

        Swal.fire({
          icon: "success",
          title: "Đăng nhập Google thành công!",
          text: res.message || "",
        }).then(() => {
          if (userRes.data.role === "ADMIN") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        });
      } else {
        throw new Error(res.message || "Đăng nhập Google thất bại");
      }
    } catch (err) {
      console.log("err", err);
      const msg = err?.response?.data?.message || err.message;
      Swal.fire({
        icon: "error",
        title: "Đăng nhập Google thất bại",
        text: msg,
      });
    }
  };

  // ✅ LOCAL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form);
      console.log(" res login thanh cong ,", res);

      const accessToken = res?.data?.accessToken;

      if (res.success && accessToken) {
        localStorage.setItem("accessToken", accessToken);

        const userRes = await getCurrentUser();
        console.log(" user res ", userRes);

        dispatch(setUser(userRes?.data || null));

        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công!",
          text: res.message || "",
        }).then(() => {
          navigate("/");
        });
      } else {
        throw new Error(res.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      Swal.fire({
        icon: "error",
        title: "Đăng nhập thất bại",
        text: msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgLogin})` }}>
      <div className="login-box">
        <FaArrowLeft className="back-icon" onClick={handleGoBack} />

        <h1 className="login-title">Đăng nhập</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <span className="star">★</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="login-input"
              required
            />
          </div>
          <div className="login-input-group">
            <span className="star">★</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className="login-input"
              required
            />
          </div>
          <p className="login-text">Bạn chưa có tài khoản ?</p>
          <button
            type="button"
            className="login-btn register"
            onClick={handleRegister}
          >
            Đăng ký ngay
          </button>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
          <button
            type="button"
            className="login-btn google"
            onClick={handleLoginWithGoogle}
          >
            Đăng nhập với <FcGoogle className="google-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}
