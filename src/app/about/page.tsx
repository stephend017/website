const focusAreas = [
  {
    title: "Product-minded design",
    detail: "I turn broad ideas into clear interfaces with strong hierarchy and intent.",
    tone: "red"
  },
  {
    title: "Frontend execution",
    detail: "I build fast, accessible experiences in modern React and Next.js stacks.",
    tone: "gold"
  },
  {
    title: "Business outcomes",
    detail: "I prioritize work that improves clarity, conversion, and measurable impact.",
    tone: "mint"
  }
];

const toolset = [
  "Next.js + TypeScript",
  "React component systems",
  "Modern CSS and design tokens",
  "Content workflows with MDX",
  "Analytics-informed iteration"
];

export default function AboutPage() {
  return (
    <section className="section section--about">
      <p className="hero-eyebrow">ABOUT STEPHEN</p>
      <h2 className="about-title">Design-driven engineering with product focus.</h2>
      <p className="lead about-lead">
        I build digital experiences that balance visual clarity, performance, and business outcomes. My work combines
        interface design instincts with practical frontend execution from concept through launch.
      </p>

      <div className="block-grid about-focus-grid" aria-label="Core focus areas">
        {focusAreas.map((item) => (
          <article key={item.title} className={`color-block color-block--${item.tone}`}>
            <strong>{item.title}</strong>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>

      <ul className="list-reset about-details" aria-label="About details">
        <li className="project-item">
          <strong>Quick Snapshot</strong>
          <p>Based in modern web product work. Strong in visual hierarchy and UI systems. Comfortable from strategy to shipping.</p>
        </li>
        <li className="project-item">
          <strong>How I work</strong>
          <p>
            I typically partner early on framing and strategy, then move quickly into prototypes and production-ready
            implementation. I prefer short feedback loops and measurable iteration over long speculative cycles.
          </p>
        </li>
        <li className="project-item">
          <strong>Toolset</strong>
          <p>{toolset.join(" · ")}</p>
        </li>
        <li className="project-item">
          <strong>Now</strong>
          <p>
            I am currently expanding this site with project case studies, writing, and examples that show end-to-end
            product thinking in action.
          </p>
        </li>
      </ul>
    </section>
  );
}
