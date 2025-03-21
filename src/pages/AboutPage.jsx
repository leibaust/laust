import AboutInfo from "../components/ui/AboutInfo.jsx";
import Faq from "../components/ui/Faq.jsx";
import TechStack from "../components/ui/TechStack.jsx";
import profileImage from "../assets/img/profile2.png"; // Import the image

function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-0">
      <div className="w-full min-h-screen sm:max-w-3/5 max-w-3xl bg-secondary sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-4">
            <TechStack />
            <AboutInfo />
          </div>
          <div>
            <div
              className="w-full md:max-w-md mx-auto p-2 bg-primary shadow-xl mr-5 mb-4"
              style={{
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "300px", // Adjust height as needed
              }}
            >
              {/* Content inside the div, if any */}
            </div>
            <Faq />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
