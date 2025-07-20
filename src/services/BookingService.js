import axiosClient from "../config/axiosClient";

export const createBooking = (data) => {
  return axiosClient.post("/bookings", data);
};
 

 export const  getBookingsByUserId = (userId) => {
  return axiosClient.get(`/bookings/history/${userId}`)
}

export const getAllBookingsForAdmin = () => {
  return axiosClient.get('/bookings/admin/all')
}

export const updateBookingStatus = (bookingId, newStatus) => {
  return axiosClient.put(`/bookings/update-status/${bookingId}`, null, {
  params: { status: newStatus }
});
};
