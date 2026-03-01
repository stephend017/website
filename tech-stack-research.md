# Personal Website Technology Research

## Project goals (assumed)
For a personal website in this repo, the likely goals are:
- Fast load times and strong SEO.
- Easy writing workflow for pages/posts.
- Low maintenance and low hosting cost.
- Room to grow (portfolio, blog, contact, projects).

## Strong candidates

### 1) Next.js (App Router) + TypeScript + Tailwind + MDX
**Best when:** You want maximum flexibility, excellent ecosystem support, and future growth.

**Pros**
- Great SEO, routing, image optimization, and metadata tooling.
- Can be fully static or mixed with server rendering.
- Easy to add features later (blog, RSS, analytics, forms, CMS).
- Large community and long-term maintainability.

**Cons**
- Slightly more complexity than static-only generators.
- More decisions to make early.

**Hosting fit**
- Vercel (best DX), Netlify, or static export where appropriate.

---

### 2) Astro + TypeScript + Tailwind + MD/MDX
**Best when:** You want top performance and mostly content-driven pages.

**Pros**
- Excellent performance by default (ships minimal JS).
- Great for blogs, portfolios, docs-style content.
- Can still use React/Vue/Svelte components when needed.

**Cons**
- Smaller ecosystem than Next.js (still healthy).
- Some advanced app-like patterns may be less straightforward.

**Hosting fit**
- Netlify, Vercel, Cloudflare Pages, GitHub Pages (static).

---

### 3) Hugo (Go-based static site generator)
**Best when:** You want the simplest, fastest static workflow and very low complexity.

**Pros**
- Very fast builds, low maintenance.
- Great markdown/content model.
- Easy static hosting anywhere.

**Cons**
- Less component-driven UI flexibility than React-based stacks.
- Custom interactive features require more manual integration.

**Hosting fit**
- GitHub Pages, Netlify, Cloudflare Pages, S3/CloudFront.

## Recommended default for this repo
If we want a modern, maintainable personal site that can evolve, start with:

**Next.js + TypeScript + Tailwind + MDX**, deployed on **Vercel**.

This gives the best balance of:
- Developer productivity.
- SEO and performance.
- Flexibility for future features.

## Suggested initial feature scope (MVP)
1. Home page (intro + CTA).
2. About page.
3. Projects page (data-driven from a JSON/TS file).
4. Blog scaffolding with MDX (optional in phase 1).
5. Contact links (email, GitHub, LinkedIn).
6. Basic SEO (title template, Open Graph, sitemap).
7. Analytics (Plausible or Vercel Analytics).

## Practical add-ons
- **Content editing**: keep content in Git-managed MDX initially.
- **Styling/UI**: Tailwind + a small component set.
- **Forms**: Formspree, Basin, or serverless endpoint.
- **Image handling**: Next/Image with optimized assets.
- **CI**: GitHub Actions for lint/test/build checks.

## Decision rubric
Choose the stack based on priority:
- **Maximum flexibility & ecosystem** → Next.js.
- **Best static performance with simpler mental model** → Astro.
- **Minimal complexity and very fast builds** → Hugo.

## Proposed next step
If you agree, I can scaffold a **Next.js + TypeScript + Tailwind** starter in this repo with a clean folder structure and starter pages.
