import { RESET_URL } from "@/constants/config";
import axios from "axios";

export const resetCredentials = (email: string, code: string) => {
  const data = {
    reset_code: code,
    email: email,
  };

  const instance = axios.create({
    baseURL: RESET_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .patch(`/`, data)
    .then((response) => {
      console.log(response);
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
