import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const html = fs.readFileSync(path.resolve("index.html"), "utf8");

test("Google Analytics 緊接在 head 後方", () => {
  assert.match(html, /<head>\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-SSL74LQSNB"><\/script>/);
  assert.match(html, /gtag\(\s*["']config["']\s*,\s*["']G-SSL74LQSNB["']\s*\)/);
});

test("首頁含兩個分類與 12 個外部連結", () => {
  assert.match(html, /鍾狂｜Side Projects/);
  assert.match(html, /親子益智遊戲廳/);
  assert.match(html, /實用工具研究所/);
  assert.match(html, /id="category-nav"/);
  assert.match(html, /id="project-directory"/);
  assert.equal((html.match(/https:\/\/(?:game|tool)\.crownchung\.tw\//g) ?? []).length, 12);
});

test("入口連結不另開分頁", () => {
  assert.doesNotMatch(html, /target\s*=\s*["']_blank["']/i);
});
