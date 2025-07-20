import { useNavigate } from 'react-router-dom';
import '../styles/components/Header.scss';
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';

export default function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = Boolean(localStorage.getItem("accessToken")) && user;

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className="header">
      <div className="container">
        {/* Menu trái */}
        <nav className="nav-left">
          <span className="nav-item" onClick={() => handleNavigate('/')}>TRANG CHỦ</span>
          <span className="nav-item" onClick={() => handleNavigate('/search-hotel')}>TÌM KHÁCH SẠN</span>
          <span className="nav-item" onClick={() => handleNavigate('/offers')}>ƯU ĐÃI</span>
          <span className="nav-item" onClick={() => handleNavigate('/contact')}>LIÊN HỆ</span>
        </nav>

        {/* Menu phải */}
        <div className="auth-buttons">
          {!isLoggedIn ? (
            <>
              <button className="btn btn-register" onClick={() => handleNavigate('/register')}>ĐĂNG KÝ</button>
              <button className="btn btn-resgiter" onClick={() => handleNavigate('/login')}>ĐĂNG NHẬP</button>
            </>
          ) : (
            <UserMenu />
          )}
        </div>
      </div>
    </header>
  );
}
