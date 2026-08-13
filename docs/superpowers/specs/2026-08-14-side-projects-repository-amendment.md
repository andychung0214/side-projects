# 鍾狂｜Side Projects 專案位置與 Git 規格補充

## 專案位置

- 本次重做的實際工作目錄：`F:\Codex\Projects\side-projects`。
- 原 `F:\Codex\Projects\crown-arcade` 專案保留，不作為本次新入口網站的工作目錄。
- 新專案不引用原專案的舊頁面、舊資料檔、舊互動程式碼或舊測試。

## Git 遠端

- 遠端名稱：`origin`。
- 遠端網址：`https://github.com/andychung0214/side-projects.git`。
- 首版建立新的 Git 歷史，分支使用 `feature/side-projects`，完成驗證後推送至同名遠端分支。

## 其餘設計維持不變

- 網站名稱為「鍾狂｜Side Projects」。
- 首頁只提供 `GAME` 與 `TOOL` 兩個分類的 side project 外部連結。
- 連結預設使用目前分頁開啟。
- 連結資料集中在 `src/data/projects.js`，方便未來新增分類、名稱與網址。
- 採用「日式編輯部 × 和紙書籤」視覺。
- 使用 HTML、CSS、Vanilla JavaScript 與原生 ES Modules，不使用前端框架或後端服務。
