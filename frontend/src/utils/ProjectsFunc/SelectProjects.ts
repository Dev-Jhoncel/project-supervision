import { PROJECTS_URL } from "@/constants/config";
import axios from "axios";

export const selectProjects = (id: number) => {
  const data = {
    id: id,
  };
  const instance = axios.create({
    baseURL: PROJECTS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .get(`/active-projects/${+id}`)
    .then((response) => {
      console.log(response.data);
      return response.data.data;
    })
    .catch((error) => {
      const errorResult = { code: 0, message: error.message, error: true };
      return errorResult;
    });

  return result;
};
