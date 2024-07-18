import { ITaskStatusEnum } from "@/interfaces/ITaskStatus";

export const selectTaskEnum = (status: string) => {
  switch (status) {
    case "HIGH":
      return ITaskStatusEnum.HIGH;
    case "MEDIUM":
      return ITaskStatusEnum.MEDIUM;
    case "LOW":
      return ITaskStatusEnum.LOW;
    default:
      throw new Error("No such union value !");
  }
};
