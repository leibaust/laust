import { Link } from "react-router-dom";

function workCard({ project }) {
  return (
    <div className="work-card">
      <img src={project.images.thumbnail} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.shortDescription}</p>
      <div className="technologies">
        {project.technologies.map((tech) => (
          <span key={tech} className="tech-icon">
            {tech}
          </span>
        ))}
      </div>
      <Link to={`/works/${project.id}`}>DETAILS »</Link>
    </div>
  );
}

export default workCard;
