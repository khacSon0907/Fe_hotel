
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../../styles/pages/bookingroom.scss'
export default function BookingRoom() {
  return (
    <div className="booking-room">
      <button className="btn-booking">ĐẶT PHÒNG</button>

      <div className="booking-form">
        <select>
          <option>Loại phòng</option>
          <option>Phòng đơn</option>
          <option>Phòng đôi</option>
          <option>Phòng VIP</option>
        </select>
        <input type="number" placeholder="Ngày" />
        <input type="number" placeholder="Tháng" />
        <input type="number" placeholder="Năm" />
      </div>

      <div className="date-info">
        <div>Ngày nhận phòng:</div>
        <div>Ngày trả phòng:</div>
      </div>

      <h3 className="title">Hạng phòng</h3>

      <div className="room-list">
        {rooms.map((room) => (
          <div key={room.id} className="room-item">
            <img src={room.image} alt={room.name} />
            <div className="room-info">
              <strong>{room.name}</strong>
              <p>Trống: {room.available}</p>
              <p>{room.price.toLocaleString()}đ/1 đêm</p>
            </div>
            <div className="room-icons">
              <i className="fa-solid fa-wifi"></i>
              <i className="fa-solid fa-utensils"></i>
            </div>
          </div>
        ))}
      </div>

      <p className="note">
        Chúc quý khách có trải nghiệm tốt nhất khi đến khách sạn Luxury
      </p>
    </div>
  );
}

const rooms = [
  {
    id: 1,
    name: "Phòng đơn",
    available: 5,
    price: 800000,
    image: "https://cdn3.ivivu.com/2014/01/SUPER-DELUXE2.jpg",
  },
  {
    id: 2,
    name: "Phòng VIP",
    available: 10,
    price: 3000000,
    image: "https://trungnguyendesign.vn/wp-content/uploads/2025/03/phong-khach-san-5-sao-1.png",
  },
  {
    id: 3,
    name: "Phòng đôi",
    available: 1,
    price: 1500000,
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0a/18/e9/62/nh-phong-khach-s-n.jpg",
  },
];
