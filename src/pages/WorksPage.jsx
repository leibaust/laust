import WorkCard from "../components/ui/workCard.jsx";

function WorksPage() {
  return (
    <>
      {/* Meta Tags */}
      <title>Works | Leibrandt Austria</title>
      <meta name="description" content="My best works, all in one place" />
      <meta name="keywords" content="Leibrandt, Austria, front-end developer, web developer, portfolio, creative coding, UI developer, UI/UX, UX Developer, React.js, personal site, developer portfolio, design-focused dev" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.laust.ca/works" />
      <meta property="og:title" content="Works | Leibrandt Austria" />
      <meta property="og:description" content="My best works, all in one place" />
      <meta property="og:image" content="https://www.laust.ca/work/port1.png" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Works | Leibrandt Austria" />
      <meta name="twitter:description" content="My best works, all in one place" />
      <meta name="twitter:image" content="https://www.laust.ca/work/port1.png" />
      <section className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]">
        <div className="w-full sm:max-w-1/3 max-w-3xl mix-blend-difference flex justify-center py-4">
          <WorkCard />
        </div>
      </section>
    </>
  );
}

export default WorksPage;
