import { createContext, useState, useEffect } from "react";
import type { Project, ProjectResponse } from "../helpers/project.model";
import { projectService } from "../core/project.service";

interface ProjectContextType {
  projects: ProjectResponse[];
  getProjects: () => Promise<ProjectResponse[]>;
  getProjectById: (id: string) => Promise<ProjectResponse>;
  createProject: (project: Project) => Promise<ProjectResponse>;
  updateProject: (id: string, project: Project) => Promise<ProjectResponse>;
  deleteProject: (id: string) => Promise<void>;
}

export const ProjectContext = createContext<ProjectContextType>({
  projects: [],
  getProjects: async () => [],
  getProjectById: async () => ({} as ProjectResponse),
  createProject: async () => ({} as ProjectResponse),
  updateProject: async () => ({} as ProjectResponse),
  deleteProject: async () => {},
});

interface ProjectServiceProviderProps {
  children: React.ReactNode;
}

export const ProjectContextProvider = ({
  children,
}: ProjectServiceProviderProps) => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);

  useEffect(() => {
    projectService.getProjects().then((data) => setProjects(data));
  }, []);

  const getProjects = async () => {
    const data = await projectService.getProjects();
    setProjects(data);
    return data;
  };

  const getProjectById = async (id: string) => {
    const data = await projectService.getProjectById(id);
    return data;
  };

  const createProject = async (project: Project) => {
    const data = await projectService.createProject(project);
    setProjects([...projects, data]);
    return data;
  };

  const updateProject = async (id: string, project: Project) => {
    const data = await projectService.updateProject(id, project);
    setProjects(projects.map((p) => (p.id === id ? data : p)));
    return data;
  };

  const deleteProject = async (id: string) => {
    await projectService.deleteProject(id);
    setProjects(projects.filter((p) => p.id !== id));
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        getProjects,
        getProjectById,
        createProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
