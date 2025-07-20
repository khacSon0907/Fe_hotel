
import "../../styles/pages/CreateHotel.scss";
import { useEffect, useState } from "react";
import {
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../../services/hotelService";
import Swal from "sweetalert2";

// DATA ĐỊA LÝ
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
    totalRooms: 0,
    availableRooms: 0,
    status: "ACTIVE",
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
    const { name, value } = e.target;
    if (name === "imageFile") {
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
    } else if (name === "city") {
      setForm({ ...form, city: value, district: "", ward: "" });
    } else if (name === "district") {
      setForm({ ...form, district: value, ward: "" });
    } else {
      setForm({ ...form, [name]: value });
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
          status: form.status,
        })
      );
      if (form.imageFile) {
        formData.append("imageFile", form.imageFile);
      }
      if (editingId) {
        await updateHotel(editingId, formData);
        Swal.fire("Thành công", "Cập nhật khách sạn thành công!", "success");
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
        totalRooms: 0,
        availableRooms: 0,
        status: "ACTIVE",
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
      district: "",
      ward: "",
      rating: hotel.rating,
      imageFile: null,
      status: hotel.status ?? "ACTIVE",
    });
    setEditingId(hotel.hotelId);
    setImagePreview(hotel.images || null);

    setTimeout(() => {
      setForm((prev) => ({
        ...prev,
        district: hotel.district,
        ward: hotel.ward,
      }));
    }, 0);
  };

  const handleDelete = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "Bạn chắc chắn muốn xóa khách sạn này?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
      });
      if (confirm.isConfirmed) {
        await deleteHotel(id);
        Swal.fire("Thành công", "Đã xoá khách sạn.", "success");
        loadHotels();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Lỗi", err?.response?.data?.message || "Có lỗi xảy ra!", "error");
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
        <select name="city" value={form.city} onChange={handleChange} required>
          <option value="">Chọn Thành phố</option>
          {Object.keys(districtsData).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          name="district"
          value={form.district}
          onChange={handleChange}
          required
          disabled={!form.city}
        >
          <option value="">Chọn Quận/Huyện</option>
          {districtsData[form.city]?.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          name="ward"
          value={form.ward}
          onChange={handleChange}
          required
          disabled={!form.district}
        >
          <option value="">Chọn Phường/Xã</option>
          {wardsData[form.district]?.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
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
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="ACTIVE">Đang hoạt động</option>
          <option value="INACTIVE">Tạm dừng</option>
        </select>
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
        <button type="submit">{editingId ? "Cập Nhật" : "Thêm Mới"}</button>
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
            <th>Tổng phòng</th>
            <th>Phòng trống</th>
            <th>Trạng thái</th>
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
              <td>{h.totalRooms ?? 0}</td>
              <td>{h.availableRooms ?? 0}</td>
              <td>{h.status ?? "N/A"}</td>
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
