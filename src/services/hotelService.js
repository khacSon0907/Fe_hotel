import axiosClient from "../config/axiosClient";


export const getAllHotels =  () =>{
    return axiosClient.get("/hotels/all")
}


export const createHotel = (formData) => {
  return axiosClient.post("/hotels", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export const updateHotel = (hotelId, formData) => {
  return axiosClient.put(`/hotels/${hotelId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteHotel = (hotelId) => {
  return axiosClient.delete(`/hotels/${hotelId}`);
}; 


// api Rooms 

export const getAllRooms =  () =>{
    return axiosClient.get("/rooms/all")
}


export const createRoom = (formData) => {
  return axiosClient.post("/rooms", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}


export const updateRoom = (roomId, formData) => {
  return axiosClient.put(`/rooms/${roomId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteRoom = (roomId) => {
  return axiosClient.delete(`/rooms/${roomId}`);
};



export const getRoomsByHotelId = (hotelId) => {
  return axiosClient.get(`/rooms/by-hotel-id/${hotelId}`);
};

export const getRoomById =(roomId)=> {
  return axiosClient.get(`/rooms/${roomId}` )
}

