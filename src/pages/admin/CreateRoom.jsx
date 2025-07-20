import React, { useState, useEffect } from "react";
import "../../styles/pages/createRoom.scss";
import {
  getAllHotels,
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../services/hotelService";

export default function CreateRoom() {
  const [roomData, setRoomData] = useState({
    hotelId: "",
    roomType: "",
    nameRoom: "",
    pricePerNight: "",
    maxGuests: "",
    isAvailable: true,
    description: "",
    roomImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoomId, setEditingRoomId] = useState(null);

  useEffect(() => {
    fetchHotels();
    fetchRooms();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await getAllHotels();
      if (response.success) setHotels(response.data);
    } catch (error) {
      console.error("Lỗi gọi API hotels:", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await getAllRooms();
      if (response.success) setRooms(response.data);
    } catch (error) {
      console.error("Lỗi gọi API rooms:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setRoomData((prev) => ({ ...prev, roomImage: file }));
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setRoomData({
      hotelId: "",
      roomType: "",
      nameRoom: "",
      pricePerNight: "",
      maxGuests: "",
      isAvailable: true,
      description: "",
      roomImage: null,
    });
    setImagePreview(null);
    setIsEditing(false);
    setEditingRoomId(null);
  };

    const handleSubmit = async () => {
    const formData = new FormData();
    const { roomImage, ...roomJson } = roomData;
    formData.append("room", JSON.stringify(roomJson));
    if (roomImage) {
      formData.append("imageFile", roomImage);
    }

    try {
      let response;
      if (isEditing) {
        response = await updateRoom(editingRoomId, formData);
      } else {
        response = await createRoom(formData);
      }

      if (response.success) {
        alert(
          isEditing ? "Cập nhật phòng thành công!" : "Tạo phòng thành công!"
        );
        resetForm();
        fetchRooms();
      } else {
        alert(
          response.message ||
            (isEditing
              ? "Cập nhật phòng thất bại!"
              : "Tạo phòng thất bại!")
        );
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      alert(
        error?.response?.data?.message ||
          "Có lỗi xảy ra khi gửi dữ liệu."
      );
    }
  };

  const handleEdit = (room) => {
    setRoomData({
      hotelId: room.hotelId,
      roomType: room.roomType,
      nameRoom: room.nameRoom,
      pricePerNight: room.pricePerNight,
      maxGuests: room.maxGuests,
      isAvailable: room.isAvailable,
      description: room.description,
      roomImage: null,
    });

    if (room.roomImage) {
      setImagePreview(room.roomImage);
    }

    setIsEditing(true);
    setEditingRoomId(room.roomId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm("Bạn chắc chắn muốn xoá phòng này?")) return;
    try {
      const response = await deleteRoom(roomId);
      if (response.success) {
        alert("Xoá phòng thành công!");
        fetchRooms();
      } else {
        alert("Xoá phòng thất bại!");
      }
    } catch (error) {
      console.error("Lỗi xoá phòng:", error);
      alert("Có lỗi xảy ra khi xoá phòng.");
    }
  };

  return (
    <div className="create-room-container">
      <div className="form-section">
        <h2>{isEditing ? "Sửa Phòng" : "Tạo Phòng Mới"}</h2>

        <div className="form-compact">
          <div className="form-row">
            <select
              name="hotelId"
              value={roomData.hotelId}
              onChange={handleChange}
            >
              <option value="">Chọn khách sạn</option>
              {hotels.map((hotel) => (
                <option key={hotel.hotelId} value={hotel.hotelId}>
                  {hotel.hotelName} – {hotel.city}, {hotel.district}
                </option>
              ))}
            </select>

            <select
              name="roomType"
              value={roomData.roomType}
              onChange={handleChange}
            >
              <option value="">Chọn loại phòng</option>
              <option value="Phòng Tiêu Chuẩn">Phòng Tiêu Chuẩn</option>
              <option value="Phòng Cao Cấp">Phòng Cao Cấp</option>
              <option value="Phòng VIP">Phòng VIP</option>
            </select>

            <input
              type="text"
              name="nameRoom"
              placeholder="Tên phòng"
              value={roomData.nameRoom}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="number"
              name="pricePerNight"
              placeholder="Giá/đêm (VNĐ)"
              value={roomData.pricePerNight}
              onChange={handleChange}
            />
            <input
              type="number"
              name="maxGuests"
              placeholder="Số khách tối đa"
              value={roomData.maxGuests}
              onChange={handleChange}
            />
            <select
              name="isAvailable"
              value={roomData.isAvailable}
              onChange={handleChange}
            >
              <option value={true}>Còn trống</option>
              <option value={false}>Hết phòng</option>
            </select>
          </div>

          <div className="form-row">
            <textarea
              name="description"
              placeholder="Mô tả phòng"
              value={roomData.description}
              onChange={handleChange}
              rows={2}
            ></textarea>
            <label className="upload-label">
              <input type="file" onChange={handleImageChange} />
              <span>
                📷{" "}
                {roomData.roomImage
                  ? `${roomData.roomImage.name.substring(0, 15)}...`
                  : "Chọn ảnh"}
              </span>
            </label>
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Ảnh xem trước" />
            </div>
          )}

          <div className="form-actions">
            <button className="submit-btn" onClick={handleSubmit}>
              {isEditing ? "Cập Nhật" : "Thêm Mới"}
            </button>
            {isEditing && (
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Hủy
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="table-section">
        <h3>Danh sách phòng ({rooms.length})</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Tên phòng</th>
                <th>Hình Ảnh</th>
                <th>Khách Sạn</th>
                <th>Loại</th>
                <th>Giá/đêm</th>
                <th>Khách</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => {
                const hotel = hotels.find((h) => h.hotelId === room.hotelId);
                return (
                  <tr
                    key={room.roomId}
                    className={editingRoomId === room.roomId ? "editing" : ""}
                  >
                    <td className="room-name">{room.nameRoom}</td>
                    <td className="room-image">
                      <img src={room.roomImage} alt={room.nameRoom} />
                    </td>
                    <td>{hotel ? hotel.hotelName : "Không rõ"}</td>
                    <td>
                      <span
                        className={`room-type ${room.roomType.toLowerCase()}`}
                      >
                        {room.roomType}
                      </span>
                    </td>
                    <td className="price">
                      {Number(room.pricePerNight).toLocaleString()} VNĐ
                    </td>
                    <td>{room.maxGuests}</td>
                    <td>
                      <span
                        className={`status ${
                          room.isAvailable ? "available" : "unavailable"
                        }`}
                      >
                        {room.isAvailable ? "Còn trống" : "Hết phòng"}
                      </span>
                    </td>
                    <td className="actions">
                      <button className="edit" onClick={() => handleEdit(room)}>
                        ✏️ Sửa
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(room.roomId)}
                      >
                        🗑️ Xoá
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
