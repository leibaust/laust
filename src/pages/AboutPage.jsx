import Faq from "../components/ui/Faq.jsx";

function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-0">
      <div className="w-full min-h-screen sm:max-w-4/5 max-w-3xl bg-secondary">
        <h1>About Section</h1>
        <Faq />
      </div>
    </div>
  );
}

export default AboutPage;
