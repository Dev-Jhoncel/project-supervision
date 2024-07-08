import {
  OTP_USER,
  OTP_LIMIT,
  OTP_PASS,
  OTP_VALIDATE_OTP_URL,
} from "@/constants/config";
import axios from "axios";
import { IResponse } from "@/interfaces/IResponse";

export const ValidateOTP = async (
  mobileno: string,
  pin: string
): Promise<IResponse> => {
  const data = {
    username: OTP_USER,
    password: OTP_PASS,
    mobileno: mobileno,
    pin: pin,
    timeLimit: OTP_LIMIT,
  };

  const instance = axios.create({
    baseURL: OTP_VALIDATE_OTP_URL,
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
