import axiosClient from "../config/axiosClient";

export const registerUser = (data) => {
  return axiosClient.post("/auth/register", data);
};

export const otpRegister = (data) => {
  return axiosClient.post("/auth/verify-otp",data)
}

export const loginUser = (data) => {
  return axiosClient.post("/auth/login", data);
};

export const getCurrentUser = () => {
  return axiosClient.get("/users/find-userId");
};


export const loginWithGoogle = (idToken) => {
  return axiosClient.post(
    "/auth/google",
    { idToken },
    {
      headers: {
        "Content-Type": "application/json", // ✅ BẮT BUỘC để tránh lỗi 403
      },
    }
  );
};
