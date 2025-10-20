import { useState } from "react";
import type { ProjectResponse } from "../helpers/project.model";
import { ProjectForm } from "../components/project.form";
import { ProjectTable } from "../components/project.table";
import { ExportReport } from "../components/export-report";

export const Projects = () => {
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Projects
          </h2>
          <div className="flex gap-3">
            <ExportReport />
            <button
              onClick={handleNewProject}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg 
                hover:bg-blue-700 transition-colors shadow-md 
                hover:shadow-lg"
            >
              + New Project
            </button>
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

        <ProjectTable onEdit={handleEdit} />
      </div>
    </div>
  );
};

