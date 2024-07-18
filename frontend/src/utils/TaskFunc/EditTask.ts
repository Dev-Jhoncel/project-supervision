import { TaskDetails } from "@/interfaces/ITaskDetails";
import { TASK_URL } from "@/constants/config";
import axios from "axios";

export const editProject = (params: TaskDetails) => {
  const instance = axios.create({
    baseURL: TASK_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .patch(`/${+params.id}`, params)
    .then((response) => {
      console.log(response);
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      const errorResult = { code: 0, message: error.message, error: true };
      console.error(errorResult);
      return errorResult;
    });

  return result;
};
