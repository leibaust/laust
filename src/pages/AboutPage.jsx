import AboutInfo from "../components/ui/AboutInfo.jsx";
import Faq from "../components/ui/Faq.jsx";
import TechStack from "../components/ui/TechStack.jsx";
import profileImage from "../assets/img/profilewide.jpg";
// import { Helmet } from "react-helmet";

function AboutPage() {
  return (
    <>
      <section className="flex justify-center items-center py-6 sm:py-0 sm:min-h-[calc(100vh-128px)]">
        <div
          className="
          grid grid-cols-1 sm:grid-cols-2 gap-6 
          w-full sm:max-w-5xl
          bg-secondary 
          p-4 sm:p-8 
          my-4 sm:my-0
          relative
        "
        >
          {/* Left column */}
          <div className="space-y-6 z-10">
            <TechStack />
            <AboutInfo />
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Profile image */}
            <figure
              className="w-full md:max-w-md h-[300px] bg-primary shadow-xl relative"
              style={{
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-label="Profile picture"
            />

            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;
