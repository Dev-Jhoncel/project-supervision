import { PROJECTS_URL } from "@/constants/config";
import axios from "axios";

export const updateStatusProjects = (id: number, status: string) => {
  const data = {
    status: status,
  };

  const instance = axios.create({
    baseURL: PROJECTS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .put(`/${+id}`, data)
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      const errorResult = { code: 0, message: error.message, error: true };
      console.error(errorResult);
      return errorResult;
    });

  return result;
};
