import test from "node:test";
import assert from "node:assert/strict";
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  validateProjectData,
} from "../src/data/projects.js";

test("包含 GAME 與 TOOL 兩個分類", () => {
  assert.deepEqual(PROJECT_CATEGORIES.map((category) => category.id), ["game", "tool"]);
});

test("包含 12 個指定專案與正確網址", () => {
  assert.equal(PROJECTS.length, 12);
  assert.equal(PROJECTS.find((project) => project.name === "祭典賓果").url, "https://game.crownchung.tw/crown-bingo/");
  assert.equal(PROJECTS.find((project) => project.name === "狂輪誌").url, "https://tool.crownchung.tw/crown-ride-atlas/#/home");
  assert.equal(PROJECTS.find((project) => project.name === "月下冷梗旅店").url, "https://tool.crownchung.tw/moonlit-punchline/");
});

test("資料 ID、分類與網址格式有效", () => {
  assert.equal(validateProjectData(PROJECT_CATEGORIES, PROJECTS), true);
  assert.equal(new Set(PROJECTS.map((project) => project.id)).size, PROJECTS.length);
});
