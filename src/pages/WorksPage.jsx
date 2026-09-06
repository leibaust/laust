import WorkCard from "../components/ui/workCard.jsx";
import useSeo from "../hooks/useSeo.js";

function WorksPage() {
  useSeo({
    title: "Works | Leibrandt Austria",
    description:
      "Selected front-end and UX work by Leibrandt Austria — multi-tenant SaaS platforms, React web apps, and custom WordPress builds.",
    path: "/works",
  });

  return (
    <section className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]">
      <div className="w-full sm:max-w-1/3 max-w-3xl mix-blend-difference flex justify-center py-4">
        <WorkCard />
      </div>
    </section>
  );
}

export default WorksPage;
