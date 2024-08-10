import axios from "axios";
import Login from "../pages/Login";
import { axiosInstance } from "./axios";
import { API_URL } from "../App";

export const RegisterUser = async (userObj) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/register`, {
      name: userObj.name,
      email: userObj.email,
      password: userObj.password,
      userId: userObj.userId,
      userType: "CUSTOMER"
    })
      return response;
  } catch (err) {
      console.log(err);
        return err.response;
  }
}


export const LoginUser = async (userObj) => {

  try {    
    console.log(API_URL);
    
    const response = await axiosInstance.post(`${API_URL}/login`, {
      email: userObj.email,
      password: userObj.password
    })
    console.log(import.meta.env.VITE_REACT_APP_API_URL);
      return response;
  } catch (err) {
      console.log(err);
      return err.response
  }
}

export const sendOTP = async (email) => {
  try {
    const response = await axiosInstance.patch(`${API_URL}/forgetPassword`, {email: email})

    return response;
  } catch(err) {
      return err.response
  }
}

export const resetPassword = async (userObj) => {
  try {
      const response = await axiosInstance.patch(`${API_URL}/resetPassword`, {
        otp: userObj.otp,
        password: userObj.password
      })

      return response;
  } catch(err) {
      return err.response
  }
}