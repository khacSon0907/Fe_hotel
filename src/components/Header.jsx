
import '../styles/components/Header.scss'

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">TRANG CHỦ</div>
        <div className="auth-buttons">
          <button className="btn">Đăng ký</button>
          <button className="btn">Đăng nhập</button>
        </div>
      </div>
    </header>
  );
}
