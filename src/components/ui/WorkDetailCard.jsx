import { useParams, Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { useState, useEffect } from "react";

function WorkDetailCard() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    currentImage: 0,
  });

  // Handle lightbox keyboard navigation and close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox.isOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Lock body scroll when lightbox is open
    if (lightbox.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox.isOpen, lightbox.currentImage]);

  // Lightbox controls
  const openLightbox = (index) => {
    setLightbox({ isOpen: true, currentImage: index });
  };

  const closeLightbox = () => {
    setLightbox({ ...lightbox, isOpen: false });
  };

  const nextImage = () => {
    if (!project.images?.gallery) return;
    setLightbox({
      ...lightbox,
      currentImage: (lightbox.currentImage + 1) % project.images.gallery.length,
    });
  };

  const prevImage = () => {
    if (!project.images?.gallery) return;
    setLightbox({
      ...lightbox,
      currentImage:
        (lightbox.currentImage - 1 + project.images.gallery.length) %
        project.images.gallery.length,
    });
  };

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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full sm:max-w-5xl bg-secondary">
      {/* left column  */}
      <div>
        <Link
          to="/works"
          className="text-darkbg hover:underline mb-8 inline-block"
        >
          ← Back to Projects
        </Link>

        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>

        <div className="mb-6">
          <div className="max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
            {project.concept && (
              <>
                <h2>Concept & Vision</h2>
                <p className="text-lg mb-4">{project.concept}</p>
              </>
            )}

            {project.design && (
              <>
                <h2>Design & Planning</h2>
                <p className="text-lg mb-4">{project.design}</p>
              </>
            )}
            {project.development && (
              <>
                <h2>Development & Implementation</h2>
                <p className="text-lg mb-4">{project.development}</p>
              </>
            )}
            {project.challenges && (
              <>
                <h2>Challenges & Learnings</h2>
                <p className="text-lg mb-4">{project.challenges}</p>
              </>
            )}
          </div>
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
      </div>
      {/* right column  */}
      <div>
        {project.images && project.images.gallery && (
          <div className="mt-8">
            <h1 className="text-2xl mb-4">Gallery</h1>
            <div className="grid grid-cols-1 gap-4">
              {project.images.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video bg-tertiary rounded overflow-hidden drop-shadow-sm cursor-pointer transition-transform hover:scale-[1.02]"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image} // Vite will handle this
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.isOpen && project.images?.gallery && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-xl hover:text-primary z-[110]"
            onClick={closeLightbox}
          >
            ✕
          </button>

          {/* Navigation arrows */}
          <button
            className="absolute left-4 text-white text-4xl hover:text-primary z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <button
            className="absolute right-4 text-white text-4xl hover:text-primary z-[110]"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>

          {/* Image container */}
          <div
            className="max-w-[90%] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.images.gallery[lightbox.currentImage]} // Vite will handle this
              alt={`${project.title} screenshot ${lightbox.currentImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />

            {/* Caption/counter */}
            <div className="text-center text-white mt-2">
              {lightbox.currentImage + 1} / {project.images.gallery.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkDetailCard;
