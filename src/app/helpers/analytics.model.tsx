export interface ProjectStatusCount {
  status: string;
  count: number;
  percentage: number;
}

export interface GraphicsData {
  totalProjects: number;
  projectsByStatus: ProjectStatusCount[];
  completedProjects: number;
  inProgressProjects: number;
}

export interface AnalysisResponse {
  summary: string;
  totalProjects: number;
  generatedAt: Date;
}

