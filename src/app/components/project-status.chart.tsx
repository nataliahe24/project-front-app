import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useProject } from "../context/use.context";

/**
 * Bar chart showing project status distribution
 * @organism
 */
export const ProjectStatusChart = () => {
  const { projects } = useProject();

  const statusData = useMemo(() => {
    const inProgress = projects.filter(
      (p) => p.status === "in progress"
    ).length;
    const completed = projects.filter(
      (p) => p.status === "completed"
    ).length;

    return [
      {
        status: "In Progress",
        count: inProgress,
        color: "#3b82f6",
      },
      {
        status: "Completed",
        count: completed,
        color: "#10b981",
      },
    ];
  }, [projects]);

  if (projects.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">No status data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📊 Project Status Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={statusData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Projects" radius={[8, 8, 0, 0]}>
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

