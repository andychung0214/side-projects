import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const html = fs.readFileSync(path.resolve("index.html"), "utf8");

test("Google Analytics 緊接在 head 後方", () => {
  assert.match(html, /<head>\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-SSL74LQSNB"><\/script>/);
  assert.match(html, /gtag\(\s*["']config["']\s*,\s*["']G-SSL74LQSNB["']\s*\)/);
});

test("首頁含三個分類與 18 個外部連結", () => {
  assert.match(html, /鍾狂｜Side Projects/);
  assert.match(html, /親子益智遊戲廳/);
  assert.match(html, /實用工具研究所/);
  assert.match(html, /作品集/);
  assert.match(html, /id="category-nav"/);
  assert.match(html, /id="project-directory"/);

  const projectCardLinks = html.match(/class="project-card" href="https:\/\/[^\"]+"/g) ?? [];
  assert.equal(projectCardLinks.length, 18);
  for (const url of [
    "https://shop.crownchung.tw/",
    "https://www.crownchung.tw/",
    "https://portfolio.crownchung.tw",
    "https://admin.crownchung.tw/#/auth/login",
    "https://album.crownchung.tw/",
    "https://subscriptions.crownchung.tw/",
  ]) {
    assert.match(html, new RegExp(`href="${url.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}"`));
  }
});

test("入口連結不另開分頁", () => {
  assert.doesNotMatch(html, /target\s*=\s*["']_blank["']/i);
});
