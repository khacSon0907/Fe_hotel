import { useState, useEffect } from "react";
import bannerImg from '../../assets/Banner.jpg';
import '../../styles/pages/HotelSearchPage.scss';

import { getAllHotels } from '../../services/hotelService';

export default function HotelSearchPage() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const districtsData = {
    "Hà Nội": ["Hoàn Kiếm", "Ba Đình", "Đống Đa", "Thanh Xuân", "Cầu Giấy"],
    "TP. HCM": ["Quận 1", "Quận 3", "Quận 5", "Quận 7", "Quận Thủ Đức"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Ngũ Hành Sơn"],
    "Hải Phòng": ["Hồng Bàng", "Lê Chân", "Ngô Quyền"],
    "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng"],
  };

  const wardsData = {
    "Hoàn Kiếm": ["Lê Lợi", "Tràng Tiền", "Hàng Bạc"],
    "Ba Đình": ["Điện Biên", "Kim Mã", "Ngọc Hà"],
    "Thanh Xuân": ["Khương Đình", "Hạ Đình", "Thanh Xuân Trung"],
    "Cầu Giấy": ["Dịch Vọng", "Yên Hòa", "Nghĩa Tân"],

    "Quận 1": ["Bến Thành", "Nguyễn Thái Bình", "Phạm Ngũ Lão"],
    "Quận 3": ["Phường 4", "Phường 7", "Phường Võ Thị Sáu"],
    "Quận Thủ Đức": ["Hiệp Bình Phước", "Linh Tây", "Trường Thọ"],
    
    "Hải Châu": ["Nam Dương", "Phước Ninh", "Thạch Thang"],
    "Thanh Khê": ["Tân Chính", "Vĩnh Trung", "Xuân Hà"],
    
    "Hồng Bàng": ["Quang Trung", "Phan Bội Châu"],
    "Lê Chân": ["An Biên", "An Dương"],
    
    "Ninh Kiều": ["Tân An", "An Phú"],
    "Cái Răng": ["Hưng Phú", "Lê Bình"],
  };

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getAllHotels();
        console.log("API Response:", response);

        const hotelsData =
          response?.data && Array.isArray(response.data)
            ? response.data
            : Array.isArray(response)
            ? response
            : [];

        setAllHotels(hotelsData);
        setHotels(hotelsData);
      } catch (error) {
        console.error("Lỗi gọi API getAllHotels:", error);
        setError("Không thể tải danh sách khách sạn");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleSearch = () => {
    if (!city && !district && !ward) {
      setHotels(allHotels);
      return;
    }

    const filtered = allHotels.filter((hotel) => {
      const cityMatch = city ? hotel.city === city : true;
      const districtMatch = district ? hotel.district === district : true;
      const wardMatch = ward ? hotel.ward === ward : true;

      return cityMatch && districtMatch && wardMatch;
    });

    setHotels(filtered);
  };

  const handleReset = () => {
    setCity("");
    setDistrict("");
    setWard("");
    setHotels(allHotels);
  };

  return (
    <div
      className="hotel-search-page"
      style={{ backgroundImage: `url(${bannerImg})` }}
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
            {Object.keys(districtsData).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
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

          <button onClick={handleSearch}>TÌM KIẾM</button>
          <button onClick={handleReset} style={{ marginLeft: "10px" }}>
            RESET
          </button>
        </div>

        {loading && <p>Đang tải dữ liệu...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="hotel-list">
          {!loading &&
            !error &&
            hotels.map((hotel) => (
              <div className="hotel-card" key={hotel.id}>
                <img
                  src={hotel.images}
                  alt={hotel.hotelName || hotel.name}
                />
                <div className="hotel-info">
                  <div className="hotel-name">
                    {hotel.hotelName || hotel.name}
                  </div>
                  <div className="hotel-rating">
                    {renderStars(hotel.rating || 0)} (
                    {hotel.rating || 0}/5)
                  </div>
                  <div className="hotel-desc">
                    {hotel.description || "Không có mô tả"}
                  </div>
                  <div className="hotel-address">
                    {hotel.ward && hotel.district && hotel.city
                      ? `Phường ${hotel.ward}, Quận ${hotel.district}, ${hotel.city}`
                      : hotel.address || "Địa chỉ không có sẵn"}
                  </div>
                </div>
              </div>
            ))}

          {!loading && !error && hotels.length === 0 && (
            <p className="no-result">
              {allHotels.length === 0
                ? "Không có dữ liệu khách sạn."
                : "Không tìm thấy khách sạn phù hợp với tiêu chí tìm kiếm."}
            </p>
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
