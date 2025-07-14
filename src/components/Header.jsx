import { useNavigate } from 'react-router-dom';
import '../styles/components/Header.scss';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const isLoggedIn = Boolean(localStorage.getItem("accessToken")) && user;

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo" onClick={handleHome}>
          TRANG CHỦ
        </div>
        <div className="auth-buttons">
          {!isLoggedIn && (
            <>
              <button className="btn" onClick={handleRegister}>
                Đăng ký
              </button>
              <button className="btn" onClick={handleLogin}>
                Đăng nhập
              </button>
            </>
          )}

          {isLoggedIn && <UserMenu />}
        </div>
      </div>
    </header>
  );
}
