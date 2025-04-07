// import axios from "axios";

// interface UserData {
//   phone?: string;
//   jobPosition?: string;
// }

// const API = axios.create({
//   baseURL: "/api/v1",
// });

// // Add token to requests
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     if (!config.headers) {
//       config.headers = {};
//     }
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const saveUserDetails = async (userData: UserData) => {
//   const formData = new FormData();

//   if (userData.phone) formData.append("phone", userData.phone);
//   if (userData.jobPosition)
//     formData.append("jobPosition", userData.jobPosition);

//   try {
//     const response = await API.post("/users", formData);
//     return response.data;
//   } catch (error) {
//     console.error("Error saving user details:", error);
//     throw error;
//   }
// };

