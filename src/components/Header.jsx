import { useNavigate } from 'react-router-dom';
import '../styles/components/Header.scss'

export default function Header() {
  const navigate = useNavigate(); 

  const handleLogin = () => {
    console.log(" zo zo zo zo ");

      navigate("login")
  }

  const handleRegister = () => {
    console.log(" zo zo zo zo ");
    
    navigate("register")
  }
 
  return (
    <header className="header">
      <div className="container">
        <div className="logo">TRANG CHỦ</div>
        <div className="auth-buttons">
          <button className="btn" onClick={handleRegister}>Đăng ký</button>
          <button className="btn"  onClick={handleLogin}>Đăng nhập</button>
        </div>
      </div>
    </header>
  );
}
