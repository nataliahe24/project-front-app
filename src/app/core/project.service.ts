import { environment } from "../../environment/environment";
import type { Project, ProjectResponse } from "../helpers/project.model";

class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorData: any = {};
    let errorMessage = "";

    try {
      errorData = await response.json();

      if (errorData.message) {
        errorMessage = errorData.message;
      } else if (errorData.error) {
        errorMessage = errorData.error;
      } else if (errorData.errors && Array.isArray(errorData.errors)) {
        errorMessage = errorData.errors.join(", ");
      } else if (typeof errorData === "string") {
        errorMessage = errorData;
      }
    } catch {
      errorData = {};
    }

    if (!errorMessage) {
      const statusMessages: Record<number, string> = {
        400: "Invalid data. Please check all fields.",
        401: "Authentication required.",
        403: "Access denied.",
        404: "Project not found.",
        409: "Project already exists.",
        422: "Invalid data format.",
        500: "Server error. Please try again later.",
      };

      errorMessage =
        statusMessages[response.status] ||
        `Request failed (${response.status})`;
    }

    throw new ApiError(errorMessage, response.status, errorData);
  }
  return response.json();
};

const parseProjectDates = (project: ProjectResponse): ProjectResponse => ({
  ...project,
  startDate: new Date(project.startDate),
  endDate: project.endDate ? new Date(project.endDate) : undefined,
  createdAt: new Date(project.createdAt),
  updatedAt: new Date(project.updatedAt),
});

class ProjectService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = environment.apiUrl;
  }

  async getProjects(): Promise<ProjectResponse[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await handleResponse<ProjectResponse[]>(response);
      return data.map(parseProjectDates);
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  async getProjectById(id: string): Promise<ProjectResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await handleResponse<ProjectResponse>(response);
      return parseProjectDates(data);
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  }

  async createProject(project: Project): Promise<ProjectResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      const data = await handleResponse<ProjectResponse>(response);
      return parseProjectDates(data);
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  async updateProject(id: string, project: Project): Promise<ProjectResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });

      const data = await handleResponse<ProjectResponse>(response);
      return parseProjectDates(data);
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
  }

  async deleteProject(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      await handleResponse<void>(response);
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  }
}

export const projectService = new ProjectService();

export { ProjectService, ApiError };
