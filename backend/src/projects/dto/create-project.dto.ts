export class CreateProjectDto {
  id: number;
  project: string;
  status: string;
  team_id: number;
  user_id: number;
  due_date: Date;
}
