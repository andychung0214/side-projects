import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const html = fs.readFileSync(path.resolve("index.html"), "utf8");

test("Google Analytics 緊接在 head 後方", () => {
  assert.match(html, /<head>\s*<!-- Google tag \(gtag\.js\) -->\s*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-SSL74LQSNB"><\/script>/);
  assert.match(html, /gtag\(\s*["']config["']\s*,\s*["']G-SSL74LQSNB["']\s*\)/);
});

test("首頁含四個分類與 31 個外部連結", () => {
  assert.match(html, /鍾狂｜Side Projects/);
  assert.match(html, /親子益智遊戲廳/);
  assert.match(html, /實用工具研究所/);
  assert.match(html, /作品集/);
  assert.match(html, /數據報表分類/);
  assert.match(html, /id="category-nav"/);
  assert.match(html, /id="project-directory"/);
  assert.match(html, /href="#category-reports"/);
  assert.match(html, /id="category-reports"/);

  const projectCardLinks = html.match(/class="project-card" href="https:\/\/[^\"]+"/g) ?? [];
  assert.equal(projectCardLinks.length, 31);
  assert.match(html, /稜光數據工房/);
  assert.match(html, /href="https:\/\/tool\.crownchung\.tw\/prism-foundry"/);
  assert.match(html, /月影九宮/);
  assert.match(html, /href="https:\/\/game\.crownchung\.tw\/tsukikage-sudoku\/"/);
  assert.match(html, /href="https:\/\/game\.crownchung\.tw\/woodland-rummikub\/"/);
  for (const url of [
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
  ]) {
    assert.match(html, new RegExp(`href="${url.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}"`));
  }
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
