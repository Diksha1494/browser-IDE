import { useEffect } from "react";

import useIDEStore from "../store/useIDEStore";

const ProjectSidebar = () => {
  const {
    projects,
    fetchProjects,
    createNewProject,
    loadProjectById,
    deleteProjectById,
  } = useIDEStore();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="project-sidebar">
      <button
        onClick={() => {
          const name = prompt(
            "Project Name"
          );

          if (name) {
            createNewProject(name);
          }
        }}
      >
        + New Project
      </button>

      {projects.map((project) => (
        <div
          key={project._id}
          className="project-item"
        >
          <span
            onClick={() =>
              loadProjectById(
                project._id
              )
            }
          >
            {project.name}
          </span>

          <button
            onClick={() =>
              deleteProjectById(
                project._id
              )
            }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectSidebar;