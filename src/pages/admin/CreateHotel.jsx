import '../../styles/pages/CreateHotel.scss'
import { useEffect, useState } from "react";
import {
  getAllHotels,
  createHotel
} from '../../services/hotelService';
import Swal from "sweetalert2";

export default function CreateHotel() {
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({
    hotelName: "",
    description: "",
    city: "",
    district: "",
    ward: "",
    rating: 0,
    imageFile: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const res = await getAllHotels();
      if (res.success) {
        setHotels(res.data);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err?.message || "Có lỗi xảy ra!", "error");
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      const file = e.target.files[0];
      setForm({ ...form, imageFile: file });

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append(
        "hotel",
        JSON.stringify({
          hotelName: form.hotelName,
          description: form.description,
          city: form.city,
          district: form.district,
          ward: form.ward,
          rating: form.rating,
        })
      );
      if (form.imageFile) {
        formData.append("imageFile", form.imageFile);
      }

      if (editingId) {
        // Gọi API updateHotel nếu bạn có (hiện bạn chưa viết updateHotel)
        // await updateHotel(editingId, formData);
        Swal.fire("Thông báo", "Tính năng cập nhật chưa được triển khai.", "info");
      } else {
        await createHotel(formData);
        Swal.fire("Thành công", "Tạo khách sạn thành công!", "success");
      }

      setForm({
        hotelName: "",
        description: "",
        city: "",
        district: "",
        ward: "",
        rating: 0,
        imageFile: null,
      });
      setImagePreview(null);
      setEditingId(null);
      loadHotels();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err?.response?.data?.message || "Có lỗi xảy ra!", "error");
    }
  };

  const handleEdit = (hotel) => {
    setForm({
      hotelName: hotel.hotelName,
      description: hotel.description,
      city: hotel.city,
      district: hotel.district,
      ward: hotel.ward,
      rating: hotel.rating,
      imageFile: null,
    });
    setEditingId(hotel.hotelId);
    setImagePreview(hotel.images || null);
  };

  const handleDelete = async (id) => {
    console.log(" id ", id);
    try {
      // await deleteHotel(id);
      // Swal.fire("Deleted!", "Khách sạn đã xoá.", "success");
      // loadHotels();
      Swal.fire("Thông báo", "Tính năng xóa chưa được triển khai.", "info");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err?.message || "Có lỗi xảy ra!", "error");
    }
  };

  return (
    <div className="create-hotel">
      <h2>Quản Lý Khách Sạn</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="hotelName"
          placeholder="Tên khách sạn"
          value={form.hotelName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Mô tả"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="city"
          placeholder="Thành phố"
          value={form.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="district"
          placeholder="Quận/Huyện"
          value={form.district}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ward"
          placeholder="Phường/Xã"
          value={form.ward}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="rating"
          placeholder="Đánh giá (0-5)"
          value={form.rating}
          onChange={handleChange}
          step="0.1"
          min="0"
          max="5"
          required
        />
        <input
          type="file"
          name="imageFile"
          onChange={handleChange}
          accept="image/*"
        />

        {imagePreview && (
          <div className="preview-wrapper">
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: 120,
                height: 80,
                objectFit: "cover",
                marginTop: 10,
                borderRadius: 4,
                border: "1px solid #ddd",
              }}
            />
          </div>
        )}

        <button type="submit">
          {editingId ? "Cập Nhật" : "Thêm Mới"}
        </button>
      </form>

      <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Tên KS</th>
            <th>Mô tả</th>
            <th>Thành phố</th>
            <th>Quận</th>
            <th>Phường</th>
            <th>Rating</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((h) => (
            <tr key={h.hotelId}>
              <td>{h.hotelName}</td>
              <td>{h.description}</td>
              <td>{h.city}</td>
              <td>{h.district}</td>
              <td>{h.ward}</td>
              <td>{h.rating}</td>
              <td>
                {h.images && (
                  <img
                    src={h.images}
                    alt=""
                    style={{
                      width: 80,
                      height: 50,
                      objectFit: "cover",
                      borderRadius: 4,
                      border: "1px solid #ddd",
                    }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleEdit(h)}>Sửa</button>
                <button onClick={() => handleDelete(h.hotelId)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
