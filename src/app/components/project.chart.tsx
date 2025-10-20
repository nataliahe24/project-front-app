import { useMemo } from "react";
import { useProject } from "../context/use.context";

/**
 * Chart component for visualizing project statistics
 * @organism
 */
export const ProjectChart = () => {
  const { projects } = useProject();

  const stats = useMemo(() => {
    const inProgress = projects.filter(
      (p) => p.status === "in progress"
    ).length;
    const completed = projects.filter(
      (p) => p.status === "completed"
    ).length;
    const total = projects.length;

    const inProgressPercent = total > 0 
      ? (inProgress / total) * 100 
      : 0;
    const completedPercent = total > 0 
      ? (completed / total) * 100 
      : 0;

    return {
      inProgress,
      completed,
      total,
      inProgressPercent,
      completedPercent,
    };
  }, [projects]);

  const StatCard = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color: string;
  }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {value}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-full ${color} 
          flex items-center justify-center`}>
          <span className="text-2xl">📊</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Projects"
          value={stats.total}
          color="bg-purple-100"
        />
        <StatCard
          label="In Progress"
          value={stats.inProgress}
          color="bg-blue-100"
        />
        <StatCard
          label="Completed"
          value={stats.completed}
          color="bg-green-100"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Project Status Distribution
        </h3>

        {stats.total === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No projects to display
          </p>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">In Progress</span>
                <span className="font-medium text-gray-900">
                  {stats.inProgress} ({stats.inProgressPercent.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full 
                    transition-all duration-500"
                  style={{ width: `${stats.inProgressPercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Completed</span>
                <span className="font-medium text-gray-900">
                  {stats.completed} ({stats.completedPercent.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full 
                    transition-all duration-500"
                  style={{ width: `${stats.completedPercent}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
