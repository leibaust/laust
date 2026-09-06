import { useParams } from "react-router-dom";
import WorkDetailCard from "../components/ui/WorkDetailCard";
import { projects } from "../data/projects";
import useSeo from "../hooks/useSeo.js";

function WorkDetailPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  useSeo({
    title: project
      ? `${project.title} | Leibrandt Austria`
      : "Work Not Found | Leibrandt Austria",
    description: project
      ? `${project.shortDescription} — a project by Leibrandt Austria, built with ${project.technologies
          .slice(0, 4)
          .join(", ")}.`
      : "This project could not be found. Browse the full portfolio of Leibrandt Austria.",
    path: project ? `/works/${project.id}` : "/works",
    image: project?.images?.thumbnail
      ? `https://laust.ca${project.images.thumbnail}`
      : undefined,
  });

  return (
    <section className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]">
      <div className="w-full max-w-5xl mx-auto bg-secondary p-4">
        <WorkDetailCard />
      </div>
    </section>
  );
}

export default WorkDetailPage;
