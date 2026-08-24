import test from "node:test";
import assert from "node:assert/strict";
import {
  PROJECT_CATEGORIES,
  PROJECTS,
  validateProjectData,
} from "../src/data/projects.js";

test("包含三個入口分類", () => {
  assert.deepEqual(PROJECT_CATEGORIES.map((category) => category.id), ["game", "tool", "portfolio"]);
  assert.deepEqual(PROJECT_CATEGORIES.map((category) => category.label), ["親子益智遊戲廳", "實用工具研究所", "作品集"]);
  assert.deepEqual(PROJECT_CATEGORIES.map((category) => category.title), ["親子益智遊戲廳", "實用工具研究所", "作品集"]);
});

test("包含 29 個指定專案與正確網址", () => {
  assert.equal(PROJECTS.length, 29);
  assert.deepEqual(PROJECTS.map((project) => project.name), [
    "祭典賓果",
    "木間拉密",
    "墨金字句",
    "櫻花算術社",
    "形算小工房",
    "數字偵探社",
    "字字成章",
    "圖形規律王",
    "色彩調律所",
    "旗語旅箋",
    "木漏日三子棋",
    "紙翼巡遊",
    "尋國誌",
    "平衡庭",
    "三目之間",
    "記憶庭院",
    "小博士探險所",
    "狂輪誌",
    "紙翼圖鑑",
    "去背",
    "台前桌球研習所",
    "曆見顧問案卷",
    "月下冷梗旅店",
    "安暮恆生活",
    "A & M Blog",
    "個人履歷",
    "後台",
    "森影歲月",
    "訂閱",
  ]);
  assert.deepEqual(PROJECTS.map((project) => project.url), [
    "https://game.crownchung.tw/crown-bingo/",
    "https://game.crownchung.tw/woodland-rummikub/",
    "https://game.crownchung.tw/mojin-stage/",
    "https://game.crownchung.tw/sakura-math-club/",
    "https://game.crownchung.tw/shape-sum-atelier/",
    "https://game.crownchung.tw/case-four/",
    "https://game.crownchung.tw/idiom-loom/",
    "https://game.crownchung.tw/pattern-parade/",
    "https://game.crownchung.tw/color-mix-lab/",
    "https://game.crownchung.tw/flag-notes/",
    "https://game.crownchung.tw/komorebi-grid/",
    "https://game.crownchung.tw/paperwing-parade/",
    "https://game.crownchung.tw/landmark-atlas/",
    "https://game.crownchung.tw/balance-garden/",
    "https://game.crownchung.tw/sanmoku-no-ma/",
    "https://game.crownchung.tw/memory-garden/",
    "https://game.crownchung.tw/curiosity-atlas/",
    "https://tool.crownchung.tw/crown-ride-atlas/#/home",
    "https://tool.crownchung.tw/paper-flight-atlas/",
    "https://tool.crownchung.tw/perfect-cut/",
    "https://tool.crownchung.tw/tableside/",
    "https://tool.crownchung.tw/koyomi-consult/",
    "https://tool.crownchung.tw/moonlit-punchline/",
    "https://shop.crownchung.tw/",
    "https://www.crownchung.tw/",
    "https://portfolio.crownchung.tw",
    "https://admin.crownchung.tw/#/auth/login",
    "https://album.crownchung.tw/",
    "https://subscriptions.crownchung.tw/",
  ]);
});

test("資料 ID、分類與網址格式有效", () => {
  assert.equal(validateProjectData(PROJECT_CATEGORIES, PROJECTS), true);
  assert.equal(new Set(PROJECTS.map((project) => project.id)).size, PROJECTS.length);
});
