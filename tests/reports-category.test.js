import test from "node:test";
import assert from "node:assert/strict";
import { renderProjectSections } from "../src/app.js";
import { PROJECT_CATEGORIES, PROJECTS } from "../src/data/projects.js";

test("數據報表分類顯示稜光數據工房", () => {
  const rendered = renderProjectSections(PROJECT_CATEGORIES, PROJECTS);

  assert.match(rendered, /id="category-reports"/);
  assert.match(rendered, /<h2 id="category-reports-title">數據報表分類<\/h2>/);
  assert.match(rendered, /<p class="section-caption">數據報表分類<br>01 LINKS<\/p>/);
  assert.match(rendered, /href="https:\/\/tool\.crownchung\.tw\/prism-foundry"[\s\S]*稜光數據工房/);
});
