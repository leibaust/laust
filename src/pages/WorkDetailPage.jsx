import WorkDetailCard from "../components/ui/WorkDetailCard";

function WorkDetailPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] overflow-auto">
      <div className="w-full sm:max-w-4/5 max-w-3xl mx-auto bg-secondary">
        <WorkDetailCard />
      </div>
    </div>
  );
}

export default WorkDetailPage;
