import { BrowserRouter, Routes, Route } from "react-router-dom";
import nav from "./components/layout/nav";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WorksPage from "./pages/WorksPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="works" element={<WorksPage />} />
            <Route path="works/:projectId" element={<ProjectDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
