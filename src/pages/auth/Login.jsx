import "../../styles/pages/login.scss";
import bgLogin from "../../assets/login.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";




export default function Login() {

const navigate = useNavigate();

const handleRegister = () => {
  navigate("/register")
}
  const handleGoBack = () => {
    navigate("/")
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${bgLogin})` }}
    >
      <div className="login-box">
        <FaArrowLeft className="back-icon" onClick={handleGoBack} />

        <h1 className="login-title">Đăng nhập</h1>
        <form>
          <div className="login-input-group">
            <span className="star">★</span>
            <input type="email" placeholder="Email" className="login-input" />
          </div>
          <div className="login-input-group">
            <span className="star">★</span>
            <input
              type="password"
              placeholder="Mật khẩu"
              className="login-input"
            />
          </div>
          <p className="login-text">
            Bạn chưa có tài khoản ?
          </p>
          <button type="button" className="login-btn register" onClick={handleRegister}>
            Đăng ký ngay
          </button>
          <button type="submit" className="login-btn">
            Đăng nhập
          </button>
          <button type="button" className="login-btn google">
            Đăng nhập với <FcGoogle className="google-icon" />
          </button>
        </form>
      </div>
    </div>
  );
}
