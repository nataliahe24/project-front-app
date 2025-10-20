import { useState } from "react";
import { ProjectContextProvider } from "./app/context/project.context";
import { Dashboard } from "./app/pages/dashboard";
import { Projects } from "./app/pages/projects";

type Page = "dashboard" | "projects";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");

  const NavButton = ({ 
    page, 
    label 
  }: { 
    page: Page; 
    label: string 
  }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-4 py-2 rounded-lg transition-colors ${
        currentPage === page
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );

  return (
    <ProjectContextProvider>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📊</span>
                <h1 className="text-xl font-bold text-gray-900">
                  Project Manager
                </h1>
              </div>
              <div className="flex gap-3">
                <NavButton page="dashboard" label="Dashboard" />
                <NavButton page="projects" label="Projects" />
              </div>
            </div>
          </div>
        </nav>

        <main>
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "projects" && <Projects />}
        </main>
      </div>
    </ProjectContextProvider>
  );
}

export default App;
