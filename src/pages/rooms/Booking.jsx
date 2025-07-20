import '../../styles/pages/Booking.scss';
import { createBooking } from '../../services/BookingService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/userSlice";
import { getCurrentUser } from "../../services/useService";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { room, hotelId } = location.state || {};

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");

  const paymentOptions = [
    { value: "bank_transfer", label: "Chuyển khoản ngân hàng" },
    { value: "cash", label: "Thanh toán tại quầy" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      getCurrentUser()
        .then((res) => {
          if (res?.success) {
            dispatch(setUser(res.data));
          } else {
            dispatch(clearUser());
            console.warn("Token không hợp lệ.");
          }
        })
        .catch((err) => {
          console.error("Lỗi get user:", err);
          dispatch(clearUser());
        })
        .finally(() => setLoading(false));
    } else {
      dispatch(clearUser());
      setLoading(false);
    }
  }, [dispatch]);

  // Function để lấy thời gian hiện tại theo định dạng datetime-local
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Function để lấy ngày tối thiểu cho checkout (ngày hôm sau của check-in)
  const getMinCheckOutDate = () => {
    if (!checkInDate) return getCurrentDateTime();
    
    const checkIn = new Date(checkInDate);
    // Lấy ngày hôm sau, giờ có thể sớm hơn giờ check-in
    const nextDay = new Date(checkIn);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0); // Set về đầu ngày hôm sau
    
    const year = nextDay.getFullYear();
    const month = String(nextDay.getMonth() + 1).padStart(2, '0');
    const day = String(nextDay.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T00:00`;
  };

  // Validate và cập nhật check-out date khi check-in date thay đổi
  const handleCheckInChange = (e) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);
    
    // Nếu ngày trả phòng đã được chọn và cùng ngày với ngày nhận
    if (checkOutDate && newCheckInDate) {
      const checkIn = new Date(newCheckInDate);
      const checkOut = new Date(checkOutDate);
      
      // Nếu checkout cùng ngày hoặc trước ngày checkin
      if (checkOut.toDateString() === checkIn.toDateString() || checkOut < checkIn) {
        // Tự động set ngày trả phòng = ngày hôm sau
        const nextDay = new Date(checkIn);
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(12, 0); // Set checkout mặc định 12:00 trưa hôm sau
        
        const year = nextDay.getFullYear();
        const month = String(nextDay.getMonth() + 1).padStart(2, '0');
        const day = String(nextDay.getDate()).padStart(2, '0');
        setCheckOutDate(`${year}-${month}-${day}T12:00`);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!room || !hotelId) return <div>❌ Không có dữ liệu phòng được chọn.</div>;

  const handleConfirmBooking = async () => {
    if (!user || !user.id) {
      alert("❗ Vui lòng đăng nhập tài khoản để đặt phòng!");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert("❗ Vui lòng chọn thời gian nhận và trả phòng!");
      return;
    }

    // Validate dates
    const now = new Date();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn < now) {
      alert("❗ Ngày nhận phòng phải từ thời gian hiện tại trở đi!");
      return;
    }

    // Kiểm tra checkout phải khác ngày với checkin (qua đêm)
    if (checkOut.toDateString() === checkIn.toDateString()) {
      alert("❗ Ngày trả phòng phải khác ngày với ngày nhận phòng (tối thiểu 1 đêm)!");
      return;
    }

    if (checkOut <= checkIn) {
      alert("❗ Ngày trả phòng phải sau ngày nhận phòng!");
      return;
    }

    const bookingData = {
      hotelId,
      roomId: room.roomId,
      userId: user?.id,
      checkInDate,
      checkOutDate,
      totalPrice: room.pricePerNight,
      status: "PENDING",
      paymentMethod,
      customerNote
    };

    try {
      setIsSubmitting(true);
      const res = await createBooking(bookingData);
      alert("✅ Đặt phòng thành công!");
      console.log("Booking response:", res.data);
      navigate("/");
    } catch (err) {
      console.error("❌ Lỗi đặt phòng:", err);
      alert("❌ Đặt phòng thất bại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>XÁC NHẬN ĐẶT PHÒNG</h2>

      <div className="hotel-header">
        <div className="hotel-name">Luxury Hotel – Nhận Phòng</div>
        <div className="hotel-images">
          <img src={room.roomImage} alt="room" />
        </div>
      </div>

      <div className="info-section">
        <div className="info-box">
          <h4>Thông tin khách hàng</h4>
          <p><strong>Tên khách:</strong> {user?.fullname}</p>
          <p><strong>Email:</strong> {user?.email}</p>

          <div className="form-group">
            <label>Nhận phòng:</label>
            <input
              type="datetime-local"
              value={checkInDate}
              min={getCurrentDateTime()}
              onChange={handleCheckInChange}
            />
          </div>

          <div className="form-group">
            <label>Trả phòng:</label>
            <input
              type="datetime-local"
              value={checkOutDate}
              min={getMinCheckOutDate()}
              onChange={(e) => setCheckOutDate(e.target.value)}
            />
          </div>
        </div>

        <div className="info-box">
          <h4>Thông tin phòng</h4>
          <p><strong>Tên phòng:</strong> {room.nameRoom}</p>
          <p><strong>Loại phòng:</strong> {room.roomType}</p>
          <p><strong>Số khách tối đa:</strong> {room.maxGuests}</p>

          <div className="form-group">
            <label>Ghi chú:</label>
            <textarea
              placeholder="Nhập ghi chú của bạn..."
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Phương thức thanh toán:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {paymentOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <hr />

      <div className="confirm-note">
        <div className="success-icon">✅</div>
        <p>Thông tin đã xác thực</p>
      </div>

      <div className="total-row">
        <strong>Tổng cộng:</strong> {room.pricePerNight.toLocaleString()} VNĐ
      </div>

      <div className="confirm-button">
        <button onClick={handleConfirmBooking} disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Xác nhận hoàn tất"}
        </button>
      </div>
    </div>
  );
}