import { environment } from "../../environment/environment";
import type {
  GraphicsData,
  AnalysisResponse,
} from "../helpers/analytics.model";

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
      } else if (typeof errorData === "string") {
        errorMessage = errorData;
      }
    } catch {
      errorData = {};
    }

    if (!errorMessage) {
      const statusMessages: Record<number, string> = {
        400: "Invalid request.",
        401: "Authentication required.",
        403: "Access denied.",
        404: "Resource not found.",
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

const parseAnalysisDate = (analysis: AnalysisResponse): AnalysisResponse => ({
  ...analysis,
  generatedAt: new Date(analysis.generatedAt),
});

class AnalyticsService {
  private readonly baseUrl: string;

  constructor() {
    const apiUrl = environment.apiUrl;
    this.baseUrl = apiUrl.replace("/project", "/analytics");
  }

  async getGraphicsData(): Promise<GraphicsData> {
    try {
      const response = await fetch(`${this.baseUrl}/graphics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await handleResponse<GraphicsData>(response);
      return data;
    } catch (error) {
      console.error("Error fetching graphics data:", error);
      throw error;
    }
  }

  async getProjectAnalysis(id: string): Promise<AnalysisResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await handleResponse<AnalysisResponse>(response);
      return parseAnalysisDate(data);
    } catch (error) {
      console.error(`Error fetching analysis for project ${id}:`, error);
      throw error;
    }
  }
}

export const analyticsService = new AnalyticsService();

export { AnalyticsService, ApiError };
