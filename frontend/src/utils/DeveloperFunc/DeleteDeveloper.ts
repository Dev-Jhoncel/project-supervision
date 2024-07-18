import { DEVELOPERS_URL } from "@/constants/config";
import axios from "axios";

export const deleteDevelopers = (id: number) => {
  const instance = axios.create({
    baseURL: DEVELOPERS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .delete(`/${id}`)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      const errorResult = { code: 0, message: error.message, error: true };
      console.error(errorResult);
      return errorResult;
    });

  return result;
};
