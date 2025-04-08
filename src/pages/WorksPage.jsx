import WorkCard from "../components/ui/workCard.jsx";

function WorksPage() {
  return (
    <>
      {/* Meta Tags */}
      <title>Works | Front-End Developer Portfolio</title>
      <meta name="description" content="My best works, all in one place" />
      <meta
        name="keywords"
        content="Leibrandt, Austria, front-end developer, web developer, portfolio, creative coding, UI developer, UI/UX, UX Developer, React.js, personal site, developer portfolio, design-focused dev"
      />
      <section className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]">
        <div className="w-full sm:max-w-1/3 max-w-3xl mix-blend-difference flex justify-center py-4">
          <WorkCard />
        </div>
      </section>
    </>
  );
}

export default WorksPage;
