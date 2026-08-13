import { PROJECT_CATEGORIES, PROJECTS } from "./data/projects.js";

const HTML_ESCAPE_MAP = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
});

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => HTML_ESCAPE_MAP[character]);
}

export function renderCategoryNav(categories) {
  return categories.map((category, index) => `
    <a href="#category-${escapeHtml(category.id)}">
      <span>${String(index + 1).padStart(2, "0")}</span>
      ${escapeHtml(category.label)}
    </a>`).join("");
}

function renderProjectCard(project, index, category) {
  return `
    <a class="project-card" href="${escapeHtml(project.url)}">
      <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="project-kind">${escapeHtml(category.id.toUpperCase())}</span>
      <strong>${escapeHtml(project.name)}</strong>
      <span class="project-arrow" aria-hidden="true">↗</span>
    </a>`;
}

export function renderProjectSections(categories, projects) {
  return categories.map((category, categoryIndex) => {
    const categoryProjects = projects.filter((project) => project.category === category.id);
    return `
      <section class="project-section" id="category-${escapeHtml(category.id)}" aria-labelledby="category-${escapeHtml(category.id)}-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">${String(categoryIndex + 1).padStart(2, "0")} / ${category.id === "game" ? "PLAYABLE WORKS" : "USEFUL THINGS"}</p>
            <h2 id="category-${escapeHtml(category.id)}-title">${escapeHtml(category.label)}</h2>
          </div>
          <p class="section-caption">${escapeHtml(category.title)}<br>${String(categoryProjects.length).padStart(2, "0")} LINKS</p>
        </div>
        <div class="project-grid">
          ${categoryProjects.map((project, index) => renderProjectCard(project, index, category)).join("")}
        </div>
      </section>`;
  }).join("");
}

export function initProjectDirectory(documentRef = globalThis.document) {
  const categoryNav = documentRef?.getElementById("category-nav");
  const projectDirectory = documentRef?.getElementById("project-directory");
  if (!categoryNav || !projectDirectory) return false;

  categoryNav.innerHTML = renderCategoryNav(PROJECT_CATEGORIES);
  projectDirectory.innerHTML = renderProjectSections(PROJECT_CATEGORIES, PROJECTS);
  return true;
}

if (typeof document !== "undefined") {
  initProjectDirectory(document);
}
