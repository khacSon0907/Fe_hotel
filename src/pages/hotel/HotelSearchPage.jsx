import { useState, useEffect } from "react";
import bannerImg from '../../assets/Banner.jpg';
import '../../styles/pages/HotelSearchPage.scss';

import { getAllHotels } from '../../services/hotelService';

export default function HotelSearchPage() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]); // Lưu trữ tất cả hotels từ API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const districtsData = {
    "Hà Nội": ["Hoàn Kiếm", "Ba Đình", "Đống Đa"],
    "TP. HCM": ["Quận 1", "Quận 3", "Quận 5"],
  };

  const wardsData = {
    "Hoàn Kiếm": ["Lê Lợi", "Tràng Tiền"],
    "Ba Đình": ["Điện Biên", "Kim Mã"],
    "Quận 1": ["Bến Thành", "Nguyễn Thái Bình"],
  };

  // Fetch hotels từ API khi component mount
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getAllHotels();
        console.log("API Response:", response);
        
        // Kiểm tra cấu trúc response và lấy data
        if (response && response.data && Array.isArray(response.data)) {
          setAllHotels(response.data);
          setHotels(response.data); // Hiển thị tất cả hotels ban đầu
        } else if (response && Array.isArray(response)) {
          setAllHotels(response);
          setHotels(response);
        } else {
          console.error("Unexpected API response structure:", response);
          setError("Dữ liệu không đúng định dạng");
        }
      } catch (error) {
        console.error("Lỗi gọi API getAllHotels:", error);
        setError("Không thể tải danh sách khách sạn");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Hàm tìm kiếm hotels
  const handleSearch = () => {
    if (!city && !district && !ward) {
      // Nếu không có filter nào, hiển thị tất cả
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

  // Hàm reset tìm kiếm
  const handleReset = () => {
    setCity("");
    setDistrict("");
    setWard("");
    setHotels(allHotels);
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

          <button onClick={handleSearch}>TÌM KIẾM</button>
          <button onClick={handleReset} style={{ marginLeft: '10px' }}>
            RESET
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="loading">
            <p>Đang tải dữ liệu...</p>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="error">
            <p style={{ color: 'red' }}>{error}</p>
          </div>
        )}

        {/* Hotels list */}
        <div className="hotel-list">
          {!loading && !error && hotels.map((hotel) => (
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
                  {renderStars(hotel.rating || 0)} ({hotel.rating || 0}/5)
                </div>
                <div className="hotel-desc">
                  {hotel.description || 'Không có mô tả'}
                </div>
                <div className="hotel-address">
                  {hotel.ward && hotel.district && hotel.city ? 
                    `Phường ${hotel.ward}, Quận ${hotel.district}, ${hotel.city}` :
                    hotel.address || 'Địa chỉ không có sẵn'
                  }
                </div>
              </div>
            </div>
          ))}

          {!loading && !error && hotels.length === 0 && (
            <p className="no-result">
              {allHotels.length === 0 ? 
                "Không có dữ liệu khách sạn." : 
                "Không tìm thấy khách sạn phù hợp với tiêu chí tìm kiếm."
              }
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