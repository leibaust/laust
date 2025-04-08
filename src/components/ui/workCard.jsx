import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { useState, useRef, useEffect } from "react";

function WorkCard() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  // Handle mouse movement on card to update tooltip position
  const handleMouseMove = (e) => {
    setTooltipPosition({
      x: e.clientX + 20,
      y: e.clientY,
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
          x: tooltipPosition.x - rect.width - 40,
        }));
      }

      // Check if tooltip is going outside the bottom edge of screen
      if (tooltipPosition.y + rect.height / 2 > window.innerHeight) {
        setTooltipPosition((prevPos) => ({
          ...prevPos,
          y: window.innerHeight - rect.height / 2 - 20,
        }));
      }

      // Check if tooltip is going outside the top edge of screen
      if (tooltipPosition.y - rect.height / 2 < 0) {
        setTooltipPosition((prevPos) => ({
          ...prevPos,
          y: rect.height / 2 + 20,
        }));
      }
    }
  }, [tooltipPosition, hoveredProject]);

  // Predefined positions for random placement
  const positions = [
    { top: "5%", left: "0%" },
    { top: "0%", left: "70%" },
    { top: "50%", left: "-10%" },
    { top: "45%", left: "80%" },
    { top: "70%", left: "30%" },
    { top: "75%", left: "70%" },
    { top: "30%", left: "40%" },
    { top: "60%", left: "45%" },
  ];

  return (
    <>
      {/* Mobile layout (grid) */}
      <div className="grid grid-cols-1 w-80 sm:hidden gap-0 p-4">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/works/${project.id}`}
            className="block aspect-square cursor-pointer overflow-hidden transition-transform hover:scale-105 relative mb-4"
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

      {/* Desktop layout (random positioning) */}
      <div className="hidden sm:block relative h-[80vh] w-full">
        <style jsx>{`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          .float-animation-1 {
            animation: float 4s ease-in-out infinite;
          }
          .float-animation-2 {
            animation: float 4.5s ease-in-out infinite;
            animation-delay: 0.5s;
          }
          .float-animation-3 {
            animation: float 5s ease-in-out infinite;
            animation-delay: 1s;
          }
          .float-animation-4 {
            animation: float 5.5s ease-in-out infinite;
            animation-delay: 1.5s;
          }
        `}</style>

        {projects.map((project, index) => {
          // Use predefined position or fallback to random if not enough positions defined
          const position = positions[index % positions.length];

          // Assign different floating animations based on index
          const floatClass = `float-animation-${(index % 4) + 1}`;

          return (
            <Link
              key={project.id}
              to={`/works/${project.id}`}
              className={`absolute cursor-pointer overflow-hidden transition-transform hover:scale-105 w-48 h-48 ${floatClass}`}
              style={{
                top: position.top,
                left: position.left,
                zIndex: index + 1,
              }}
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
          );
        })}
      </div>

      {/* Custom Tooltip */}
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
            backgroundColor: "rgba(17, 24, 39, 0.5)",
            backgroundBlendMode: "overlay",
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
              {hoveredProject.technologies?.slice(0, 8).map((tech, index) => (
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
