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