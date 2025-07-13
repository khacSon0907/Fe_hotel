import React, { useState } from "react";
import "../../styles/pages/register.scss";
import backgroundRegister from "../../assets/backgroundRegister.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/useService";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await registerUser(form);
      console.log("✅ Register response:", res);

      
      const token = res?.data?.token;
      const email = res?.data?.email || form.email;

      if (res.success && token) {
        localStorage.setItem("registerToken", token);
        localStorage.setItem("registerEmail", email);

        setMessage({
          type: "success",
          text: res.message || "Đăng ký thành công!",
        });

        navigate("/otp");
      } else {
        setMessage({
          type: "error",
          text: res.message || "Đăng ký thất bại. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error("❌ Register error:", error);
      setMessage({
        type: "error",
        text:
          error?.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="register-container"
      style={{ backgroundImage: `url(${backgroundRegister})` }}
    >
      <div className="register-card">
        <h2 className="register-title">ĐĂNG KÝ TÀI KHOẢN</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-input-group">
            <span className="star">★</span>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="register-input"
              value={form.fullname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-input-group">
            <span className="star">★</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="register-input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-input-group password-group">
            <span className="star">★</span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="register-input"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span className="toggle-eye" onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="register-input-group">
            <span className="star">★</span>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Số điện thoại"
              className="register-input"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Đang xử lý..." : "ĐĂNG KÝ"}
          </button>
        </form>

        <button className="register-button google" onClick={handleLogin}>
          ĐĂNG NHẬP
        </button>

        {message && (
          <p
            className={
              message.type === "error" ? "error-text" : "success-text"
            }
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
