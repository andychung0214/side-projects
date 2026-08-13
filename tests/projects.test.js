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
  assert.deepEqual(PROJECTS.map((project) => project.name), [
    "祭典賓果",
    "墨金字句",
    "櫻花算術社",
    "形算小工房",
    "數字偵探社",
    "字字成章",
    "狂輪誌",
    "紙翼圖鑑",
    "去背",
    "台前桌球研習所",
    "曆見顧問案卷",
    "月下冷梗旅店",
  ]);
  assert.deepEqual(PROJECTS.map((project) => project.url), [
    "https://game.crownchung.tw/crown-bingo/",
    "https://game.crownchung.tw/mojin-stage/",
    "https://game.crownchung.tw/sakura-math-club/",
    "https://game.crownchung.tw/shape-sum-atelier/",
    "https://game.crownchung.tw/case-four/",
    "https://game.crownchung.tw/idiom-loom/",
    "https://tool.crownchung.tw/crown-ride-atlas/#/home",
    "https://tool.crownchung.tw/paper-flight-atlas/",
    "https://tool.crownchung.tw/perfect-cut/",
    "https://tool.crownchung.tw/tableside/",
    "https://tool.crownchung.tw/koyomi-consult/",
    "https://tool.crownchung.tw/moonlit-punchline/",
  ]);
});

test("資料 ID、分類與網址格式有效", () => {
  assert.equal(validateProjectData(PROJECT_CATEGORIES, PROJECTS), true);
  assert.equal(new Set(PROJECTS.map((project) => project.id)).size, PROJECTS.length);
});
