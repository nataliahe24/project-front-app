import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useProject } from "../context/use.context";

/**
 * Timeline chart showing project trends over time
 * @organism
 */
export const ProjectTimelineChart = () => {
  const { projects } = useProject();

  const timelineData = useMemo(() => {
    if (projects.length === 0) return [];

    const monthsSet = new Set<string>();
    projects.forEach((p) => {
      const start = new Date(p.startDate);
      monthsSet.add(
        `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}`
      );
      
      if (p.endDate) {
        const end = new Date(p.endDate);
        monthsSet.add(
          `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}`
        );
      }
    });

    const months = Array.from(monthsSet).sort();

    
    return months.map((month) => {
      const [year, monthNum] = month.split("-");
      const monthDate = new Date(
        parseInt(year),
        parseInt(monthNum) - 1,
        1
      );

      const startedThisMonth = projects.filter((p) => {
        const start = new Date(p.startDate);
        return (
          start.getFullYear() === monthDate.getFullYear() &&
          start.getMonth() === monthDate.getMonth()
        );
      }).length;

      const completedThisMonth = projects.filter((p) => {
        if (!p.endDate || p.status !== "completed") return false;
        const end = new Date(p.endDate);
        return (
          end.getFullYear() === monthDate.getFullYear() &&
          end.getMonth() === monthDate.getMonth()
        );
      }).length;

      const activeInMonth = projects.filter((p) => {
        const start = new Date(p.startDate);
        const end = p.endDate ? new Date(p.endDate) : new Date();
        return start <= monthDate && end >= monthDate;
      }).length;

      return {
        month: monthDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        started: startedThisMonth,
        completed: completedThisMonth,
        active: activeInMonth,
      };
    });
  }, [projects]);

  if (timelineData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">
          No timeline data available
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📈 Project Timeline
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="started"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Started"
          />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#10b981"
            strokeWidth={2}
            name="Completed"
          />
          <Line
            type="monotone"
            dataKey="active"
            stroke="#f59e0b"
            strokeWidth={2}
            name="Active"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

