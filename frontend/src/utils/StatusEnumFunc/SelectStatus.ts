import { IStatusEnum } from "@/interfaces/IStatusEnum";

export const selectStatusEnum = (status: string) => {
  switch (status) {
    case "Ongoing":
      return IStatusEnum.Ongoing;
    case "Delay":
      return IStatusEnum.Delay;
    case "Completed":
      return IStatusEnum.Completed;
    case "At Risk":
      return IStatusEnum.AtRisk;
    default:
      throw new Error("No such union value !");
  }
};
