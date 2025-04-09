import NameCard from "../components/ui/NameCard.jsx";

function HomePage() {
  return (
    <>
      {/* Meta Tags */}
      <title>Leibrandt Austria | Front-End Developer Portfolio</title>
      <meta
        name="description"
        content="Designing unique user experiences through visual storytelling and web development"
      />
      <meta
        name="keywords"
        content="Leibrandt, Austria, front-end developer, web developer, portfolio, creative coding, UI developer, UI/UX, UX Developer, React.js, personal site, developer portfolio, design-focused dev"
      />
      <div>
        <NameCard />
      </div>
    </>
  );
}

export default HomePage;
