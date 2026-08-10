// Builds the single-file PokéSQL Academy app from src/ into public/pokysql-academy.html.
// Everything is inlined so the published page stays a portable single file.
import { readFile, writeFile } from "node:fs/promises";

const src = (path) => new URL(`../src/${path}`, import.meta.url);
const read = (path) => readFile(src(path), "utf8");

const shell = await read("shell.html");
const styles = await read("styles.css");

const scriptOrder = [
  "helpers.js",
  "data/sql-course.js",
  "data/adtech.js",
  "data/ops.js",
  "data/interview.js",
  "app.js",
];

const scripts = [];
for (const file of scriptOrder) {
  const body = await read(file);
  scripts.push(`/* ---- src/${file} ---- */\n${body}`);
}

const js = `(() => {\n'use strict';\n${scripts.join("\n\n")}\n})();`;

const out = shell
  .replace("/*__STYLES__*/", () => styles)
  .replace("/*__APP__*/", () => js);

const target = new URL("../public/pokysql-academy.html", import.meta.url);
await writeFile(target, out);
console.log(`built public/pokysql-academy.html (${(out.length / 1024).toFixed(1)} KB)`);
