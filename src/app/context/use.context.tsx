import { useContext } from "react";
import { ProjectContext } from "./project.context";

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) {
      throw new Error("useProject must be used within a ProjectServiceProvider");
    }
    return context;
  };