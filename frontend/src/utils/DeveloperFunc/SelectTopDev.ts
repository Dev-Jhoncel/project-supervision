import { DEVELOPERS_URL } from "@/constants/config";
import axios from "axios";

export const getTopDevelopers = (id: number, skips: number, takes: number) => {
  const instance = axios.create({
    baseURL: DEVELOPERS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .get(`/top-developers/${id}?skips=${skips}&takes=${takes}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const errorResult = { code: 0, message: error.message, error: true };
      console.error(errorResult);
      return errorResult;
    });

  return result;
};
