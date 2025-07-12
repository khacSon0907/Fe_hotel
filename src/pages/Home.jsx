import React from 'react';
import '../styles/pages/Home.scss';
import bgImage from '../assets/Banner.jpg';

export default function Home() {
  return (
    <div>
      {/* PHẦN HEADER CÓ HÌNH NỀN */}
      <div
        className="home"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="home__content">
          <h1 className="home__title">TRẢI NGHIỆM ĐẲNG CẤP 5 SAO</h1>
          <p className="home__subtitle">
            Đặt phòng nhanh chóng – Giá ưu đãi mỗi ngày
          </p>
          <button className="home__cta-btn">ĐẶT NGAY</button>
        </div>
      </div>

      {/* PHẦN 3 ITEM Ở DƯỚI */}
      <div className="home__features">
        <div className="feature-item">
          <h3>🌟 Dịch vụ chuyên nghiệp</h3>
          <p>Nhân viên phục vụ 24/7, thân thiện và tận tâm.</p>
        </div>
        <div className="feature-item">
          <h3>🛏️ Phòng nghỉ hiện đại</h3>
          <p>Trang thiết bị tiện nghi, không gian thoải mái.</p>
        </div>
        <div className="feature-item">
          <h3>🍽️ Ẩm thực đa dạng</h3>
          <p>Thưởng thức món ngon 3 miền và quốc tế ngay tại khách sạn.</p>
        </div>
      </div>
    </div>
  );
}
