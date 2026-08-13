import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

const css = fs.readFileSync("styles.css", "utf8");

test("包含日式紙張視覺 token", () => {
  assert.match(css, /--paper:\s*#F3EFE6/i);
  assert.match(css, /--cinnabar:\s*#C9563D/i);
  assert.match(css, /--ink:\s*#202A32/i);
});

test("包含三個響應式區間與降低動態效果", () => {
  assert.ok((css.match(/@media/g) ?? []).length >= 3);
  assert.match(css, /prefers-reduced-motion\s*:\s*reduce/);
  assert.match(css, /:focus-visible/);
});
