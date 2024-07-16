import { DEVELOPERS_URL } from "@/constants/config";
import axios from "axios";

export const getAvailableDevelopers = (
  id: number,
  skips: number,
  takes: number
) => {
  const instance = axios.create({
    baseURL: DEVELOPERS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .get(`/available-dev/${id}?skips=${skips}&takes=${takes}`)
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
