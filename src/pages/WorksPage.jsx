// src/pages/WorksPage.jsx
import { useState } from "react";
import WorkCard from "../components/layout/workCard";
import { projects } from "../data/projects";

function WorksPage() {
  return (
    <div className="works-page overlay">
      <h2>WORKS</h2>
      <div className="works-grid">
        {projects.map((project) => (
          <WorkCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default WorksPage;
