import Faq from "../components/ui/Faq.jsx";

function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-3/4 h-200 bg-secondary min-w-300">
        <h1>About Section</h1>
        <Faq />
      </div>
    </div>
  );
}

export default AboutPage;
