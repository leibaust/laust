import WorkDetailCard from "../components/ui/WorkDetailCard";

function WorkDetailPage() {
  return (
    <section className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]">
      <div className="w-full max-w-5xl mx-auto bg-secondary p-4">
        <WorkDetailCard />
      </div>
    </section>
  );
}

export default WorkDetailPage;
