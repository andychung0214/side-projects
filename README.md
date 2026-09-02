# 鍾狂｜Side Projects

「鍾狂｜Side Projects」是鍾狂（crown）的個人 side project 入口頁，集中放置親子益智遊戲、實用工具與作品集連結。這個網站本身不執行遊戲或工具，只負責讓訪客清楚找到作品並前往使用。

## 專案介紹

首頁目前分成四類：

- **親子益智遊戲廳**：祭典賓果、木間拉密、墨金字句、櫻花算術社、形算小工房、數字偵探社、字字成章、圖形規律王、色彩調律所、旗語旅箋、木漏日三子棋、紙翼巡遊、尋國誌、平衡庭、三目之間、記憶庭院、小博士探險所。
- **實用工具研究所**：狂輪誌、紙翼圖鑑、去背、台前桌球研習所、曆見顧問案卷、月下冷梗旅店。
- **作品集**：安暮恆生活、A & M Blog、個人履歷、後台、森影歲月、訂閱。
- **數據報表分類**：稜光數據工房。

## 特色

- 單一入口頁，沒有多餘的工具互動、教學頁或帳號流程。
- 親子益智遊戲廳以「益智挑戰」、「數學遊戲」、「知識挑戰」、「家庭團康」、「桌遊」五個頁籤整理遊戲。
- 連結預設使用目前分頁開啟，不設定 `target="_blank"`。
- 專案名稱、分類、遊戲頁籤與網址集中於 [src/data/projects.js](src/data/projects.js)，方便未來維護。
- 套用「日式編輯部 × 和紙書籤」視覺，桌機、平板與手機皆可使用。
- JavaScript 停用時，首頁仍保留原生 HTML 連結。
- 使用語意化 HTML、鍵盤焦點、跳過連結與 `prefers-reduced-motion`。
- 已加入使用者提供的 Google Analytics `G-SSL74LQSNB`。

## 操作方式

1. 開啟首頁。
2. 從「親子益智遊戲廳」、「實用工具研究所」、「作品集」或「數據報表分類」快速跳轉。
3. 在親子益智遊戲廳選擇五個遊戲頁籤，查看該類別的作品卡片。
4. 點擊作品卡片，即可在目前分頁前往對應 side project。
5. 使用鍵盤時，以 `Tab` 移動焦點；在遊戲頁籤可用方向鍵、`Home`、`End` 切換，選好後再以 `Tab` 移至卡片並按 `Enter` 開啟連結。

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
  { id: "game", label: "親子益智遊戲廳", title: "親子益智遊戲廳" },
  { id: "tool", label: "實用工具研究所", title: "實用工具研究所" },
  { id: "portfolio", label: "作品集", title: "作品集" },
  { id: "reports", label: "數據報表分類", title: "數據報表分類" },
]);

export const PROJECTS = Object.freeze([
  {
    id: "new-game",
    category: "game",
    tab: "puzzle",
    name: "新作品名稱",
    url: "https://example.com/new-game/",
  },
]);
```

`id` 必須唯一，`category` 必須對應分類 ID；若分類是 `game`，還要填寫 `GAME_TABS` 中存在的 `tab`。網址必須使用 `https://`。版面會自動產生分類區塊、遊戲頁籤與卡片，不需要修改 `index.html` 或 `src/app.js`。

## 專案結構

```text
side-projects/
├── index.html                         # 單頁入口、SEO、GA 與靜態 fallback 連結
├── styles.css                         # 日式視覺、RWD、焦點與動效規則
├── src/
│   ├── app.js                          # 分類、遊戲頁籤與連結渲染
│   └── data/projects.js                # 唯一的分類與專案資料來源
├── tests/
│   ├── projects.test.js                # 分類、名稱、網址與資料驗證
│   ├── game-tabs.test.js               # 遊戲頁籤與分組面板契約
│   ├── html-contract.test.js           # HTML、GA、31 個連結與同分頁契約
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

- 四個分類、五個遊戲頁籤與 31 個指定連結的完整性。
- 18 個遊戲是否分配到正確頁籤，以及各頁籤面板是否只顯示所屬連結。
- Google Analytics 是否緊接在 `<head>` 後方。
- 首頁是否含「鍾狂｜Side Projects」、31 個網址與無 `_blank`。
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
- 使用者若停用 JavaScript，仍可使用靜態連結，但遊戲頁籤與分類導覽不會從資料檔重新產生。
- GitHub Pages 基準網址是範例，正式網址需依實際託管設定調整。

## 授權說明

本入口頁的程式碼與文件採用 [MIT License](LICENSE)。各 side project 的內容、名稱與商標權利仍歸其原作者或擁有者所有。
