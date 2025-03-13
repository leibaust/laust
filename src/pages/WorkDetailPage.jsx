import WorkDetailCard from "../components/ui/WorkDetailCard";

function WorkDetailPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-0">
      <div className="w-full min-h-screen sm:max-w-4/5 max-w-3xl bg-secondary">
        <WorkDetailCard />
      </div>
    </div>
  );
}

export default WorkDetailPage;
