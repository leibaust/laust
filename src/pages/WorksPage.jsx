import WorkCard from "../components/ui/workCard";

function WorksPage() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-3/4 h-100 bg-secondary">
          <WorkCard />
        </div>
      </div>
    </div>
  );
}

export default WorksPage;
