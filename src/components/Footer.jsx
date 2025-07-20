
import '../styles/components/Footer.scss'
import appStore from '../assets/appStore.png';
import googlePlay from '../assets/playstore.png';

export default function Footer() {
  return (
     <footer className="footer">
      <div className="container">
        {/* Logo + dòng đầu */}
        <div className="footer-top">
          <div className="footer-logo">
            <h2>Hotel Luxury</h2>
            <p>© 2025 Luxury Vietnam</p>
          </div>
        </div>

        {/* Các cột nội dung */}
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Về Traveloka</h4>
            <ul>
              <li>Cách đặt chỗ</li>
              <li>Liên hệ chúng tôi</li>
              <li>Trợ giúp</li>
              <li>Tuyển dụng</li>
              <li>Về chúng tôi</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Sản phẩm</h4>
            <ul>
              <li>Khách sạn</li>
              <li>Vé máy bay</li>
              <li>Vé xe khách</li>
              <li>Đưa đón sân bay</li>
              <li>Cho thuê xe</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Khác</h4>
            <ul>
              <li>Traveloka Blog</li>
              <li>Chính sách quyền riêng</li>
              <li>Điều khoản & Điều kiện</li>
              <li>Đăng ký nơi nghỉ của bạn</li>
              <li>Liên hệ báo chí</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Theo dõi chúng tôi</h4>
            <ul className="socials">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Youtube</li>
              <li>TikTok</li>
              <li>Telegram</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Tải ứng dụng Traveloka</p>
          <div className="store-links">
            <img src={googlePlay} alt="Google Play" />
            <img src={appStore} alt="App Store" />
          </div>
        </div>
      </div>
    </footer>
  )
}
