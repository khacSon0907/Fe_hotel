import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getRoomsByHotelId } from "../../services/hotelService";
import "../../styles/pages/ListRoom.scss";

export default function ListRoom() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotelId");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      console.log("📦 Đang fetch phòng cho hotelId:", hotelId);
      const res = await getRoomsByHotelId(hotelId);
      console.log("✅ Dữ liệu trả về:", res);
      setRooms(res.data || []);
    } catch (err) {
      console.error("❌ Lỗi khi load danh sách phòng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hotelId) {
      fetchRooms();
    } else {
      console.warn("⚠️ Không có hotelId trong URL");
      setLoading(false);
    }
  }, [hotelId]);

  if (loading)
    return <div className="loading">Đang tải danh sách phòng...</div>;

  const handleBookRoom = (room) => {
    navigate("/booking", {
      state: { room, hotelId }, // truyền room object và hotelId
    });
  };

  return (
    <div className="list-room">
      <h2 className="list-room__title">📋 Danh sách phòng khách sạn</h2>

      {rooms.length === 0 ? (
        <p className="list-room__empty">Không có phòng nào được tìm thấy.</p>
      ) : (
        <div className="room-grid">
          {rooms.map((room) => (
            <div key={room.roomId} className="room-card">
              <div className="room-card__image-wrapper">
                <img
                  src={room.roomImage}
                  alt={room.nameRoom}
                  className="room-card__image"
                />
                <div className="room-card__status">
                  {room.isAvailable ? (
                    <span className="status status--available">
                      ✅ Còn phòng
                    </span>
                  ) : (
                    <span className="status status--unavailable">
                      ❌ Hết phòng
                    </span>
                  )}
                </div>
              </div>
              <div className="room-card__content">
                <h3 className="room-card__title">
                  {room.nameRoom} – {room.roomType}
                </h3>
                <p className="room-card__description">{room.description}</p>
                <div className="room-card__info">
                  <div className="info-item">
                    <span className="info-item__label">Giá:</span>
                    <span className="info-item__value">
                      {room.pricePerNight?.toLocaleString()} VND / đêm
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-item__label">Số Người</span>
                    <span className="info-item__value">
                      {room.maxGuests} khách
                    </span>
                  </div>
                  <button
                    className="book-button"
                    disabled={!room.isAvailable}
                    onClick={() => handleBookRoom(room)}
                  >
                    Đặt phòng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
