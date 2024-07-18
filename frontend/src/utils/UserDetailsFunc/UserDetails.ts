import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import { UserDetails } from "@/interfaces/IUserDetails";

export const getUserDetails = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  try {
    const decodeToken = jwt.decode(JSON.parse(token));
    const data: UserDetails = {
      id: decodeToken?.id,
      first_name: decodeToken?.first_name,
      middle_name: decodeToken?.middle_name,
      last_name: decodeToken?.last_name,
      email: decodeToken?.email,
      mobileno: decodeToken?.mobile_no,
    };
    return data;
  } catch (error) {
    return null;
  }
};
