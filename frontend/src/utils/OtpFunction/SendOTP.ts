import {
  OTP_SEND_OTP_URL,
  OTP_USER,
  OTP_LIMIT,
  OTP_PASS,
} from "@/constants/config";
import axios from "axios";
import { IResponse } from "@/interfaces/IOTPResponse";

export const SendOtp = async (mobileno: string): Promise<IResponse> => {
  const data = {
    username: OTP_USER,
    password: OTP_PASS,
    mobileno: mobileno,
    otp_msg:
      "Your OTP for Project Supervision is <otp>. Please do not share this code with anyone.",
    timeLimit: OTP_LIMIT,
    service_type: "Project Supervision",
  };

  const instance = axios.create({
    baseURL: OTP_SEND_OTP_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .post("", data)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      const errorResult = { code: 0, message: error.message, error: true };
      console.error(errorResult);
      return errorResult;
    });

  return result;
};
