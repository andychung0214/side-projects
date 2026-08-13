export const PROJECT_CATEGORIES = Object.freeze([
  { id: "game", label: "GAME", title: "遊戲作品" },
  { id: "tool", label: "TOOL", title: "網頁工具" },
]);

export const PROJECTS = Object.freeze([
  {
    id: "crown-bingo",
    category: "game",
    name: "祭典賓果",
    url: "https://game.crownchung.tw/crown-bingo/",
  },
  {
    id: "mojin-stage",
    category: "game",
    name: "墨金字句",
    url: "https://game.crownchung.tw/mojin-stage/",
  },
  {
    id: "sakura-math-club",
    category: "game",
    name: "櫻花算術社",
    url: "https://game.crownchung.tw/sakura-math-club/",
  },
  {
    id: "shape-sum-atelier",
    category: "game",
    name: "形算小工房",
    url: "https://game.crownchung.tw/shape-sum-atelier/",
  },
  {
    id: "case-four",
    category: "game",
    name: "數字偵探社",
    url: "https://game.crownchung.tw/case-four/",
  },
  {
    id: "idiom-loom",
    category: "game",
    name: "字字成章",
    url: "https://game.crownchung.tw/idiom-loom/",
  },
  {
    id: "crown-ride-atlas",
    category: "tool",
    name: "狂輪誌",
    url: "https://tool.crownchung.tw/crown-ride-atlas/#/home",
  },
  {
    id: "paper-flight-atlas",
    category: "tool",
    name: "紙翼圖鑑",
    url: "https://tool.crownchung.tw/paper-flight-atlas/",
  },
  {
    id: "perfect-cut",
    category: "tool",
    name: "去背",
    url: "https://tool.crownchung.tw/perfect-cut/",
  },
  {
    id: "tableside",
    category: "tool",
    name: "台前桌球研習所",
    url: "https://tool.crownchung.tw/tableside/",
  },
  {
    id: "koyomi-consult",
    category: "tool",
    name: "曆見顧問案卷",
    url: "https://tool.crownchung.tw/koyomi-consult/",
  },
  {
    id: "moonlit-punchline",
    category: "tool",
    name: "月下冷梗旅店",
    url: "https://tool.crownchung.tw/moonlit-punchline/",
  },
]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateProjectData(categories, projects) {
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error("至少需要一個專案分類。");
  }

  const categoryIds = new Set();
  for (const category of categories) {
    if (!isNonEmptyString(category?.id) || !isNonEmptyString(category?.label) || !isNonEmptyString(category?.title)) {
      throw new Error("專案分類必須包含非空的 id、label 與 title。");
    }
    if (categoryIds.has(category.id)) {
      throw new Error(`專案分類 ID 重複：${category.id}`);
    }
    categoryIds.add(category.id);
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    throw new Error("至少需要一個 side project 連結。");
  }

  const projectIds = new Set();
  for (const project of projects) {
    if (!isNonEmptyString(project?.id) || !isNonEmptyString(project?.category) || !isNonEmptyString(project?.name) || !isNonEmptyString(project?.url)) {
      throw new Error("專案連結必須包含非空的 id、category、name 與 url。");
    }
    if (projectIds.has(project.id)) {
      throw new Error(`專案 ID 重複：${project.id}`);
    }
    if (!categoryIds.has(project.category)) {
      throw new Error(`專案使用不存在的分類：${project.category}`);
    }
    if (!project.url.startsWith("https://")) {
      throw new Error(`專案網址必須使用 HTTPS：${project.url}`);
    }
    projectIds.add(project.id);
  }

  return true;
}

validateProjectData(PROJECT_CATEGORIES, PROJECTS);
