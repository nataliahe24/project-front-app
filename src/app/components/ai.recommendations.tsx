import { useState, useEffect, useMemo } from "react";
import { useProject } from "../context/use.context";
import { aiService } from "../core/ai.service";

/**
 * AI-powered summary component for project insights
 * @organism
 */
export const AiRecommendations = () => {
  const { projects } = useProject();
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<{
    message: string;
    recommendations: string[];
  }>({
    message: "Analyzing projects...",
    recommendations: [],
  });

  const projectIds = useMemo(
    () => projects.map((p) => p.id).join(","),
    [projects]
  );

  useEffect(() => {
    const generateInsights = async () => {
      if (projects.length === 0) {
        setInsights({
          message: "No projects available for analysis",
          recommendations: [],
        });
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const result = await aiService.generateInsights(projects);
        setInsights(result);
      } catch (error) {
        console.error("Error generating insights:", error);
        setInsights({
          message: "Unable to generate insights",
          recommendations: ["Please try again later"],
        });
      } finally {
        setLoading(false);
      }
    };

    generateInsights();
  }, [projectIds, projects]);

  return (
    <div
      className="bg-gradient-to-r from-purple-500 to-blue-500 
      p-6 rounded-lg shadow-lg text-white"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <h3 className="text-xl font-bold">AI Insights</h3>
        </div>
      </div>

      <div
        className="bg-white bg-opacity-20 backdrop-blur-sm 
        p-4 rounded-lg mb-4 text-black"
      >
        <p className="text-lg font-medium">
          {loading ? insights.message : "Analyzing projects..."}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-sm uppercase tracking-wide text-white">
          Recommendations
        </h4>
        <ul className="space-y-2">
          {insights.recommendations.length > 0 ? (
            insights.recommendations.map((rec, index) => (
              <li
                key={index}
                className="bg-white bg-opacity-20 backdrop-blur-sm 
                  p-3 rounded text-sm text-black"
              >
                {rec}
              </li>
            ))
          ) : (
            <li
              className="bg-white bg-opacity-10 backdrop-blur-sm 
              p-3 rounded text-sm text-white text-center"
            >
              No recommendations available
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
