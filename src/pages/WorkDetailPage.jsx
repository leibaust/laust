import WorkDetailCard from "../components/ui/WorkDetailCard";

function WorkDetailPage() {
  return (
    <>
      {/* Meta Tags */}
      <title>Work | Front-End Developer Portfolio</title>
      <meta name="description" content="Explore my projects" />
      <meta
        name="keywords"
        content="Leibrandt, Austria, front-end developer, web developer, portfolio, creative coding, UI developer, UI/UX, UX Developer, React.js, personal site, developer portfolio, design-focused dev"
      />
      <section className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]">
        <div className="w-full max-w-5xl mx-auto bg-secondary p-4">
          <WorkDetailCard />
        </div>
      </section>
    </>
  );
}

export default WorkDetailPage;
