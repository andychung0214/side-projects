# 鍾狂｜Side Projects

「鍾狂｜Side Projects」是鍾狂（crown）的個人 side project 入口頁，集中放置遊戲與網頁工具連結。這個網站本身不執行遊戲或工具，只負責讓訪客清楚找到作品並前往使用。

## 專案介紹

首頁目前分成兩類：

- **GAME**：祭典賓果、墨金字句、櫻花算術社、形算小工房、數字偵探社、字字成章。
- **TOOL**：狂輪誌、紙翼圖鑑、去背、台前桌球研習所、曆見顧問案卷、月下冷梗旅店。

## 特色

- 單一入口頁，沒有多餘的工具互動、教學頁或帳號流程。
- 連結預設使用目前分頁開啟，不設定 `target="_blank"`。
- 專案名稱、分類與網址集中於 [src/data/projects.js](src/data/projects.js)，方便未來維護。
- 套用「日式編輯部 × 和紙書籤」視覺，桌機、平板與手機皆可使用。
- JavaScript 停用時，首頁仍保留原生 HTML 連結。
- 使用語意化 HTML、鍵盤焦點、跳過連結與 `prefers-reduced-motion`。
- 已加入使用者提供的 Google Analytics `G-SSL74LQSNB`。

## 操作方式

1. 開啟首頁。
2. 從 `GAME` 或 `TOOL` 分類快速跳轉。
3. 點擊作品卡片，即可在目前分頁前往對應 side project。
4. 使用鍵盤時，以 `Tab` 移動焦點、`Enter` 開啟連結。

## 安裝與執行

不需要安裝前端套件。Node.js 18 以上版本只用於測試。

在專案根目錄執行任一種靜態伺服器：

```powershell
python -m http.server 4321
```

再開啟 <http://127.0.0.1:4321/>。

## 新增分類或連結

只要修改 [src/data/projects.js](src/data/projects.js)：

```js
export const PROJECT_CATEGORIES = Object.freeze([
  { id: "game", label: "GAME", title: "遊戲作品" },
  { id: "tool", label: "TOOL", title: "網頁工具" },
  { id: "note", label: "NOTE", title: "筆記作品" },
]);

export const PROJECTS = Object.freeze([
  {
    id: "new-project",
    category: "note",
    name: "新作品名稱",
    url: "https://example.com/new-project/",
  },
]);
```

`id` 必須唯一，`category` 必須對應分類 ID，網址必須使用 `https://`。版面會自動產生分類區塊與卡片，不需要修改 `index.html` 或 `src/app.js`。

## 專案結構

```text
side-projects/
├── index.html                         # 單頁入口、SEO、GA 與靜態 fallback 連結
├── styles.css                         # 日式視覺、RWD、焦點與動效規則
├── src/
│   ├── app.js                          # 分類與連結渲染
│   └── data/projects.js                # 唯一的分類與專案資料來源
├── tests/
│   ├── projects.test.js                # 分類、名稱、網址與資料驗證
│   ├── html-contract.test.js           # HTML、GA、12 個連結與同分頁契約
│   ├── style-contract.test.js          # 色票、RWD、焦點與動效契約
│   └── static-check.js                 # 靜態檔案與 HTTP 路徑檢查
├── docs/
│   ├── PLAN.md                         # 需求、範圍、里程碑、風險與驗收
│   ├── ART-DIRECTION.md                # 可選視覺風格與採用規格
│   ├── TEST-PLAN.md                    # 功能、RWD、無障礙與部署測試
│   └── superpowers/                    # 設計補充與實作計畫
├── robots.txt
├── sitemap.xml
├── CONTRIBUTING.md
├── LICENSE
└── package.json
```

## 測試方式

```powershell
npm test
npm run check
```

測試涵蓋：

- 兩個分類與 12 個指定連結的完整性。
- Google Analytics 是否緊接在 `<head>` 後方。
- 首頁是否含「鍾狂｜Side Projects」、12 個網址與無 `_blank`。
- 日式色票、三段 RWD、鍵盤焦點與降低動態效果。
- 靜態文件與 HTTP 路徑是否可以讀取。

瀏覽器手動檢查請依 [docs/TEST-PLAN.md](docs/TEST-PLAN.md) 執行。

## 靜態網站部署

本專案沒有建構步驟，可直接把 `side-projects` 資料夾部署到 GitHub Pages、Synology Web Station、Cloudflare Pages 或其他靜態網站託管服務。

正式部署前請更新：

- `index.html` 的 canonical、Open Graph 與 JSON-LD 網址。
- `robots.txt` 的 Sitemap 網址。
- `sitemap.xml` 的網站基準網址。
- 若新增其他 HTML 頁面，必須將 Google Analytics 程式碼緊接放在該頁 `<head>` 後方。

## 已知限制

- 作品本身的可用性、內容與錯誤處理由各自的外部網站負責。
- 入口頁不追蹤點擊事件，只載入 Google Analytics 基本頁面瀏覽設定。
- 專案資料是靜態檔案，沒有後台編輯介面。
- 使用者若停用 JavaScript，仍可使用靜態連結，但分類導覽不會從資料檔重新產生。
- GitHub Pages 基準網址是範例，正式網址需依實際託管設定調整。

## 授權說明

本入口頁的程式碼與文件採用 [MIT License](LICENSE)。各 side project 的內容、名稱與商標權利仍歸其原作者或擁有者所有。
