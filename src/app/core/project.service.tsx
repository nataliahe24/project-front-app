import { environment } from "../../environment/environment";
import type { 
  Project, 
  ProjectResponse 
} from "../helpers/project.model";

/**
 * Custom error class for API errors
 */
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

/**
 * Handles fetch response and throws errors if needed
 */
const handleResponse = async <T,>(
  response: Response
): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.message || `HTTP Error: ${response.status}`,
      response.status,
      errorData
    );
  }
  return response.json();
};

/**
 * Converts date strings to Date objects in project response
 */
const parseProjectDates = (
  project: ProjectResponse
): ProjectResponse => ({
  ...project,
  startDate: new Date(project.startDate),
  endDate: project.endDate ? new Date(project.endDate) : undefined,
  createdAt: new Date(project.createdAt),
  updatedAt: new Date(project.updatedAt),
});

/**
 * Service class for managing project-related API calls
 */
class ProjectService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = environment.apiUrl;
  }

  /**
   * Fetches all projects from the API
   * @returns Promise with array of projects
   */
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

  /**
   * Fetches a single project by ID
   * @param id - Project unique identifier
   * @returns Promise with project data
   */
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

  /**
   * Creates a new project
   * @param project - Project data to create
   * @returns Promise with created project data
   */
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

  /**
   * Updates an existing project
   * @param id - Project unique identifier
   * @param project - Updated project data
   * @returns Promise with updated project data
   */
  async updateProject(
    id: string,
    project: Project
  ): Promise<ProjectResponse> {
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

  /**
   * Deletes a project by ID
   * @param id - Project unique identifier
   * @returns Promise that resolves when deletion is complete
   */
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

