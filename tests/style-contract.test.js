import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const css = fs.readFileSync("styles.css", "utf8");

test("包含日式紙張視覺 token", () => {
  assert.match(css, /--paper:\s*#F3EFE6/i);
  assert.match(css, /--forest-green:\s*#3F6652/i);
  assert.match(css, /--forest-green-dark:\s*#2B4638/i);
  assert.match(css, /--ink:\s*#202A32/i);
  assert.doesNotMatch(css, /--cinnabar\b/i);
});

test("包含三個響應式區間與降低動態效果", () => {
  assert.ok((css.match(/@media/g) ?? []).length >= 3);
  assert.match(css, /prefers-reduced-motion\s*:\s*reduce/);
  assert.match(css, /:focus-visible/);
});
