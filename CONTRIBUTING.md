# 貢獻鍾狂｜Side Projects

感謝你想改善這個入口網站。它刻意保持簡單，請讓每項變更都維持單一入口、清楚分類與靜態託管相容性。

## 開發方式

1. 從 `feature/`、`fix/` 或 `chore/` 分支開始。
2. 新增或修改專案連結時，優先編輯 `src/data/projects.js`。
3. 不要在資料檔之外重複維護同一組網址；HTML fallback 若有變更，需同步更新契約測試。
4. 不要加入 `target="_blank"`、外部字型、前端框架或未經確認的追蹤程式碼。
5. 完成後執行 `npm run check`，並依 `docs/TEST-PLAN.md` 做瀏覽器檢查。

## Commit 格式

使用繁體中文 Conventional Commits：

```text
feat: 新增作品連結
fix: 修正手機版卡片溢出
docs: 更新入口部署說明
style: 調整日式入口色票
test: 補充連結契約測試
```

## Pull Request

- 說明變更的目的與影響檔案。
- 列出已執行的測試命令與結果。
- 若有新增外部連結，確認網址、名稱與分類都經過檢查。
- 不要提交 `.env`、token、憑證或私人金鑰。
