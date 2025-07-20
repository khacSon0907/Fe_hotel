import { useEffect, useState } from "react";
import { getBookingsByUserId } from '../../services/BookingService';
import { useSelector } from "react-redux";
import '../../styles/pages/BookingHistoryPage.scss';

export default function BookingHistoryPage() {
  const user = useSelector((state) => state.user.user);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      getBookingsByUserId(user.id)
        .then((res) => {
          if (res?.success) {
            setBookings(res.data);
          } else {
            alert("❌ Không thể tải lịch sử đặt phòng.");
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy booking:", err);
          alert("❌ Lỗi server.");
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;

  return (
    <div className="booking-history-container">
      <h2>LỊCH SỬ ĐẶT PHÒNG</h2>

      {bookings.length === 0 ? (
        <p>🔍 Bạn chưa có đặt phòng nào.</p>
      ) : (
        <table className="booking-table">
          <thead className="title">
            <tr>
              <th>Khách sạn</th>
              <th>Địa chỉ</th>
              <th>Phòng</th>
              <th>Loại phòng</th>
              <th>Ngày nhận</th>
              <th>Ngày trả</th>
              <th>Thanh toán</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item) => (
              <tr key={item.bookingId}>
                <td>{item.hotelName}</td>
                <td>{item.hotelAddress}</td>
                <td>{item.roomName}</td>
                <td>{item.roomType}</td>
                <td>{new Date(item.checkInDate).toLocaleString()}</td>
                <td>{new Date(item.checkOutDate).toLocaleString()}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.note || "Không có"}</td>
                <td>{item.status}</td>
                <td>
                 <button className="btn-cancell">
                    Huỷ
                 </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
