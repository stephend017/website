const projects = [
  { name: "Project One", description: "Replace with a real project." },
  { name: "Project Two", description: "Show impact and technologies used." }
];

export default function ProjectsPage() {
  return (
    <section className="section">
      <h2>Projects</h2>
      <ul className="list-reset">
        {projects.map((project) => (
          <li key={project.name} className="project-item">
            <strong>{project.name}</strong>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
