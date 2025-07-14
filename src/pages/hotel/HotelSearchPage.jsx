import { useState } from "react";
import bannerImg from '../../assets/Banner.jpg';
import '../../styles/pages/HotelSearchPage.scss';

export default function HotelSearchPage() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [hotels, setHotels] = useState([]);

  const districtsData = {
    "Hà Nội": ["Hoàn Kiếm", "Ba Đình", "Đống Đa"],
    "TP. HCM": ["Quận 1", "Quận 3", "Quận 5"],
  };

  const wardsData = {
    "Hoàn Kiếm": ["Lê Lợi", "Tràng Tiền"],
    "Ba Đình": ["Điện Biên", "Kim Mã"],
    "Quận 1": ["Bến Thành", "Nguyễn Thái Bình"],
  };

  const handleSearch = () => {
    const dummyHotels = [
      {
        id: 1,
        hotelName: "Luxury Hotel",
        rating: 4.5,
        description: "Khách sạn sang trọng gần trung tâm thành phố.",
        city: "Hà Nội",
        district: "Hoàn Kiếm",
        ward: "Lê Lợi",
        image:
          "https://via.placeholder.com/300x200?text=Luxury",
      },
      {
        id: 2,
        hotelName: "Cozy Hotel",
        rating: 3.0,
        description: "Khách sạn giá tốt, đầy đủ tiện nghi.",
        city: "TP. HCM",
        district: "Quận 1",
        ward: "Bến Thành",
        image:
          "https://via.placeholder.com/300x200?text=Cozy",
      },
    ];

    const filtered = dummyHotels.filter(
      (h) =>
        (city ? h.city === city : true) &&
        (district ? h.district === district : true) &&
        (ward ? h.ward === ward : true)
    );

    setHotels(filtered);
  };

  return (
    <div
      className="hotel-search-page"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className="overlay">
        <h1>TRẢI NGHIỆM ĐẲNG CẤP 5 SAO</h1>
        <p>ĐẶT PHÒNG NHANH CHÓNG – GIÁ ƯU ĐÃI MỖI NGÀY</p>

        <div className="search-bar">
          <select
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setDistrict("");
              setWard("");
            }}
          >
            <option value="">Chọn Tỉnh/Thành</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP. HCM">TP. HCM</option>
          </select>

          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setWard("");
            }}
          >
            <option value="">Chọn Quận/Huyện</option>
            {districtsData[city]?.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <select
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          >
            <option value="">Chọn Phường/Xã</option>
            {wardsData[district]?.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>

          <button onClick={handleSearch}>ĐẶT NGAY</button>
        </div>

        <div className="hotel-list">
          {hotels.map((hotel) => (
            <div className="hotel-card" key={hotel.id}>
              <img src={hotel.image} alt={hotel.hotelName} />
              <div className="hotel-info">
                <div className="hotel-name">{hotel.hotelName}</div>
                <div className="hotel-rating">
                  {renderStars(hotel.rating)} ({hotel.rating}/5)
                </div>
                <div className="hotel-desc">{hotel.description}</div>
                <div className="hotel-address">
                  {`Phường ${hotel.ward}, Quận ${hotel.district}, ${hotel.city}`}
                </div>
              </div>
            </div>
          ))}

          {hotels.length === 0 && (
            <p className="no-result">Chưa có kết quả tìm kiếm.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {"★".repeat(fullStars)}
      {halfStar && "☆"}
      {"☆".repeat(emptyStars)}
    </>
  );
}
