import { useEffect } from "react";
import { useAnalytics } from "../context/use.analytics.context";

/**
 * Chart component for visualizing project statistics
 * @organism
 */
export const ProjectChart = () => {
  const { graphicsData, loading, getGraphicsData } = useAnalytics();

  useEffect(() => {
    getGraphicsData();
  }, []);

  const getStatusData = (status: string) => {
    return graphicsData?.projectsByStatus.find(
      (p) => p.status === status
    ) || { count: 0, percentage: 0 };
  };

  const inProgressData = getStatusData("in progress");
  const completedData = getStatusData("completed");

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

  if (loading || !graphicsData) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Projects"
          value={graphicsData.totalProjects}
          color="bg-purple-100"
        />
        <StatCard
          label="In Progress"
          value={graphicsData.inProgressProjects}
          color="bg-blue-100"
        />
        <StatCard
          label="Completed"
          value={graphicsData.completedProjects}
          color="bg-green-100"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Project Status Distribution
        </h3>

        {graphicsData.totalProjects === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No projects to display
          </p>
        ) : (
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">In Progress</span>
                <span className="font-medium text-gray-900">
                  {inProgressData.count} (
                  {inProgressData.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full 
                    transition-all duration-500"
                  style={{ width: `${inProgressData.percentage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Completed</span>
                <span className="font-medium text-gray-900">
                  {completedData.count} (
                  {completedData.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full 
                    transition-all duration-500"
                  style={{ width: `${completedData.percentage}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
