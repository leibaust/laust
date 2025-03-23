import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { useState, useRef, useEffect } from "react";

function WorkCard() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  // Handle mouse movement on card to update tooltip position
  const handleMouseMove = (e) => {
    // Update position immediately with the actual cursor position
    setTooltipPosition({
      x: e.clientX + 20, // 20px to the right of cursor
      y: e.clientY, // Align with cursor vertically
    });
  };

  // Ensure tooltip stays within viewport
  useEffect(() => {
    if (hoveredProject && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();

      // Check if tooltip is going outside the right edge of screen
      if (tooltipPosition.x + rect.width > window.innerWidth) {
        setTooltipPosition((prevPos) => ({
          ...prevPos,
          x: tooltipPosition.x - rect.width - 40, // Place to the left of cursor
        }));
      }

      // Check if tooltip is going outside the bottom edge of screen
      if (tooltipPosition.y + rect.height / 2 > window.innerHeight) {
        setTooltipPosition((prevPos) => ({
          ...prevPos,
          y: window.innerHeight - rect.height / 2 - 20, // Adjust vertical position
        }));
      }

      // Check if tooltip is going outside the top edge of screen
      if (tooltipPosition.y - rect.height / 2 < 0) {
        setTooltipPosition((prevPos) => ({
          ...prevPos,
          y: rect.height / 2 + 20, // Adjust vertical position
        }));
      }
    }
  }, [tooltipPosition, hoveredProject]);

  return (
    <>
      <div className="grid grid-cols-1 w-80 sm:grid-cols-2 gap-0 p-4 sm:w-full">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/works/${project.id}`}
            className="block aspect-square cursor-pointer overflow-hidden transition-transform hover:scale-105 relative"
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            onMouseMove={handleMouseMove}
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

      {/* Custom Tooltip - with centered content and GIF background */}
      {hoveredProject && (
        <div
          ref={tooltipRef}
          className="fixed pointer-events-none z-50 p-4 border border-tertiary shadow-lg w-64 h-64 flex flex-col justify-center items-center"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(0, -50%)",
            transition: "none",
            backgroundImage: hoveredProject.images?.previewgif
              ? `url(${hoveredProject.images.previewgif})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "rgba(17, 24, 39, 0.5)", // darkbg with opacity
            backgroundBlendMode: "overlay", // This helps text readability
          }}
        >
          <div className="p-3 text-center w-full">
            <h3 className="text-primary text-xl font-bold mb-2">
              {hoveredProject.title}
            </h3>
            <p className="text-white text-sm mb-2">
              {hoveredProject.shortDescription}
            </p>
            <div className="flex flex-wrap justify-center gap-1">
              {hoveredProject.technologies?.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs bg-tertiary px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WorkCard;
