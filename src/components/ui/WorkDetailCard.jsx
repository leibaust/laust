import { useParams, Link } from "react-router-dom";
import { projects } from "../../data/projects";

function WorkDetailCard() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  // Handle case where project is not found
  if (!project) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl mb-4">Project Not Found</h1>
        <p>Sorry, the project you're looking for doesn't exist.</p>
        <Link
          to="/works"
          className="text-primary hover:underline mt-4 inline-block"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Link
        to="/works"
        className="text-primary hover:underline mb-8 inline-block"
      >
        ← Back to Projects
      </Link>

      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

      <div className="mb-6">
        <p className="text-lg mb-4">{project.description}</p>

        <div className="mb-4">
          <h2 className="text-xl mb-2">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="bg-tertiary px-3 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-black px-4 py-2 rounded inline-block hover:bg-opacity-90 transition-all"
          >
            View Live
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-black px-4 py-2 rounded inline-block hover:bg-opacity-90 transition-all mx-4"
          >
            View GitHub
          </a>
        )}
      </div>

      {project.images && project.images.gallery && (
        <div className="mt-8">
          <h2 className="text-xl mb-4">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.gallery.map((image, index) => (
              <div
                key={index}
                className="aspect-video bg-tertiary rounded overflow-hidden drop-shadow-sm"
              >
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkDetailCard;
