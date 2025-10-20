import { useState } from "react";
import type { ProjectResponse } from "../helpers/project.model";
import { useProject } from "../context/use.context";
import { useAnalytics } from "../context/use.analytics.context";

interface ProjectTableProps {
  onEdit?: (project: ProjectResponse) => void;
}

/**
 * Table component for displaying projects list
 * @organism
 */
export const ProjectTable = ({ onEdit }: ProjectTableProps) => {
  const { projects, deleteProject } = useProject();
  const { getProjectAnalysis } = useAnalytics();
  const [deleting, setDeleting] = useState<string>("");
  const [loadingSummary, setLoadingSummary] = useState<string>("");
  const [selectedSummary, setSelectedSummary] = useState<{
    projectId: string;
    summary: string;
  } | null>(null);

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setDeleting(id);
    try {
      await deleteProject(id);
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    } finally {
      setDeleting("");
    }
  };

  const getStatusBadge = (status: string): string => {
    const badges: Record<string, string> = {
      "in progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    return badges[status] || "bg-gray-100 text-gray-800";
  };

  const handleViewSummary = async (projectId: string) => {
    setLoadingSummary(projectId);
    try {
      const analysis = await getProjectAnalysis(projectId);
      setSelectedSummary({
        projectId,
        summary: analysis.summary,
      });
    } catch (error) {
      console.error("Error fetching AI summary:", error);
      alert("Failed to generate AI summary");
    } finally {
      setLoadingSummary("");
    }
  };

  const closeSummaryModal = () => {
    setSelectedSummary(null);
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No projects found</p>
        <p className="text-gray-400 text-sm mt-2">
          Create your first project to get started
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium 
                text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium 
                text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium 
                text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium 
                text-gray-500 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium 
                text-gray-500 uppercase tracking-wider">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium 
                text-gray-500 uppercase tracking-wider">
                AI Summary
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium 
                text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => (
            <tr
              key={project.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {project.name}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500 max-w-xs 
                  truncate">
                  {project.description || "-"}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 inline-flex text-xs 
                    leading-5 font-semibold rounded-full 
                    ${getStatusBadge(project.status)}`}
                >
                  {project.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm 
                text-gray-500">
                {formatDate(project.startDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm 
                text-gray-500">
                {formatDate(project.endDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm 
                font-medium">
                <button
                  onClick={() => handleViewSummary(project.id)}
                  disabled={loadingSummary === project.id}
                  className="text-purple-600 hover:text-purple-900 
                    disabled:text-gray-400 transition-colors 
                    flex items-center gap-1"
                >
                  {loadingSummary === project.id ? (
                    "Loading..."
                  ) : (
                    <>
                      <span>🤖</span>
                      <span>View</span>
                    </>
                  )}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm 
                font-medium">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(project)}
                    className="text-blue-600 hover:text-blue-900 
                      transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    disabled={deleting === project.id}
                    className="text-red-600 hover:text-red-900 
                      disabled:text-gray-400 transition-colors"
                  >
                    {deleting === project.id ? "..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {selectedSummary && (
      <div className="fixed inset-0 bg-black bg-opacity-50 
        flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl 
          w-full max-h-[80vh] overflow-auto">
          <div className="sticky top-0 bg-white border-b 
            border-gray-200 px-6 py-4 flex justify-between 
            items-center">
            <h3 className="text-lg font-semibold text-gray-900 
              flex items-center gap-2">
              <span>🤖</span>
              <span>AI Project Summary</span>
            </h3>
            <button
              onClick={closeSummaryModal}
              className="text-gray-400 hover:text-gray-600 
                transition-colors text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <div className="px-6 py-4">
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap 
                leading-relaxed">
                {selectedSummary.summary}
              </p>
            </div>
          </div>
          <div className="sticky bottom-0 bg-gray-50 border-t 
            border-gray-200 px-6 py-4 flex justify-end">
            <button
              onClick={closeSummaryModal}
              className="px-4 py-2 bg-blue-600 text-white 
                rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};
