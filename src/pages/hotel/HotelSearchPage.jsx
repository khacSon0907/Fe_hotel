import { useState, useEffect } from "react";
import bannerImg from "../../assets/Banner.jpg";
import "../../styles/pages/HotelSearchPage.scss";
import { useNavigate } from "react-router-dom";
import { getAllHotels } from "../../services/hotelService";

export default function HotelSearchPage() {
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [hotels, setHotels] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const navigate = useNavigate(); // ✅ Thêm để điều hướng
  const districtsData = {
    "TP. HCM": [
      "Quận 1",
      "Quận 3",
      "Quận 4",
      "Quận 5",
      "Quận 6",
      "Quận 7",
      "Quận 8",
      "Quận 10",
      "Quận 11",
      "Quận 12",
      "Quận Bình Thạnh",
      "Quận Gò Vấp",
      "Quận Phú Nhuận",
      "Quận Tân Bình",
      "Quận Tân Phú",
      "Thành phố Thủ Đức",
      "Huyện Bình Chánh",
      "Huyện Cần Giờ",
      "Huyện Củ Chi",
      "Huyện Hóc Môn",
      "Huyện Nhà Bè",
    ],
    "Hà Nội": ["Hoàn Kiếm", "Ba Đình", "Đống Đa", "Thanh Xuân", "Cầu Giấy"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Ngũ Hành Sơn"],
    "Hải Phòng": ["Hồng Bàng", "Lê Chân", "Ngô Quyền"],
    "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng"],
  };

  const wardsData = {
    "Quận 1": ["Bến Nghé", "Bến Thành", "Cầu Kho", "Cầu Ông Lãnh", "Đa Kao", "Nguyễn Thái Bình", "Phạm Ngũ Lão", "Tân Định"],
    "Quận 3": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường Võ Thị Sáu"],
    "Quận 4": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 6", "Phường 8", "Phường 9", "Phường 10", "Phường 13", "Phường 14", "Phường 15", "Phường 16", "Phường 18"],
    "Quận 5": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận 6": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14"],
    "Quận 7": ["Tân Phú", "Tân Thuận Đông", "Tân Thuận Tây", "Tân Kiểng", "Tân Hưng", "Phú Thuận", "Bình Thuận", "Tân Quy", "Tân Phong", "Phú Mỹ"],
    "Quận 8": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16"],
    "Quận 10": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận 11": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16"],
    "Quận 12": ["An Phú Đông", "Đông Hưng Thuận", "Hiệp Thành", "Tân Chánh Hiệp", "Tân Thới Hiệp", "Tân Thới Nhất", "Thạnh Lộc", "Thạnh Xuân", "Thới An", "Trung Mỹ Tây"],
    "Quận Bình Thạnh": ["Phường 1", "Phường 2", "Phường 3", "Phường 5", "Phường 6", "Phường 7", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 17", "Phường 19", "Phường 21", "Phường 22", "Phường 24", "Phường 25", "Phường 26", "Phường 27", "Phường 28"],
    "Quận Gò Vấp": ["Phường 1", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15", "Phường 16", "Phường 17"],
    "Quận Phú Nhuận": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 13", "Phường 15", "Phường 17"],
    "Quận Tân Bình": ["Phường 1", "Phường 2", "Phường 3", "Phường 4", "Phường 5", "Phường 6", "Phường 7", "Phường 8", "Phường 9", "Phường 10", "Phường 11", "Phường 12", "Phường 13", "Phường 14", "Phường 15"],
    "Quận Tân Phú": ["Phường Tân Sơn Nhì", "Phường Tây Thạnh", "Phường Sơn Kỳ", "Phường Tân Quý", "Phường Tân Thành", "Phường Phú Thọ Hòa", "Phường Phú Thạnh", "Phường Phú Trung", "Phường Hòa Thạnh", "Phường Hiệp Tân", "Phường Tân Thới Hòa"],
    "Thành phố Thủ Đức": ["Bình Chiểu", "Bình Thọ", "Hiệp Bình Chánh", "Hiệp Bình Phước", "Hiệp Phú", "Linh Chiểu", "Linh Đông", "Linh Tây", "Linh Trung", "Linh Xuân", "Phước Bình", "Phước Long A", "Phước Long B", "Tam Bình", "Tam Phú", "Tăng Nhơn Phú A", "Tăng Nhơn Phú B", "Thạnh Mỹ Lợi", "Thảo Điền", "Trường Thọ"],
    "Huyện Bình Chánh": ["Bình Chánh", "Bình Hưng", "Bình Lợi", "Đa Phước", "Hưng Long", "Lê Minh Xuân", "Phạm Văn Hai", "Quy Đức", "Tân Kiên", "Tân Nhựt", "Tân Quý Tây", "Tân Túc", "Vĩnh Lộc A", "Vĩnh Lộc B"],
    "Huyện Cần Giờ": ["An Thới Đông", "Bình Khánh", "Cần Thạnh", "Long Hòa", "Lý Nhơn", "Tam Thôn Hiệp", "Thạnh An"],
    "Huyện Củ Chi": ["An Nhơn Tây", "An Phú", "Bình Mỹ", "Hòa Phú", "Nhuận Đức", "Phạm Văn Cội", "Phú Hòa Đông", "Phú Mỹ Hưng", "Phước Hiệp", "Phước Thạnh", "Phước Vĩnh An", "Tân An Hội", "Tân Phú Trung", "Tân Thông Hội", "Thái Mỹ", "Trung An", "Trung Lập Hạ", "Trung Lập Thượng"],
    "Huyện Hóc Môn": ["Bà Điểm", "Đông Thạnh", "Nhị Bình", "Tân Hiệp", "Tân Thới Nhì", "Tân Xuân", "Thới Tam Thôn", "Trung Chánh", "Xuân Thới Đông", "Xuân Thới Sơn", "Xuân Thới Thượng"],
    "Huyện Nhà Bè": ["Hiệp Phước", "Long Thới", "Nhà Bè", "Nhơn Đức", "Phú Xuân", "Phước Kiển", "Phước Lộc"],
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

        // Mặc định load Hồ Chí Minh
        const filteredHotels = hotelsData.filter((hotel) => hotel.city === "TP. HCM");
        setHotels(filteredHotels);
        setCity("TP. HCM");
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
            style={{ maxHeight: "300px", overflowY: "auto" }}
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
            style={{ maxHeight: "300px", overflowY: "auto" }}
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
            style={{ maxHeight: "300px", overflowY: "auto" }}
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
              <div 
                className={`hotel-card ${hotel.availableRooms === 0 ? 'sold-out' : ''}`} 
                key={hotel.id}
                onClick={() => navigate(`/rooms?hotelId=${hotel.hotelId}`)} // ✅ Khi click chuyển sang trang phòng
              >
                <img
                  src={hotel.images}
                  alt={hotel.hotelName || hotel.name}
                />
                {hotel.availableRooms === 0 && (
                  <div className="sold-out-overlay">
                    <span className="sold-out-text">HẾT PHÒNG</span>
                  </div>
                )}
                <div className="hotel-info">
                  <div className="hotel-name">
                    {hotel.hotelName || hotel.name}
                  </div>
                  <div className="hotel-rating">
                    {renderStars(hotel.rating || 0)} ({hotel.rating || 0}/5)
                  </div>
                  <div className="hotel-desc">
                    {hotel.description || "Không có mô tả"}
                  </div>
                  <div className="hotel-address">
                    {hotel.ward && hotel.district && hotel.city
                      ? `Phường ${hotel.ward}, Quận ${hotel.district}, ${hotel.city}`
                      : hotel.address || "Địa chỉ không có sẵn"}
                  </div>
                  <div className="room-availability">
                    {hotel.availableRooms === 0 ? (
                      <span className="no-rooms">Khách sạn đã hết phòng</span>
                    ) : (
                      <span className="available-rooms">
                        Còn {hotel.availableRooms} phòng trống
                      </span>
                    )}
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