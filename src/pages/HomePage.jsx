import NameCard from "../components/ui/NameCard.jsx";

function HomePage() {
  return (
    <>
      {/* Meta Tags */}
      <title>Leibrandt Austria | Front-End Developer Portfolio</title>
      <meta name="description" content="Designing unique user experiences through visual storytelling and web development" />
      <meta name="keywords" content="Leibrandt, Austria, front-end developer, web developer, portfolio, creative coding, UI developer, UI/UX, UX Developer, React.js, personal site, developer portfolio, design-focused dev" />
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.laust.ca" />
      <meta property="og:title" content="Leibrandt Austria | Front-End Developer Portfolio" />
      <meta property="og:description" content="Designing unique user experiences through visual storytelling and web development" />
      <meta property="og:image" content="https://www.laust.ca/work/port1.png" />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Leibrandt Austria | Front-End Developer Portfolio" />
      <meta name="twitter:description" content="Designing unique user experiences through visual storytelling and web development" />
      <meta name="twitter:image" content="https://www.laust.ca/work/port1.png" />
      <div>
        <NameCard />
      </div>
    </>
  );
}

export default HomePage;
