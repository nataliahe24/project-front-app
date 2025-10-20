import { useState } from "react";
import type { ProjectResponse } from "../helpers/project.model";
import { ProjectForm } from "../components/project.form";
import { ProjectTable } from "../components/project.table";
import { ExportReport } from "../components/export-report";
import { useProject } from "../context/use.context";

export const Projects = () => {
  const { projects } = useProject();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<
    ProjectResponse | undefined
  >();

  const handleEdit = (project: ProjectResponse) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingProject(undefined);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(undefined);
  };

  const handleNewProject = () => {
    setEditingProject(undefined);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 
      via-blue-50 to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 
            border border-gray-100">
            <div className="flex flex-col md:flex-row 
              md:justify-between md:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500 
                  to-purple-600 p-3 rounded-xl shadow-lg">
                  <span className="text-3xl">📁</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 
                    bg-gradient-to-r from-blue-600 to-purple-600 
                    bg-clip-text text-transparent">
                    My Projects
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage and track your project portfolio
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <ExportReport />
                <button
                  onClick={handleNewProject}
                  className="group relative bg-gradient-to-r 
                    from-blue-600 to-purple-600 text-white 
                    px-6 py-3 rounded-xl font-medium
                    hover:from-blue-700 hover:to-purple-700 
                    transition-all duration-300 shadow-lg 
                    hover:shadow-xl hover:scale-105
                    flex items-center gap-2"
                >
                  <span className="text-xl">+</span>
                  <span>New Project</span>
                  <div className="absolute inset-0 rounded-xl 
                    bg-white opacity-0 group-hover:opacity-20 
                    transition-opacity" />
                </button>
              </div>
            </div>

            {/* Stats Bar */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 
                  bg-gradient-to-br from-blue-50 to-blue-100 
                  rounded-lg">
                  <div className="bg-blue-500 p-2 rounded-lg">
                    <span className="text-xl">📊</span>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 
                      font-medium uppercase">
                      Total Projects
                    </p>
                    <p className="text-2xl font-bold text-blue-900">
                      {projects.length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 
                  bg-gradient-to-br from-yellow-50 to-yellow-100 
                  rounded-lg">
                  <div className="bg-yellow-500 p-2 rounded-lg">
                    <span className="text-xl">⏳</span>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-600 
                      font-medium uppercase">
                      In Progress
                    </p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {projects.filter(
                        (p) => p.status === "in progress"
                      ).length}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 
                  bg-gradient-to-br from-green-50 to-green-100 
                  rounded-lg">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <span className="text-xl">✅</span>
                  </div>
                  <div>
                    <p className="text-xs text-green-600 
                      font-medium uppercase">
                      Completed
                    </p>
                    <p className="text-2xl font-bold text-green-900">
                      {projects.filter(
                        (p) => p.status === "completed"
                      ).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showForm && (
          <div className="mb-6">
            <ProjectForm
              project={editingProject}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          </div>
        )}
        <div className="animate-fadeIn">
          <ProjectTable onEdit={handleEdit} />
        </div>
      </div>
    </div>
  );
};

