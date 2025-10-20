import { useState, useEffect } from "react";
import type { Project, ProjectResponse } from "../helpers/project.model";
import { VALID_PROJECT_STATUSES } from "../helpers/project.model";
import { useProject } from "../context/use.context";

interface ProjectFormProps {
  project?: ProjectResponse;
  onSuccess?: () => void;
  onCancel?: () => void;
}

/**
 * Form component for creating and editing projects
 * @organism
 */
export const ProjectForm = ({
  project,
  onSuccess,
  onCancel,
}: ProjectFormProps) => {
  const { createProject, updateProject } = useProject();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: boolean;
    startDate?: boolean;
    endDate?: boolean;
  }>({});

  const [formData, setFormData] = useState<Project>({
    name: "",
    description: "",
    status: "in progress",
    startDate: new Date(),
    endDate: undefined,
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        status: project.status,
        startDate: project.startDate,
        endDate: project.endDate,
      });
    }
  }, [project]);

  const handleChange = (
    field: keyof Project,
    value: string | Date | undefined
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field as keyof typeof fieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [field]: false }));
    }
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    if (!formData.name || formData.name.trim().length === 0) {
      setError("The project name is required");
      setFieldErrors({ name: true });
      setLoading(false);
      return;
    }

    if (formData.name.trim().length < 3) {
      setError("The project name must be at least 3 characters long");
      setFieldErrors({ name: true });
      setLoading(false);
      return;
    }

 
    const now = new Date();
    now.setHours(0, 0, 0, 0); 
    const startDate = new Date(formData.startDate);
    startDate.setHours(0, 0, 0, 0);
    
    if (startDate > now) {
      setError("The start date cannot be in the future");
      setFieldErrors({ startDate: true });
      setLoading(false);
      return;
    }

    if (formData.endDate && formData.startDate > formData.endDate) {
      setError("The end date must be after the start date");
      setFieldErrors({ startDate: true, endDate: true });
      setLoading(false);
      return;
    }

    try {
      if (project) {
        await updateProject(project.id, formData);
      } else {
        await createProject(formData);
      }
      onSuccess?.();
    } catch (err: any) {
      console.error("Form error:", err);
      
 
      let errorMessage = "Error saving the project";
      
      if (err?.message) {
        errorMessage = err.message;
      } else if (err?.error) {
        errorMessage = err.error;
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      }
      
    
      errorMessage = errorMessage
        .replace(/HTTP Error: \d+/gi, "")
        .replace(/Error:/gi, "")
        .trim();
      
      setError(errorMessage || "Error saving the project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 sm:space-y-6 bg-white p-4 sm:p-6 
        rounded-lg shadow-md max-w-4xl mx-auto"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 
        sm:mb-4">
        {project ? "Edit Project" : "New Project"}
      </h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 
          rounded-r-md shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-red-500 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error al guardar el proyecto
              </h3>
              <div className="mt-1 text-sm text-red-700">
                {error}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-xs sm:text-sm font-medium 
          text-gray-700 mb-1 sm:mb-2">
          Name *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className={`w-full px-3 py-2 text-sm sm:text-base 
            border rounded-md focus:outline-none focus:ring-2 
            transition-shadow ${
              fieldErrors.name
                ? "border-red-500 focus:ring-red-500 bg-red-50"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          placeholder="Project name"
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium 
          text-gray-700 mb-1 sm:mb-2">
          Description
        </label>
        <textarea
          value={formData.description || ""}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full px-3 py-2 text-sm sm:text-base 
            border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            transition-shadow resize-none"
          placeholder="Project description"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium 
          text-gray-700 mb-1 sm:mb-2">
          Status *
        </label>
        <select
          required
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className="w-full px-3 py-2 text-sm sm:text-base 
            border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-blue-500 
            transition-shadow"
        >
          {VALID_PROJECT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium 
            text-gray-700 mb-1 sm:mb-2">
            Start Date *
          </label>
          <input
            type="date"
            required
            max={new Date().toISOString().split("T")[0]}
            value={
              formData.startDate instanceof Date
                ? formData.startDate.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              handleChange("startDate", new Date(e.target.value))
            }
            className={`w-full px-3 py-2 text-sm sm:text-base 
              border rounded-md focus:outline-none focus:ring-2 
              transition-shadow ${
                fieldErrors.startDate
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium 
            text-gray-700 mb-1 sm:mb-2">
            End Date
          </label>
          <input
            type="date"
            value={
              formData.endDate instanceof Date
                ? formData.endDate.toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              handleChange(
                "endDate",
                e.target.value ? new Date(e.target.value) : undefined
              )
            }
            className={`w-full px-3 py-2 text-sm sm:text-base 
              border rounded-md focus:outline-none focus:ring-2 
              transition-shadow ${
                fieldErrors.endDate
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2 
        sm:pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base 
              border border-gray-300 rounded-md 
              hover:bg-gray-50 active:bg-gray-100 
              transition-colors font-medium"
          >
            Cancel
          </button>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:flex-1 bg-blue-600 text-white 
            px-4 py-2 text-sm sm:text-base rounded-md 
            hover:bg-blue-700 active:bg-blue-800 
            disabled:bg-gray-400 disabled:cursor-not-allowed 
            transition-colors font-medium shadow-sm 
            hover:shadow-md"
        >
          {loading ? "Saving..." : project ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};
