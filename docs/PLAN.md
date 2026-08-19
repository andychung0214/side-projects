# 鍾狂｜Side Projects 專案計畫

## 需求

- 在 `side-projects` 資料夾建立單一 side project 入口頁。
- 網站名稱為「鍾狂｜Side Projects」。
- 首版分成「親子益智遊戲廳」、「實用工具研究所」與「作品集」。
- 顯示使用者提供的 18 個外部連結。
- 連結預設使用目前分頁開啟。
- 使用資料檔集中管理分類、名稱與網址，方便未來新增。
- 套用降低 AI 感的日式入口網站視覺。
- 每個 HTML 頁面的 `<head>` 後方緊接放置 Google Analytics；首版只有 `index.html`。

## 範圍

### 包含

- 語意化單頁 HTML 入口。
- `src/data/projects.js` 連結資料來源與資料驗證。
- Vanilla JavaScript 分類與卡片渲染。
- 日式編輯部 × 和紙書籤視覺、RWD、鍵盤焦點與降低動態效果。
- Google Analytics、SEO、Open Graph、JSON-LD、robots 與 sitemap。
- Node.js 內建測試與 HTTP 靜態檔案檢查。

### 不包含

- 遊戲或工具本體的重建與修改。
- 搜尋、收藏、登入、資料庫、後端 API、付款、表單與後台。
- `target="_blank"` 新分頁行為。
- 外部字型、前端框架、大型函式庫與圖片 CDN。

## 里程碑

| 里程碑 | 內容 | 驗證證據 |
|---|---|---|
| M1 | 新專案 Git、資料來源與資料驗證 | `projects.test.js` 通過 |
| M2 | 單頁首頁、原生 fallback 與 GA | `html-contract.test.js` 通過 |
| M3 | 日式視覺與 RWD | `style-contract.test.js` 與瀏覽器畫面檢查通過 |
| M4 | 文件、robots、sitemap 與 HTTP 檢查 | `static-check.js` 通過 |
| M5 | 完整驗證與推送 | `npm run check`、遠端 commit 對照通過 |

## 工作分解

1. 建立新的 `side-projects` Git 專案與 `feature/side-projects` 分支。
2. 在資料檔登錄 3 個分類、18 個專案名稱與網址。
3. 以測試確認資料 ID、分類、名稱與 HTTPS 網址。
4. 建立含 Google Analytics 的單頁 HTML 與靜態 fallback 連結。
5. 建立資料驅動的 Vanilla JavaScript 渲染程式。
6. 套用米白、墨黑、森林綠與苔綠的日式編輯部視覺。
7. 補齊 RWD、焦點、跳過連結與降低動態效果。
8. 撰寫 README、視覺規範、測試計畫、貢獻規範與授權。
9. 啟動靜態伺服器，以桌機與 390px 寬度檢查畫面與溢出。
10. 在推送前顯示 remote、branch、commit，再推送至 `side-projects` GitHub 儲存庫。

## 風險與緩解

| 風險 | 影響 | 緩解方式 |
|---|---|---|
| 連結名稱或網址輸入錯誤 | 訪客進入錯誤作品 | 資料測試固定比對 18 個指定網址 |
| 未來新增分類忘記改版面 | 新分類不顯示 | 版面由 `PROJECT_CATEGORIES` 與 `PROJECTS` 自動產生 |
| JavaScript 載入失敗 | 動態內容不顯示 | HTML 先提供 18 個原生 fallback 連結 |
| 手機中文字超出卡片 | 版面水平溢出 | `min-width: 0`、`overflow-wrap`、390px 實機寬度檢查 |
| GA 放置位置錯誤 | 追蹤設定不符合要求 | HTML 契約測試檢查 `<head>` 後第一段內容 |
| 靜態託管子路徑不同 | SEO URL 不準確 | README 明確列出正式部署前要替換的網址 |

## 驗收條件

- [x] 新專案根目錄為 `F:\Codex\Projects\side-projects`。
- [x] Git remote 為 `https://github.com/andychung0214/side-projects.git`。
- [x] 首頁名稱為「鍾狂｜Side Projects」。
- [x] 「親子益智遊戲廳」、「實用工具研究所」與「作品集」各顯示 6 個指定連結。
- [x] 所有連結不含 `_blank`，預設目前分頁開啟。
- [x] 新增分類、名稱或網址只需修改 `src/data/projects.js`。
- [x] Google Analytics 程式碼緊接在 `<head>` 後方。
- [x] 桌機、平板與手機版可閱讀，沒有水平溢出。
- [x] 自動測試、語法檢查、HTTP 路徑檢查與瀏覽器畫面檢查完成。
