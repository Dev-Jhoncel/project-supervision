import { EditParams } from "@/interfaces/IEditDeveloperParams";
import { DEVELOPERS_URL } from "@/constants/config";
import axios from "axios";

export const updateDeveloperDetails = (
  params: EditParams,
  updateAvailable: boolean
) => {
  const splitname = params.name.toString().split(" ");

  const data = updateAvailable
    ? {
        isAvailable: params.status === "Vacant" ? 1 : 0,
      }
    : {
        first_name: splitname[0],
        last_name: splitname[1],
        role: params.department,
        isAvailable: params.status === "Vacant" ? 1 : 0,
        points: +params.ratings,
      };

  const instance = axios.create({
    baseURL: DEVELOPERS_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = instance
    .patch(`/${+params.id}`, data)
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
