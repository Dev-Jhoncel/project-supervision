export interface Project {
  name: string;
  dueDate: Date;
  status: "Ongoing" | "Delay" | "Completed" | "At Risk";
}
