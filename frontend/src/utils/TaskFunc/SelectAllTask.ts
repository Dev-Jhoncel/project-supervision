import { TASK_URL } from "@/constants/config";
import axios from "axios";

export const selectTasks = (id: number) => {
  const data = {
    id: id,
  };
  console.log(id);
  const instance = axios.create({
    baseURL: TASK_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .get(`/all-tasks/${+id}`)
    .then((response) => {
      console.log(response);
      return response.data.data;
    })
    .catch((error) => {
      const errorResult = { code: 0, message: error.message, error: true };
      console.error(errorResult);
      return errorResult;
    });

  return result;
};
