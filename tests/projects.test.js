import test from "node:test";
import assert from "node:assert/strict";
import {
  GAME_TABS,
  PROJECT_CATEGORIES,
  PROJECTS,
  validateProjectData,
} from "../src/data/projects.js";

test("遊戲頁籤順序固定", () => {
  assert.deepEqual(GAME_TABS.map((tab) => tab.id), ["puzzle", "math", "knowledge", "family", "board"]);
  assert.deepEqual(GAME_TABS.map((tab) => tab.label), ["益智挑戰", "數學遊戲", "知識挑戰", "家庭團康", "桌遊"]);
});

test("包含四個入口分類", () => {
  assert.deepEqual(PROJECT_CATEGORIES.map((category) => category.id), ["game", "tool", "portfolio", "reports"]);
  assert.deepEqual(PROJECT_CATEGORIES.map((category) => category.label), ["親子益智遊戲廳", "實用工具研究所", "作品集", "數據報表分類"]);
  assert.deepEqual(PROJECT_CATEGORIES.map((category) => category.title), ["親子益智遊戲廳", "實用工具研究所", "作品集", "數據報表分類"]);
});

test("包含 31 個指定專案與正確網址", () => {
  assert.equal(PROJECTS.length, 31);
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
    "月影九宮",
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
    "稜光數據工房",
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
    "https://game.crownchung.tw/tsukikage-sudoku/",
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
    "https://tool.crownchung.tw/prism-foundry",
  ]);
});

test("資料 ID、分類與網址格式有效", () => {
  assert.equal(validateProjectData(PROJECT_CATEGORIES, PROJECTS), true);
  assert.equal(new Set(PROJECTS.map((project) => project.id)).size, PROJECTS.length);
});

test("18 個遊戲連結分配至指定頁籤", () => {
  const gameTabByName = Object.fromEntries(
    PROJECTS
      .filter((project) => project.category === "game")
      .map((project) => [project.name, project.tab]),
  );

  assert.deepEqual(gameTabByName, {
    "祭典賓果": "family",
    "木間拉密": "board",
    "墨金字句": "knowledge",
    "櫻花算術社": "math",
    "形算小工房": "math",
    "數字偵探社": "puzzle",
    "字字成章": "knowledge",
    "圖形規律王": "puzzle",
    "色彩調律所": "puzzle",
    "旗語旅箋": "knowledge",
    "木漏日三子棋": "board",
    "紙翼巡遊": "family",
    "尋國誌": "knowledge",
    "平衡庭": "puzzle",
    "三目之間": "board",
    "記憶庭院": "puzzle",
    "小博士探險所": "knowledge",
    "月影九宮": "puzzle",
  });
});
