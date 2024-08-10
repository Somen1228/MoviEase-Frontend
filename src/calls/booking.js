import { API_URL } from "../App";
import { axiosInstance } from "./axios"

export const bookShow = async (payload) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/bookings`, payload)
    return response.data;
  } catch(err) {
    return err.response.message
  }
}

export const makePayment = async(payload) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/payment`, payload)
    return response.data;
  } catch(err) {
    // return err.response.message
  }
}