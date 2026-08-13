# 鍾狂｜Side Projects Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `F:\Codex\Projects\side-projects` 建立一個只有 `GAME` 與 `TOOL` 分類的日式 side project 外部連結入口，並推送至 `https://github.com/andychung0214/side-projects.git`。

**Architecture:** 使用單一 `index.html` 作為無框架入口，`src/data/projects.js` 集中管理分類與連結，`src/app.js` 將資料渲染到語意化 HTML 容器。頁面同時提供靜態 fallback 連結，因此 JavaScript 停用時仍可瀏覽；所有外部連結不設定 `target`，沿用瀏覽器目前分頁開啟。

**Tech Stack:** HTML5、CSS3、Vanilla JavaScript、原生 ES Modules、Node.js 內建 `node:test`、Node.js `http` 靜態路徑檢查。

## Global Constraints

- 實作根目錄固定為 `F:\Codex\Projects\side-projects`。
- 網站名稱固定為「鍾狂｜Side Projects」。
- 首版只有 `GAME` 與 `TOOL` 兩個分類，以及 12 個既有外部網址。
- 連結不可設定 `target="_blank"`，預設使用目前分頁開啟。
- 未來新增分類、專案名稱與網址必須只需修改 `src/data/projects.js`。
- 使用者提供的 Google Analytics 程式碼必須緊接在每個 HTML 文件的 `<head>` 元素後方；首版只有 `index.html`。
- 不使用 React、Angular、Vue、TypeScript、後端服務、大型函式庫或外部字型。
- 支援手機、平板與桌機，保留鍵盤焦點與 `prefers-reduced-motion`。
- 不讀取、不輸出、不提交任何憑證、token、`.env` 或私人金鑰。
- Git commit 描述使用繁體中文 Conventional Commit 格式。

---

### Task 1: 建立專案骨架與資料驗證測試

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `src/data/projects.js`
- Create: `tests/projects.test.js`

**Interfaces:**
- Produces `PROJECT_CATEGORIES`, `PROJECTS`, `validateProjectData(categories, projects)`。
- `PROJECTS` 每筆物件提供 `id: string`、`category: string`、`name: string`、`url: string`。
- `validateProjectData` 回傳 `true` 或拋出帶有清楚錯誤訊息的 `Error`。

- [ ] **Step 1: Write the failing data tests**

```js
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
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`

Expected: FAIL because `package.json`、資料檔與匯出函式尚未建立。

- [ ] **Step 3: Implement the minimal project metadata and data source**

`src/data/projects.js` 必須包含以下所有名稱與網址：

```js
export const PROJECT_CATEGORIES = Object.freeze([
  { id: "game", label: "GAME", title: "遊戲作品" },
  { id: "tool", label: "TOOL", title: "網頁工具" },
]);

export const PROJECTS = Object.freeze([
  { id: "crown-bingo", category: "game", name: "祭典賓果", url: "https://game.crownchung.tw/crown-bingo/" },
  { id: "mojin-stage", category: "game", name: "墨金字句", url: "https://game.crownchung.tw/mojin-stage/" },
  { id: "sakura-math-club", category: "game", name: "櫻花算術社", url: "https://game.crownchung.tw/sakura-math-club/" },
  { id: "shape-sum-atelier", category: "game", name: "形算小工房", url: "https://game.crownchung.tw/shape-sum-atelier/" },
  { id: "case-four", category: "game", name: "數字偵探社", url: "https://game.crownchung.tw/case-four/" },
  { id: "idiom-loom", category: "game", name: "字字成章", url: "https://game.crownchung.tw/idiom-loom/" },
  { id: "crown-ride-atlas", category: "tool", name: "狂輪誌", url: "https://tool.crownchung.tw/crown-ride-atlas/#/home" },
  { id: "paper-flight-atlas", category: "tool", name: "紙翼圖鑑", url: "https://tool.crownchung.tw/paper-flight-atlas/" },
  { id: "perfect-cut", category: "tool", name: "去背", url: "https://tool.crownchung.tw/perfect-cut/" },
  { id: "tableside", category: "tool", name: "台前桌球研習所", url: "https://tool.crownchung.tw/tableside/" },
  { id: "koyomi-consult", category: "tool", name: "曆見顧問案卷", url: "https://tool.crownchung.tw/koyomi-consult/" },
  { id: "moonlit-punchline", category: "tool", name: "月下冷梗旅店", url: "https://tool.crownchung.tw/moonlit-punchline/" },
]);
```

`validateProjectData` 應檢查分類 ID 唯一、專案 ID 唯一、專案分類存在、名稱非空，以及所有網址符合 `https://`。

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`

Expected: 3 個資料測試通過。

- [ ] **Step 5: Commit the data foundation**

```powershell
git add package.json .gitignore src/data/projects.js tests/projects.test.js
git commit -m "feat: 建立 side projects 連結資料來源"
```

### Task 2: 建立單頁 HTML、Google Analytics 與 Vanilla 渲染

**Files:**
- Create: `index.html`
- Create: `src/app.js`
- Create: `tests/html-contract.test.js`

**Interfaces:**
- `renderCategoryNav(categories)` 回傳分類導覽 HTML 字串。
- `renderProjectSections(categories, projects)` 回傳所有分類區塊 HTML 字串。
- `initProjectDirectory(documentRef)` 將渲染結果放入 `#category-nav` 與 `#project-directory`。

- [ ] **Step 1: Write the failing HTML contract tests**

```js
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const html = fs.readFileSync(path.resolve("index.html"), "utf8");

test("Google Analytics 緊接在 head 後方", () => {
  assert.match(html, /<head>\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-SSL74LQSNB"><\/script>/);
  assert.match(html, /gtag\("config",\s*"G-SSL74LQSNB"\)/);
});

test("首頁含兩個分類與 12 個外部連結", () => {
  assert.match(html, /鍾狂｜Side Projects/);
  assert.match(html, /id="category-nav"/);
  assert.match(html, /id="project-directory"/);
  assert.equal((html.match(/https:\/\/(?:game|tool)\.crownchung\.tw\//g) ?? []).length, 12);
});

test("入口連結不另開分頁", () => {
  assert.doesNotMatch(html, /target\s*=\s*["']_blank["']/i);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/html-contract.test.js`

Expected: FAIL because `index.html` 尚未建立。

- [ ] **Step 3: Implement semantic HTML and module rendering**

`index.html` 必須包含：

- 使用者提供的 Google Analytics 程式碼，緊接在 `<head>` 後方。
- `lang="zh-Hant"`、viewport、description、canonical、Open Graph 與 `ItemList` JSON-LD。
- 首頁品牌文字「鍾狂｜Side Projects」。
- `#category-nav` 與 `#project-directory` 容器。
- 一組不依賴 JavaScript 的 12 個原生 `<a href="...">` fallback 連結。
- `<script type="module" src="src/app.js"></script>` 放在 body 結尾。

`src/app.js` 使用 `PROJECT_CATEGORIES` 與 `PROJECTS`，為每個分類建立帶有 `id="category-{id}"` 的 `<section>`，每個專案建立 `<a class="project-card" href="{url}">`。不加入 `target` 屬性，並透過 HTML escaping 防止資料檔文字破壞標記。

- [ ] **Step 4: Run the contract tests and syntax check**

Run: `node --test tests/html-contract.test.js; node --check src/app.js`

Expected: 3 個契約測試通過，語法檢查退出碼為 0。

- [ ] **Step 5: Commit the single-page entry**

```powershell
git add index.html src/app.js tests/html-contract.test.js
git commit -m "feat: 建立鍾狂 side projects 單頁入口"
```

### Task 3: 套用日式入口網站視覺與響應式版面

**Files:**
- Create: `styles.css`
- Create: `tests/style-contract.test.js`

**Interfaces:**
- CSS 以 `--paper`、`--ink`、`--cinnabar`、`--moss`、`--line` token 控制視覺。
- 首頁卡片在手機單欄、平板雙欄、桌機三欄排列。

- [ ] **Step 1: Write the failing style contract tests**

```js
import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const css = fs.readFileSync("styles.css", "utf8");

test("包含日式紙張視覺 token", () => {
  assert.match(css, /--paper:\s*#F3EFE6/i);
  assert.match(css, /--cinnabar:\s*#C9563D/i);
  assert.match(css, /--ink:\s*#202A32/i);
});

test("包含三個響應式區間與降低動態效果", () => {
  assert.ok((css.match(/@media/g) ?? []).length >= 3);
  assert.match(css, /prefers-reduced-motion\s*:\s*reduce/);
  assert.match(css, /:focus-visible/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/style-contract.test.js`

Expected: FAIL because `styles.css` 尚未建立。

- [ ] **Step 3: Implement the visual system**

使用 `#F3EFE6` 和紙米白、`#202A32` 墨黑藍、`#C9563D` 朱印紅、`#708176` 苔灰綠與 `#D7CEC0` 暖灰細線。頁面使用細框、紙張切角、索引標籤與低幅度陰影；不使用玻璃擬態、霓虹漸層、外部字型、圖片 CDN 或大量圓角。

建立手機預設單欄、`min-width: 48rem` 平板雙欄、`min-width: 75rem` 桌機三欄，並為所有互動元素提供清楚的 `:focus-visible` outline 與 `prefers-reduced-motion: reduce` 規則。

- [ ] **Step 4: Run style tests**

Run: `node --test tests/style-contract.test.js`

Expected: 2 個樣式契約測試通過。

- [ ] **Step 5: Commit the visual system**

```powershell
git add styles.css tests/style-contract.test.js
git commit -m "style: 套用日式 side projects 入口視覺"
```

### Task 4: 補齊專案文件、靜態檢查與部署檔案

**Files:**
- Create: `README.md`
- Create: `docs/PLAN.md`
- Create: `docs/ART-DIRECTION.md`
- Create: `docs/TEST-PLAN.md`
- Create: `CONTRIBUTING.md`
- Create: `LICENSE`
- Create: `robots.txt`
- Create: `sitemap.xml`
- Create: `tests/static-check.js`

**Interfaces:**
- 文件描述單頁入口、資料檔維護方式、Google Analytics 位置與 GitHub Pages／靜態託管方式。
- `tests/static-check.js` 啟動 Node `http` server，檢查首頁、CSS、JS、文件與部署檔案回應 200。

- [ ] **Step 1: Write the failing static route test**

```js
import assert from "node:assert/strict";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

test("必要靜態檔案存在", () => {
  for (const file of ["index.html", "styles.css", "src/app.js", "src/data/projects.js", "README.md", "docs/PLAN.md", "docs/ART-DIRECTION.md", "docs/TEST-PLAN.md", "robots.txt", "sitemap.xml"]) {
    assert.equal(fs.existsSync(path.resolve(file)), true, file);
  }
});

test("入口頁靜態伺服器可回應", async () => {
  const server = http.createServer((request, response) => {
    const requested = request.url === "/" ? "/index.html" : request.url;
    const file = path.resolve(`.${requested}`);
    if (!file.startsWith(path.resolve("."))) {
      response.writeHead(403).end();
      return;
    }
    if (!fs.existsSync(file)) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200).end(fs.readFileSync(file));
  });
  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();
  const result = await fetch(`http://127.0.0.1:${port}/`);
  assert.equal(result.status, 200);
  server.close();
});
```

- [ ] **Step 2: Run the static test to verify it fails**

Run: `node --test tests/static-check.js`

Expected: FAIL because the required documents and route test are not yet complete.

- [ ] **Step 3: Write the required documentation and static files**

`README.md` 必須包含專案介紹、兩個分類、資料檔新增方式、安裝與執行、測試方式、靜態網站部署、Google Analytics、已知限制與 MIT 授權說明。

`docs/ART-DIRECTION.md` 必須列出可選視覺風格與實際採用的日式編輯部 × 和紙書籤色票、字體、卡片、動效與禁止事項。

`docs/TEST-PLAN.md` 必須列出資料、連結、同分頁、Google Analytics、RWD、鍵盤與無障礙測試清單。

`robots.txt` 與 `sitemap.xml` 使用 `https://andychung0214.github.io/side-projects/` 作為靜態網站範例基準，並在 README 中提醒正式網址可替換。

- [ ] **Step 4: Run document and static checks**

Run: `node --test tests/static-check.js`

Expected: 2 個靜態檢查通過。

- [ ] **Step 5: Commit the delivery documents**

```powershell
git add README.md docs/PLAN.md docs/ART-DIRECTION.md docs/TEST-PLAN.md CONTRIBUTING.md LICENSE robots.txt sitemap.xml tests/static-check.js
git commit -m "docs: 補齊 side projects 入口交付文件"
```

### Task 5: 完整驗證、瀏覽器檢查與推送

**Files:**
- Modify: `package.json`
- Test: all files under `tests/`

**Interfaces:**
- `npm test` 執行所有 Node 內建測試。
- `npm run check` 執行測試、JavaScript 語法與靜態路徑檢查。

- [ ] **Step 1: Add final scripts**

`package.json` scripts 必須為：

```json
{
  "scripts": {
    "test": "node --test tests",
    "check": "npm test && node --check src/app.js && node --check src/data/projects.js && node tests/static-check.js"
  }
}
```

- [ ] **Step 2: Run the full verification suite**

Run: `npm run check; git diff --check; git status --short`

Expected: 所有測試通過、語法檢查退出碼為 0、diff 無空白錯誤、工作樹只包含預期變更。

- [ ] **Step 3: Perform browser verification**

啟動靜態伺服器後，以 Edge 或可用瀏覽器檢查桌機與 390px 寬度畫面：

1. 首頁標題為「鍾狂｜Side Projects」。
2. `GAME` 顯示 6 張卡片，`TOOL` 顯示 6 張卡片。
3. 每張卡片點擊後使用目前分頁前往指定網址。
4. 沒有水平捲軸或卡片文字溢出。
5. 使用 Tab 可看見焦點。

- [ ] **Step 4: Commit the verified release**

```powershell
git add package.json
git commit -m "chore: 完成 side projects 入口驗證設定"
```

- [ ] **Step 5: Display push target and push**

在推送前執行並顯示：

```powershell
git remote -v
git symbolic-ref --short HEAD
git log -1 --oneline
```

確認 remote 是 `https://github.com/andychung0214/side-projects.git`、branch 是 `feature/side-projects`，再執行：

```powershell
git remote add origin https://github.com/andychung0214/side-projects.git
git push -u origin feature/side-projects
```

若 `origin` 已存在，先用 `git remote set-url origin https://github.com/andychung0214/side-projects.git` 修正，不使用 force push。
