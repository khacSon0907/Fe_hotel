import { useEffect, useState } from "react";
import { getAllBookingsForAdmin, updateBookingStatus } from "../../services/BookingService";
import "../../styles/pages/BookingManagementPage.scss";

export default function BookingManagementPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await getAllBookingsForAdmin();
      if (res?.success) {
        setBookings(res.data);
      } else {
        alert("Không thể tải danh sách đặt phòng.");
      }
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu booking:", err);
      alert("Đã xảy ra lỗi server!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    if (!window.confirm(`Bạn có chắc muốn cập nhật trạng thái thành: ${newStatus}?`)) return;

    try {
      const res = await updateBookingStatus(bookingId, newStatus);
      if (res?.success) {
        alert("✅ Cập nhật trạng thái thành công");
        fetchBookings(); // Reload lại danh sách sau cập nhật
      } else {
        alert("❌ Không thể cập nhật trạng thái");
      }
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      alert("Lỗi khi cập nhật trạng thái!");
    }
  };

  if (loading) return <div className="booking-loading">Đang tải dữ liệu...</div>;

  return (
    <div className="booking-admin-container">
      <h2 className="title">📋 Quản Lý Đặt Phòng</h2>

      {bookings.length === 0 ? (
        <p>Không có đặt phòng nào được tìm thấy.</p>
      ) : (
        <table className="booking-admin-table">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Khách sạn</th>
              <th>Phòng</th>
              <th>Người đặt</th>
              <th>Nhận phòng</th>
              <th>Trả phòng</th>
              <th>Thanh toán</th>
              <th>Ghi chú</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item) => (
              <tr key={item.bookingId}>
                <td>{item.bookingId.slice(-6)}</td>
                <td>
                  {item.hotelName} <br />
                  <small>{item.hotelAddress}</small>
                </td>
                <td>
                  {item.roomName} <br />
                  <small>{item.roomType}</small>
                </td>
                <td>{item.userName}</td>
                <td>{new Date(item.checkInDate).toLocaleString()}</td>
                <td>{new Date(item.checkOutDate).toLocaleString()}</td>
                <td>{item.paymentMethod}</td>
                <td>{item.note || "Không có"}</td>
                <td>
                  <span className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <select
                    className="status-dropdown"
                    value={item.status}
                    onChange={(e) => handleUpdateStatus(item.bookingId, e.target.value)}
                    disabled={["CANCELLED", "COMPLETED"].includes(item.status)}
                  >
                    <option value="PENDING">🕒 Chờ xử lý</option>
                    <option value="CONFIRMED">✅ Đã xác nhận</option>
                    <option value="CANCELLED">❌ Đã huỷ</option>
                    <option value="COMPLETED">📦 Hoàn tất</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
