import NameCard from "../components/ui/NameCard.jsx";
import useSeo from "../hooks/useSeo.js";

function HomePage() {
  useSeo({
    title: "Leibrandt Austria | Front-End & UX Developer Portfolio",
    description:
      "Portfolio of Leibrandt Austria, a front-end and UX developer in Vancouver and Toronto, building fast, design-led web apps in React, Tailwind, and Supabase.",
    path: "/",
  });

  return (
    <div>
      <NameCard />
    </div>
  );
}

export default HomePage;
