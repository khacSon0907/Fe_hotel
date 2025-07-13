import React, { useState, useEffect } from "react";
import "../../styles/pages/otp.scss";
import { otpRegister } from "../../services/useService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(120);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");
    console.log("OTP nhập:", otpCode);

    const token = localStorage.getItem("registerToken");

    if (!token) {
      Swal.fire("Lỗi", "Không tìm thấy token. Vui lòng đăng ký lại.", "error");
      return;
    }

    try {
      const res = await otpRegister({
        otp: otpCode,
        token: token,
      });
      console.log(" res res", res);
      if (res.success) {
        Swal.fire("Xác thực thành công!", res.message || "", "success").then(
          () => {
            navigate("/login");
            localStorage.removeItem("registerToken");
          }
        );
      } else {
        throw new Error(res.message || "Sai mã OTP");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err.message;
      Swal.fire("Lỗi", msg, "error");
    }
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setTimer(60);
    console.log("Đã gửi lại mã OTP!");
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2 className="otp-title">Xác thực OTP</h2>
        <p className="otp-description">
          Nhập mã OTP được gửi tới số điện thoại/email của bạn.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="otp-inputs">
            {otp.map((data, index) => (
              <input
                className="otp-input"
                type="text"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
              />
            ))}
          </div>

          <button type="submit" className="otp-button">
            Xác nhận OTP
          </button>
        </form>

        {timer > 0 ? (
          <p className="otp-timer">
            Gửi lại mã sau <span>{timer}s</span>
          </p>
        ) : (
          <button className="otp-resend" onClick={handleResend}>
            Gửi lại mã OTP
          </button>
        )}
      </div>
    </div>
  );
}
