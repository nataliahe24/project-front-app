import { useState } from "react";
import type { ProjectResponse } from "../helpers/project.model";
import { useProject } from "../context/use.context";

interface ProjectTableProps {
  onEdit?: (project: ProjectResponse) => void;
}

/**
 * Table component for displaying projects list
 * @organism
 */
export const ProjectTable = ({ onEdit }: ProjectTableProps) => {
  const { projects, deleteProject } = useProject();
  const [deleting, setDeleting] = useState<string>("");

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
  );
};
