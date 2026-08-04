import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const publicHtml = new URL("../public/pokysql-academy.html", import.meta.url);
const sourceFragment = new URL(
  "../visualization/pokysql-academy.html",
  import.meta.url,
);

test("preserves the sandboxed visualization wrapper and CSP", async () => {
  const html = await readFile(publicHtml, "utf8");

  assert.match(html, /Content-Security-Policy/);
  assert.match(html, /script-src[^\"]*https:\/\/cdn\.jsdelivr\.net/);
  assert.match(html, /<iframe sandbox="allow-scripts"/);
  assert.doesNotMatch(html, /sandbox="[^"]*allow-same-origin/);
  assert.match(html, /referrerpolicy="no-referrer"/);
  assert.match(html, /PokéSQL Academy/);
  assert.match(html, /og-pokysql-academy\.png/);
});

test("ships the progressive course, live SQL engine, and final arena", async () => {
  const fragment = await readFile(sourceFragment, "utf8");

  assert.match(fragment, /const modules = \[/);
  assert.equal((fragment.match(/name: '/g) ?? []).length >= 12, true);
  assert.match(fragment, /alasql@4\.17\.3/);
  assert.match(fragment, /const labChallenges = \[/);
  assert.match(fragment, /queryIsReadOnly/);
  assert.match(fragment, /RunSQL AdTech Interview Arena/);
  assert.match(fragment, /Unlocks after 12 badges/);
  assert.match(fragment, /generation-i\/red-blue/);
  assert.match(fragment, /generation-ii\/crystal/);
  assert.match(fragment, /generation-iii\/emerald/);
});

test("includes the complete RunSQL capstone kit", async () => {
  const files = [
    "README.md",
    "ttd-adtech-schema.dbml",
    "advertisers.csv",
    "campaigns.csv",
    "campaign_status_history.csv",
    "ad_events_daily.csv",
    "offline_conversions.csv",
    "support_tickets.csv",
    "incidents.csv",
  ];

  await Promise.all(
    files.map((file) =>
      access(new URL(`../public/capstone/${file}`, import.meta.url)),
    ),
  );

  const schema = await readFile(
    new URL("../public/capstone/ttd-adtech-schema.dbml", import.meta.url),
    "utf8",
  );
  const exam = await readFile(
    new URL("../public/capstone/README.md", import.meta.url),
    "utf8",
  );

  assert.match(schema, /Table ad_events_daily/);
  assert.match(schema, /Table support_tickets/);
  assert.match(schema, /Ref: campaigns\.advertiser_id > advertisers\.advertiser_id/);
  assert.match(exam, /Final test: 100 points/);
  assert.match(exam, /Automatic fail conditions/);
});

test("copies every learner-facing asset into the production build", async () => {
  await Promise.all([
    access(new URL("../dist/client/pokysql-academy.html", import.meta.url)),
    access(new URL("../dist/client/og-pokysql-academy.png", import.meta.url)),
    access(
      new URL(
        "../dist/client/capstone/ttd-adtech-schema.dbml",
        import.meta.url,
      ),
    ),
  ]);

  const packageJson = await readFile(
    new URL("../package.json", import.meta.url),
    "utf8",
  );
  assert.match(packageJson, /"build":/);
  assert.equal(projectRoot.protocol, "file:");
});
