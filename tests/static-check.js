import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import test from "node:test";

const root = path.resolve(".");
const requiredFiles = [
  "index.html",
  "styles.css",
  "src/app.js",
  "src/data/projects.js",
  "README.md",
  "docs/PLAN.md",
  "docs/ART-DIRECTION.md",
  "docs/TEST-PLAN.md",
  "robots.txt",
  "sitemap.xml",
];

test("必要靜態檔案存在", () => {
  for (const file of requiredFiles) {
    assert.equal(fs.existsSync(path.join(root, file)), true, file);
  }
});

test("入口頁靜態伺服器可回應", async () => {
  const server = http.createServer((request, response) => {
    const requestPath = new URL(request.url ?? "/", "http://127.0.0.1").pathname;
    const relativePath = requestPath === "/" ? "index.html" : requestPath.slice(1);
    const file = path.resolve(root, relativePath);
    if (!file.startsWith(root) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200).end(fs.readFileSync(file));
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try {
    for (const file of ["/", "/styles.css", "/src/app.js", "/src/data/projects.js", "/README.md", "/docs/PLAN.md", "/docs/ART-DIRECTION.md", "/docs/TEST-PLAN.md", "/robots.txt", "/sitemap.xml"]) {
      const response = await fetch(`http://127.0.0.1:${port}${file}`);
      assert.equal(response.status, 200, file);
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
