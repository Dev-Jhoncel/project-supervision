import { DEVELOPERS_URL } from "@/constants/config";
import axios from "axios";
import { DeveloperDetails } from "@/interfaces/IDeveloperDetails";

export const addDevelopers = (data: DeveloperDetails) => {
  const instance = axios.create({
    baseURL: DEVELOPERS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .post(`/`, data)
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
