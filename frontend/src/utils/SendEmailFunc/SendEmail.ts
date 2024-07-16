import { EMAILER_URL } from "@/constants/config";
import axios from "axios";

export const sendEmail = (email: string, text: string) => {
  const data = {
    email: email,
    message: text,
  };

  const instance = axios.create({
    baseURL: EMAILER_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .post("", data)
    .then((response) => {
      console.log(response.data);
      console.log(response.status);
      return response.data;
    })
    .catch((error) => {
      const errorResult = { code: 0, message: error.message, error: true };
      console.error(errorResult);
      return errorResult;
    });

  return result;
};
