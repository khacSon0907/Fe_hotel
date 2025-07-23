import "../../styles/pages/Booking.scss";
import { createBooking } from "../../services/BookingService";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, clearUser } from "../../store/userSlice";
import { getCurrentUser, updateUserInfo } from "../../services/useService";

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
          }
        })
        .catch(() => {
          dispatch(clearUser());
        })
        .finally(() => setLoading(false));
    } else {
      dispatch(clearUser());
      setLoading(false);
    }
  }, [dispatch]);

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
  };

  const getMinCheckOutDate = () => {
    if (!checkInDate) return getCurrentDateTime();
    const checkIn = new Date(checkInDate);
    const nextDay = new Date(checkIn);
    nextDay.setDate(checkIn.getDate() + 1);
    nextDay.setHours(0, 0);
    return nextDay.toISOString().slice(0, 16);
  };

  const handleCheckInChange = (e) => {
    const newCheckInDate = e.target.value;
    setCheckInDate(newCheckInDate);

    if (checkOutDate && newCheckInDate) {
      const checkIn = new Date(newCheckInDate);
      const checkOut = new Date(checkOutDate);
      if (checkOut <= checkIn) {
        const nextDay = new Date(checkIn);
        nextDay.setDate(checkIn.getDate() + 1);
        nextDay.setHours(12, 0);
        setCheckOutDate(nextDay.toISOString().slice(0, 16));
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!room || !hotelId) return <div>❌ Không có dữ liệu phòng được chọn.</div>;

  const totalNights =
    checkInDate && checkOutDate
      ? Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = totalNights * room.pricePerNight;

  const handleConfirmBooking = async () => {
    if (!user || !user.id) {
      alert("❗ Vui lòng đăng nhập tài khoản để đặt phòng!");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      alert("❗ Vui lòng chọn thời gian nhận và trả phòng!");
      return;
    }

    const now = new Date();
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn < now) {
      alert("❗ Ngày nhận phòng phải từ thời gian hiện tại trở đi!");
      return;
    }

    if (checkOut <= checkIn) {
      alert("❗ Ngày trả phòng phải sau ngày nhận phòng!");
      return;
    }

    if (!user.phoneNumber || !user.identityNumber) {
      alert("❗ Vui lòng nhập số điện thoại và CCCD!");
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ 1. Gọi API update user info
      const res1 = await updateUserInfo({
        phoneNumber: user.phoneNumber,
        identityNumber: user.identityNumber,
      });
      console.log("res1", res1);

      // ✅ 2. Gọi API tạo booking
      const bookingData = {
        hotelId,
        roomId: room.roomId,
        userId: user.id,
        checkInDate,
        checkOutDate,
        totalPrice: totalPrice,
        status: "PENDING",
        paymentMethod,
        customerNote,
      };

      const res2 = await createBooking(bookingData);

      alert("✅ Đặt phòng thành công!");
      console.log("res2", res2);

      navigate("/");
    } catch (err) {
      console.error("❌ Lỗi:", err);
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
            <label>Số điện thoại:</label>
            <input
              type="text"
              value={user?.phoneNumber || ""}
              onChange={(e) =>
                dispatch(setUser({ ...user, phoneNumber: e.target.value }))
              }
            />
          </div>

          <div className="form-group">
            <label>Căn cước công dân (CCCD):</label>
            <input
              type="text"
              value={user?.identityNumber || ""}
              onChange={(e) =>
                dispatch(setUser({ ...user, identityNumber: e.target.value }))
              }
            />
          </div>

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
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
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
        <strong>Tổng cộng:</strong>{" "}
        {checkInDate && checkOutDate
          ? `${totalNights} đêm × ${room.pricePerNight.toLocaleString()} = ${totalPrice.toLocaleString()} VNĐ`
          : "0 VNĐ"}
      </div>

      <div className="confirm-button">
        <button onClick={handleConfirmBooking} disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Xác nhận hoàn tất"}
        </button>
      </div>
    </div>
  );
}
  