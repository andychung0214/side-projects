import test from "node:test";
import assert from "node:assert/strict";
import { initGameTabs, renderProjectSections } from "../src/app.js";
import { PROJECT_CATEGORIES, PROJECTS } from "../src/data/projects.js";

const rendered = renderProjectSections(PROJECT_CATEGORIES, PROJECTS);

test("親子益智遊戲廳產生五個可存取頁籤與面板", () => {
  assert.equal((rendered.match(/role="tab"/g) ?? []).length, 5);
  assert.equal((rendered.match(/role="tabpanel"/g) ?? []).length, 5);
  assert.match(rendered, /role="tablist" aria-label="親子益智遊戲廳遊戲頁籤"/);

  for (const tabId of ["puzzle", "math", "knowledge", "family", "board"]) {
    assert.match(rendered, new RegExp(`data-game-tab="${tabId}"`));
    assert.match(rendered, new RegExp(`id="game-panel-${tabId}"`));
    assert.match(rendered, new RegExp(`aria-controls="game-panel-${tabId}"`));
  }

  assert.match(rendered, /aria-selected="true"/);
  assert.match(rendered, /id="game-panel-puzzle"[^>]*>/);
});

test("遊戲頁籤面板只包含所屬遊戲連結", () => {
  const panelRanges = ["puzzle", "math", "knowledge", "family", "board"].map((tabId, index, tabIds) => {
    const start = rendered.indexOf(`id="game-panel-${tabId}"`);
    const nextStart = index < tabIds.length - 1
      ? rendered.indexOf(`id="game-panel-${tabIds[index + 1]}"`)
      : rendered.indexOf(`<section class="project-section" id="category-tool"`);
    return rendered.slice(start, nextStart);
  });

  assert.match(panelRanges[0], /數字偵探社|圖形規律王|色彩調律所|平衡庭|記憶庭院|月影九宮/);
  assert.doesNotMatch(panelRanges[0], /櫻花算術社|祭典賓果|木間拉密/);
  assert.match(panelRanges[1], /櫻花算術社|形算小工房/);
  assert.doesNotMatch(panelRanges[1], /數字偵探社|小博士探險所/);
  assert.match(panelRanges[2], /墨金字句|字字成章|旗語旅箋|尋國誌|小博士探險所/);
  assert.doesNotMatch(panelRanges[2], /祭典賓果|木間拉密|櫻花算術社/);
  assert.match(panelRanges[3], /祭典賓果|紙翼巡遊/);
  assert.doesNotMatch(panelRanges[3], /數字偵探社|木間拉密/);
  assert.match(panelRanges[4], /木間拉密|木漏日三子棋|三目之間/);
  assert.doesNotMatch(panelRanges[4], /祭典賓果|小博士探險所/);
});

class FakeTab {
  constructor(tabId) {
    this.attributes = new Map([
      ["data-game-tab", tabId],
      ["aria-selected", "false"],
      ["tabindex", "-1"],
    ]);
    this.listeners = new Map();
    this.focused = false;
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }

  setAttribute(name, value) {
    this.attributes.set(name, value);
  }

  addEventListener(name, listener) {
    this.listeners.set(name, listener);
  }

  focus() {
    this.focused = true;
  }

  dispatch(name, event = {}) {
    this.listeners.get(name)?.(event);
  }
}

class FakePanel {
  constructor(tabId) {
    this.attributes = new Map([["data-game-panel", tabId]]);
    this.hidden = true;
  }

  getAttribute(name) {
    return this.attributes.get(name) ?? null;
  }
}

test("遊戲頁籤支援點擊與鍵盤切換", () => {
  const tabs = ["puzzle", "math", "knowledge", "family", "board"].map((tabId) => new FakeTab(tabId));
  const panels = ["puzzle", "math", "knowledge", "family", "board"].map((tabId) => new FakePanel(tabId));
  const tabList = {
    querySelectorAll: () => tabs,
  };
  const root = {
    querySelector: () => tabList,
    querySelectorAll: () => panels,
  };

  tabs[0].setAttribute("aria-selected", "true");
  tabs[0].setAttribute("tabindex", "0");
  panels[0].hidden = false;

  assert.equal(initGameTabs(root), true);

  tabs[1].dispatch("click");
  assert.equal(tabs[1].getAttribute("aria-selected"), "true");
  assert.equal(tabs[0].getAttribute("aria-selected"), "false");
  assert.equal(panels[0].hidden, true);
  assert.equal(panels[1].hidden, false);

  const rightArrow = { key: "ArrowRight", preventDefaultCalled: false, preventDefault() { this.preventDefaultCalled = true; } };
  tabs[1].dispatch("keydown", rightArrow);
  assert.equal(rightArrow.preventDefaultCalled, true);
  assert.equal(tabs[2].getAttribute("aria-selected"), "true");
  assert.equal(tabs[2].focused, true);
  assert.equal(panels[2].hidden, false);

  tabs[2].dispatch("keydown", { key: "End", preventDefault() {} });
  assert.equal(tabs[4].getAttribute("aria-selected"), "true");
  tabs[4].dispatch("keydown", { key: "Home", preventDefault() {} });
  assert.equal(tabs[0].getAttribute("aria-selected"), "true");
  assert.equal(panels[0].hidden, false);
});
