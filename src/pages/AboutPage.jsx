import AboutInfo from "../components/ui/AboutInfo.jsx";
import Faq from "../components/ui/Faq.jsx";
import TechStack from "../components/ui/TechStack.jsx";

function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-0">
      <div className="w-full min-h-screen sm:max-w-4/5 max-w-3xl bg-secondary">
        <h1>About</h1>
        <TechStack />
        <AboutInfo />
        <Faq />
      </div>
    </div>
  );
}

export default AboutPage;
