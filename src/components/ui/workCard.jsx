import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// A <video> can only decode real video. Feeding it a .gif or .png fails
// silently — the file downloads, the element stays blank — so pick the element
// from the file type instead.
const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src);

/**
 * Which corner of a card its title hangs from.
 *
 * Always the corner facing away from the middle of the stage, so the names
 * push outward and the centre of the composition stays open. Derived from the
 * slot rather than stored per project — move a card to another quadrant and its
 * label follows.
 */
const cornerFor = ({ top, left }) =>
  `${parseFloat(top) < 40 ? "top" : "bottom"}-${
    parseFloat(left) < 40 ? "left" : "right"
  }`;

// The title's centre point is pinned to the corner itself, so roughly three
// quarters of the word overhangs the square.
const CORNER_ANCHORS = {
  "top-left": { top: 0, left: 0 },
  "top-right": { top: 0, left: "100%" },
  "bottom-left": { top: "100%", left: 0 },
  "bottom-right": { top: "100%", left: "100%" },
};

// How far each layer drifts from the mouse, in pixels, at full deflection
// (cursor at the stage's edge). The title is the "closer" layer and moves
// further than the thumbnail beneath it — that differential is what reads as
// space between the two, not the absolute distance either one travels.
const THUMBNAIL_PARALLAX_PX = 7;
const TITLE_PARALLAX_PX = 22;

// The thumbnail pans by THUMBNAIL_PARALLAX_PX inside a frame that clips it, so
// it has to be scaled up first — otherwise panning would uncover a sliver of
// empty space at the trailing edge. 1.08 comfortably covers a 7px pan on a
// 192px card.
const THUMBNAIL_PARALLAX_SCALE = 1.08;

function WorkCard() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  const stageRef = useRef(null);

  // Raw cursor position over the desktop stage, normalized to -1..1 on each
  // axis (0 = stage centre). Smoothed with the same spring feel as the custom
  // cursor so the parallax settles rather than snapping to the pointer.
  const stageX = useMotionValue(0);
  const stageY = useMotionValue(0);
  const springX = useSpring(stageX, { stiffness: 50, damping: 20, mass: 1 });
  const springY = useSpring(stageY, { stiffness: 50, damping: 20, mass: 1 });

  // Layer 1 (thumbnail): small pan + the scale needed to cover it.
  const thumbnailTransform = useTransform([springX, springY], ([x, y]) =>
    `translate3d(${x * THUMBNAIL_PARALLAX_PX}px, ${y * THUMBNAIL_PARALLAX_PX}px, 0) scale(${THUMBNAIL_PARALLAX_SCALE})`
  );

  // Layer 2 (title): larger drift, composed with the corner-anchor centering
  // translate that already lives on this element.
  const titleTransform = useTransform([springX, springY], ([x, y]) =>
    `translate(-50%, -50%) translate3d(${x * TITLE_PARALLAX_PX}px, ${y * TITLE_PARALLAX_PX}px, 0)`
  );

  const handleStageMouseMove = (e) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stageX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    stageY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  // Drift back to centre once the cursor leaves the stage, rather than
  // leaving the layers parked off to one side.
  const handleStageMouseLeave = () => {
    stageX.set(0);
    stageY.set(0);
  };

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

  // Card placement inside the 80vh stage. Each slot sits clearly in one
  // quadrant so its label has open space to hang into — see cornerFor().
  const positions = [
    { top: "10%", left: "0%" },
    { top: "6%", left: "72%" },
    { top: "58%", left: "2%" },
    { top: "62%", left: "70%" },
    { top: "8%", left: "36%" },
    { top: "72%", left: "36%" },
    { top: "34%", left: "0%" },
    { top: "36%", left: "74%" },
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
      <div
        ref={stageRef}
        className="hidden sm:block relative h-[80vh] w-full"
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
      >
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

          const anchor = CORNER_ANCHORS[cornerFor(position)];

          return (
            <Link
              key={project.id}
              to={`/works/${project.id}`}
              className={`absolute cursor-pointer transition-transform hover:scale-105 w-48 h-48 ${floatClass}`}
              style={{
                top: position.top,
                left: position.left,
                zIndex: index + 1,
              }}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
              onMouseMove={handleMouseMove}
            >
              {/* The thumbnail clips to the square; the title deliberately
                  does not, so overflow-hidden lives here rather than on the
                  link itself. */}
              <div className="h-full w-full overflow-hidden">
                {project.images && project.images.thumbnail ? (
                  <motion.img
                    src={project.images.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover"
                    style={{ transform: thumbnailTransform }}
                  />
                ) : (
                  <motion.div
                    className="flex h-full w-full items-center justify-center bg-tertiary"
                    style={{ transform: thumbnailTransform }}
                  >
                    <span className="text-lg font-bold">
                      {project.title.charAt(0)}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* Title, centred on the outward corner. aria-hidden because the
                  thumbnail's alt text already names the project, and
                  pointer-events-none so a name overhanging a neighbouring card
                  cannot swallow its clicks. */}
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute select-none whitespace-nowrap font-body uppercase leading-none tracking-wide text-white"
                style={{
                  ...anchor,
                  transform: titleTransform,
                  fontSize: "clamp(1.75rem, 3.6vw, 4rem)",
                }}
              >
                {project.title}
              </motion.span>
            </Link>
          );
        })}
      </div>

      {/* Custom Tooltip */}
      {hoveredProject && (
        <div
          ref={tooltipRef}
          className="fixed pointer-events-none z-50 p-4 border border-tertiary shadow-lg w-64 h-64 flex flex-col justify-center items-center overflow-hidden"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: "translate(0, -50%)",
            transition: "none",
            backgroundColor: "rgba(17, 24, 39, 0.5)",
          }}
        >
          {hoveredProject.images?.preview &&
            (isVideo(hoveredProject.images.preview) ? (
              <video
                key={hoveredProject.id}
                src={hoveredProject.images.preview}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                key={hoveredProject.id}
                src={hoveredProject.images.preview}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ))}

          {/* Scrim. The preview media is absolutely positioned over the whole
              tooltip, so it covers the container's own background colour — the
              title and description need their own layer to stay legible over a
              bright screenshot. */}
          <div
            className="absolute inset-0 bg-black/65 pointer-events-none"
            aria-hidden="true"
          />

          <div className="p-3 text-center w-full relative z-10">
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
