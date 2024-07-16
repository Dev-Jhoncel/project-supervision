import { PROJECTS_URL } from "@/constants/config";
import axios from "axios";

export const deleteProject = (id: number) => {
  const instance = axios.create({
    baseURL: PROJECTS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .delete(`/${id}`)
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
