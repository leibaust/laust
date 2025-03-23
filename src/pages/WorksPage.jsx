import WorkCard from "../components/ui/WorkCard";

function WorksPage() {
  return (
    <section className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]">
      <div className="w-full sm:max-w-1/3 max-w-3xl bg-secondary flex justify-center py-4">
        <WorkCard />
      </div>
    </section>
  );
}

export default WorksPage;
