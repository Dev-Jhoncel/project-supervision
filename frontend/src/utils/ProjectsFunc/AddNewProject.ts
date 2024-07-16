import { PROJECTS_URL } from "@/constants/config";
import axios from "axios";

export const addProjects = (
  description: string,
  user_id: number,
  due_date: Date,
  status: string
) => {
  const data = {
    project: description,
    status: status,
    user_id: user_id,
    due_date: due_date,
  };

  const instance = axios.create({
    baseURL: PROJECTS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .post(`/`, data)
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
