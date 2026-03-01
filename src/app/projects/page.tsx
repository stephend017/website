const projects = [
  { name: "Project One", description: "Replace with a real project." },
  { name: "Project Two", description: "Show impact and technologies used." }
];

export default function ProjectsPage() {
  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.name} style={{ marginBottom: "1rem" }}>
            <strong>{project.name}</strong>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
