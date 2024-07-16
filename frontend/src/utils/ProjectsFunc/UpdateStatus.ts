import { EditParams } from "@/interfaces/IEditProjectParams";
import { PROJECTS_URL } from "@/constants/config";
import axios from "axios";

export const updateStatus = (params: EditParams) => {
  const data = {
    status: params.status,
  };

  console.log(data);
  const instance = axios.create({
    baseURL: PROJECTS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .put(`/${+params.id}`, data)
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
