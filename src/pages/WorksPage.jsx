import WorkCard from "../components/ui/WorkCard";

function WorksPage() {
  return (
    <div className="flex items-center justify-center p-0">
      <div className="w-full sm:max-w-1/3 max-w-3xl bg-secondary flex items-start justify-center py-4">
        <WorkCard />
      </div>
    </div>
  );
}

export default WorksPage;
