import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ProjectResponse } from "../helpers/project.model";

/**
 * AI Service for generating project insights using Google Gemini
 */
class AiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    // Get API key from environment or use demo mode
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        model: "gemini-pro",
      });
    }
  }

  /**
   * Generate insights from project data using AI
   */
  async generateInsights(
    projects: ProjectResponse[]
  ): Promise<{ message: string; recommendations: string[] }> {
    // If no API key, use fallback analysis
    if (!this.model) {
      return this.fallbackAnalysis(projects);
    }

    try {
      const prompt = this.buildPrompt(projects);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseAiResponse(text);
    } catch (error) {
      console.error("AI Error:", error);
      return this.fallbackAnalysis(projects);
    }
  }

  /**
   * Build prompt for AI analysis
   */
  private buildPrompt(projects: ProjectResponse[]): string {
    const now = new Date();

    const summary = projects.map((p) => {
      const duration = p.endDate
        ? Math.ceil(
            (new Date(p.endDate).getTime() - new Date(p.startDate).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : "ongoing";

      const daysUntilEnd = p.endDate
        ? Math.ceil(
            (new Date(p.endDate).getTime() - now.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : null;

      return {
        name: p.name,
        status: p.status,
        duration,
        daysUntilEnd,
      };
    });

    return `You are a project management AI assistant. 
Analyze these projects and provide insights.

Projects data:
${JSON.stringify(summary, null, 2)}

Total projects: ${projects.length}
Completed: ${projects.filter((p) => p.status === "completed").length}
In Progress: ${projects.filter((p) => p.status === "in progress").length}

Provide a response in this exact JSON format:
{
  "message": "A motivational summary message (max 50 characters)",
  "recommendations": [
    "Recommendation 1 (max 80 characters)",
    "Recommendation 2 (max 80 characters)",
    "Recommendation 3 (max 80 characters)"
  ]
}

Focus on: deadlines, workload, completion rate, and productivity tips.
Be concise, actionable, and use emojis.`;
  }

  private parseAiResponse(text: string): {
    message: string;
    recommendations: string[];
  } {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          message: parsed.message || "AI analysis complete",
          recommendations: Array.isArray(parsed.recommendations)
            ? parsed.recommendations.slice(0, 3)
            : [],
        };
      }
    } catch (error) {
      console.error("Parse error:", error);
    }

    return {
      message: text.slice(0, 100),
      recommendations: [],
    };
  }

  private fallbackAnalysis(projects: ProjectResponse[]): {
    message: string;
    recommendations: string[];
  } {
    if (projects.length === 0) {
      return {
        message: "No projects available for analysis",
        recommendations: [],
      };
    }

    const now = new Date();
    const overdue = projects.filter((p) => {
      if (!p.endDate || p.status === "completed") return false;
      return new Date(p.endDate) < now;
    });

    const upcomingDeadlines = projects.filter((p) => {
      if (!p.endDate || p.status === "completed") return false;
      const daysUntil = Math.ceil(
        (new Date(p.endDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysUntil > 0 && daysUntil <= 7;
    });

    const recommendations = [];

    if (overdue.length > 0) {
      recommendations.push(
        `⚠️ ${overdue.length} project(s) overdue. Update or extend deadlines.`
      );
    }

    if (upcomingDeadlines.length > 0) {
      recommendations.push(
        `📅 ${upcomingDeadlines.length} project(s) due this week.`
      );
    }

    const inProgress = projects.filter(
      (p) => p.status === "in progress"
    ).length;

    if (inProgress > 5) {
      recommendations.push(
        `💡 ${inProgress} active projects. Focus on completion.`
      );
    }

    const completed = projects.filter((p) => p.status === "completed").length;
    const completionRate = (completed / projects.length) * 100;

    let message = "";
    if (completionRate === 100) {
      message = "🎉 All projects completed! Great work!";
    } else if (completionRate >= 75) {
      message = "✨ Excellent progress! Keep it up!";
    } else if (completionRate >= 50) {
      message = "📈 Good progress. Stay focused!";
    } else {
      message = "💪 Let's get some projects done!";
    }

    if (recommendations.length === 0) {
      recommendations.push("📊 Keep tracking your project progress");
    }

    return { message, recommendations };
  }
}

export const aiService = new AiService();
