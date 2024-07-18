export interface DeveloperDetails {
  id?: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  role: string;
  team_id?: number;
  points: number;
  email?: string;
  mobile_no?: number;
  isAvailable: number;
  isActive: number;
  groupingsId?: number;
  tech_stack?: tech_stack[];
  task?: task[];
}

export interface tech_stack {
  id?: number;
  title?: string;
}

export interface task {
  projectId?: number;
  description?: string;
}
