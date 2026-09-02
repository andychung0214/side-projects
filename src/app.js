import { GAME_TABS, PROJECT_CATEGORIES, PROJECTS } from "./data/projects.js";

const HTML_ESCAPE_MAP = Object.freeze({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
});

const CATEGORY_EYEBROWS = Object.freeze({
  game: "PLAYABLE WORKS",
  tool: "USEFUL THINGS",
  portfolio: "SELECTED WORKS",
  reports: "DATA REPORTS",
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

function renderGameTabs() {
  return `
        <div class="game-tabs" data-game-tabs role="tablist" aria-label="親子益智遊戲廳遊戲頁籤">
          ${GAME_TABS.map((tab, index) => `
            <button class="game-tab" type="button" role="tab" id="game-tab-${escapeHtml(tab.id)}" data-game-tab="${escapeHtml(tab.id)}" aria-controls="game-panel-${escapeHtml(tab.id)}" aria-selected="${index === 0}" tabindex="${index === 0 ? "0" : "-1"}">${escapeHtml(tab.label)}</button>`).join("")}
        </div>`;
}

function renderGamePanels(categoryProjects) {
  const projectIndexById = new Map(categoryProjects.map((project, index) => [project.id, index]));

  return GAME_TABS.map((tab, index) => {
    const tabProjects = categoryProjects.filter((project) => project.tab === tab.id);
    const isActive = index === 0;
    return `
        <div class="game-tab-panel" data-game-panel="${escapeHtml(tab.id)}" id="game-panel-${escapeHtml(tab.id)}" role="tabpanel" aria-labelledby="game-tab-${escapeHtml(tab.id)}" tabindex="0"${isActive ? "" : " hidden"}>
          <div class="project-grid">
            ${tabProjects.map((project) => renderProjectCard(project, projectIndexById.get(project.id), { id: "game" })).join("")}
          </div>
        </div>`;
  }).join("");
}

export function renderProjectSections(categories, projects) {
  return categories.map((category, categoryIndex) => {
    const categoryProjects = projects.filter((project) => project.category === category.id);
    return `
      <section class="project-section" id="category-${escapeHtml(category.id)}" aria-labelledby="category-${escapeHtml(category.id)}-title">
        <div class="section-heading">
          <div>
            <p class="eyebrow">${String(categoryIndex + 1).padStart(2, "0")} / ${CATEGORY_EYEBROWS[category.id] ?? "SELECTED WORKS"}</p>
            <h2 id="category-${escapeHtml(category.id)}-title">${escapeHtml(category.label)}</h2>
          </div>
          <p class="section-caption">${escapeHtml(category.title)}<br>${String(categoryProjects.length).padStart(2, "0")} LINKS</p>
        </div>
        ${category.id === "game"
          ? `${renderGameTabs()}${renderGamePanels(categoryProjects)}`
          : `<div class="project-grid">
          ${categoryProjects.map((project, index) => renderProjectCard(project, index, category)).join("")}
        </div>`}
      </section>`;
  }).join("");
}

export function initGameTabs(rootRef = globalThis.document) {
  const tabList = rootRef?.querySelector?.("[data-game-tabs]");
  if (!tabList) return false;

  const tabs = [...tabList.querySelectorAll('[role="tab"]')];
  const panels = [...rootRef.querySelectorAll("[data-game-panel]")];
  const activateTab = (tabId, moveFocus = false) => {
    tabs.forEach((tab) => {
      const isActive = tab.getAttribute("data-game-tab") === tabId;
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });
    panels.forEach((panel) => {
      panel.hidden = panel.getAttribute("data-game-panel") !== tabId;
    });
    if (moveFocus) tabs.find((tab) => tab.getAttribute("data-game-tab") === tabId)?.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab.getAttribute("data-game-tab")));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex === index) return;
      event.preventDefault();
      activateTab(tabs[nextIndex].getAttribute("data-game-tab"), true);
    });
  });

  return true;
}

export function initProjectDirectory(documentRef = globalThis.document) {
  const categoryNav = documentRef?.getElementById("category-nav");
  const projectDirectory = documentRef?.getElementById("project-directory");
  if (!categoryNav || !projectDirectory) return false;

  categoryNav.innerHTML = renderCategoryNav(PROJECT_CATEGORIES);
  projectDirectory.innerHTML = renderProjectSections(PROJECT_CATEGORIES, PROJECTS);
  initGameTabs(projectDirectory);
  return true;
}

if (typeof document !== "undefined") {
  initProjectDirectory(document);
}
