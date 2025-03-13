import { Link } from "react-router-dom";
import { projects } from "../../data/projects";

function WorkCard() {
  return (
    <div className="grid grid-cols-1 w-80 sm:grid-cols-2 gap-0 p-4 sm:w-2/5">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/works/${project.id}`}
          className="block aspect-square cursor-pointer overflow-hidden transition-transform hover:scale-105"
        >
          {project.images && project.images.thumbnail ? (
            <img
              src={project.images.thumbnail}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-tertiary">
              <span className="text-lg font-bold">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default WorkCard;
