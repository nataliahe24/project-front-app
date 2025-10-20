import { useState, useEffect } from "react";
import { useProject } from "../context/use.context";

interface Prediction {
  projectName: string;
  estimatedCompletion: string;
  confidence: "high" | "medium" | "low";
  daysRemaining: number;
}

/**
 * AI-powered predictions for project completion
 * @organism
 */
export const AiPredictions = () => {
  const { projects } = useProject();
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    const generatePredictions = () => {
      const inProgressProjects = projects.filter(
        (p) => p.status === "in progress"
      );

      if (inProgressProjects.length === 0) {
        setPredictions([]);
        return;
      }

      const now = new Date();
      const preds: Prediction[] = inProgressProjects.map((p) => {
        const startDate = new Date(p.startDate);
        const endDate = p.endDate ? new Date(p.endDate) : null;

        let estimatedCompletion = "Unknown";
        let confidence: "high" | "medium" | "low" = "low";
        let daysRemaining = 0;

        if (endDate) {
          // Calculate days remaining
          daysRemaining = Math.ceil(
            (endDate.getTime() - now.getTime()) / 
            (1000 * 60 * 60 * 24)
          );

          estimatedCompletion = endDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          // Determine confidence based on proximity to deadline
          if (daysRemaining > 30) {
            confidence = "high";
          } else if (daysRemaining > 7) {
            confidence = "medium";
          } else {
            confidence = "low";
          }
        } else {
          // Estimate based on average project duration
          const avgDuration = 30; // default 30 days
          const elapsed = Math.ceil(
            (now.getTime() - startDate.getTime()) / 
            (1000 * 60 * 60 * 24)
          );
          
          daysRemaining = Math.max(avgDuration - elapsed, 1);
          
          const estimated = new Date(now);
          estimated.setDate(estimated.getDate() + daysRemaining);
          
          estimatedCompletion = estimated.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          
          confidence = "low";
        }

        return {
          projectName: p.name,
          estimatedCompletion,
          confidence,
          daysRemaining,
        };
      });

      setPredictions(preds.sort((a, b) => a.daysRemaining - b.daysRemaining));
    };

    generatePredictions();
  }, [projects]);

  const getConfidenceBadge = (confidence: string) => {
    const badges = {
      high: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-red-100 text-red-800",
    };
    return badges[confidence as keyof typeof badges];
  };

  if (predictions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">
          No active projects to predict
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          🔮 Completion Predictions
        </h3>
      </div>

      <div className="space-y-3">
        {predictions.map((pred, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 
              hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900">
                {pred.projectName}
              </h4>
              <span
                className={`text-xs px-2 py-1 rounded-full 
                  font-medium ${getConfidenceBadge(pred.confidence)}`}
              >
                {pred.confidence} confidence
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="text-gray-600">Est. completion:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {pred.estimatedCompletion}
                </span>
              </div>
              <div className="text-gray-600">
                {pred.daysRemaining > 0 ? (
                  <span>
                    {pred.daysRemaining} day{pred.daysRemaining !== 1 ? "s" : ""} left
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Overdue
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

