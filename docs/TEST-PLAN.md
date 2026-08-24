# 鍾狂｜Side Projects 測試計畫

## 自動測試

- `npm test`：執行所有 Node.js 內建測試。
- `node --check src/app.js`：檢查渲染程式語法。
- `node --check src/data/projects.js`：檢查資料檔語法。
- `node tests/static-check.js`：檢查必要檔案與 HTTP 回應。
- `npm run check`：執行上述完整檢查。

## 功能清單

- [ ] 首頁標題為「鍾狂｜Side Projects」。
- [ ] 「親子益智遊戲廳」顯示祭典賓果、木間拉密、墨金字句、櫻花算術社、形算小工房、數字偵探社、字字成章、圖形規律王、色彩調律所、旗語旅箋、木漏日三子棋、紙翼巡遊、尋國誌、平衡庭、三目之間、記憶庭院、小博士探險所。
- [ ] 「實用工具研究所」顯示狂輪誌、紙翼圖鑑、去背、台前桌球研習所、曆見顧問案卷、月下冷梗旅店。
- [ ] 「作品集」顯示安暮恆生活、A & M Blog、個人履歷、後台、森影歲月、訂閱。
- [ ] 每張卡片的 `href` 與 `src/data/projects.js` 完全相同。
- [ ] 點擊連結在目前分頁開啟，不建立新分頁。
- [ ] 三個中文分類導覽可以跳到對應區塊。
- [ ] JavaScript 停用時，29 個原生連結仍存在且可點擊。

## Google Analytics 與 SEO

- [ ] GA 程式碼位於 `index.html` 的 `<head>` 後方第一段內容。
- [ ] Measurement ID 為 `G-SSL74LQSNB`。
- [ ] `title`、description、canonical、Open Graph 與 CollectionPage JSON-LD 存在。
- [ ] `robots.txt` 與 `sitemap.xml` 可由靜態伺服器讀取。

## 手動瀏覽器測試

### 桌機

- [ ] 1440px 寬度下首頁有完整品牌、Hero、分類與卡片網格。
- [ ] 三個分類各自以三欄呈現。
- [ ] hover 卡片有輕微位移與陰影，沒有跳動或閃爍。
- [ ] Tab 移動時焦點 outline 清楚可見。

### 平板

- [ ] 768px 以上寬度下卡片以兩欄呈現。
- [ ] 標題、中文卡片名稱與箭頭不互相覆蓋。
- [ ] 分類導覽仍可點擊並正確捲動。

### 行動裝置

- [ ] 390px 寬度下頁面單欄排列。
- [ ] `scrollWidth` 不大於可視寬度，不出現水平捲軸。
- [ ] 「台前桌球研習所」與「曆見顧問案卷」可換行完整閱讀。
- [ ] 卡片點擊區域足夠，沒有只能點擊小箭頭的情況。

## 無障礙

- [ ] `html` 使用 `lang="zh-Hant"`。
- [ ] 頁面提供跳到作品連結的 skip link。
- [ ] 分類區塊使用 `section`、`h2` 與 `aria-labelledby`。
- [ ] 所有互動元素可用鍵盤操作。
- [ ] 焦點不只靠顏色，使用高對比 outline。
- [ ] `prefers-reduced-motion: reduce` 下不依賴動畫才能閱讀或操作。

## 靜態託管

- [ ] 以 `python -m http.server 4321` 開啟後，首頁回應 200。
- [ ] CSS、JavaScript、資料檔與文件回應 200。
- [ ] 子路徑部署時，所有本機資源仍使用相對路徑。
