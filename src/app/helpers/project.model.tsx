export const VALID_PROJECT_STATUSES = ["in progress", "completed"] as const;

export type ProjectStatus = (typeof VALID_PROJECT_STATUSES)[number];

export interface Project {
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
}


export interface ProjectResponse {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}