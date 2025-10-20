import { useEffect, useState } from "react";
import { useProject } from "../context/use.context";
import { ProjectChart } from "../components/project.chart";
import { AiRecommendations } from "../components/ai.recommendations";
import { ProjectTimelineChart } from "../components/project-timeline.chart";
import { ProjectStatusChart } from "../components/project-status.chart";
import { ExportReport } from "../components/export-report";

/**
 * Dashboard page with project overview and statistics
 * @page
 */
export const Dashboard = () => {
  const { projects, getProjects } = useProject();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await getProjects();
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [getProjects]);

  const recentProjects = projects
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - 
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center 
        justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 
            border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              AI-powered project analytics and insights
            </p>
          </div>
          <ExportReport />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <ProjectChart />
          </div>
          <div className="space-y-6">
            <AiRecommendations />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ProjectTimelineChart />
          <ProjectStatusChart />
        </div>

        <div className="space-y-6 mb-8">
          {recentProjects.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📋 Recent Projects
              </h2>
              <div className="space-y-3">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between 
                      p-4 border border-gray-200 rounded-lg 
                      hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {project.description || "No description"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold 
                          rounded-full ${
                            project.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {projects.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <span className="text-6xl mb-4 block">📊</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No projects yet
            </h2>
            <p className="text-gray-600">
              Create your first project to see AI-powered insights!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

