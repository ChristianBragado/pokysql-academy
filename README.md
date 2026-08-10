# PokéSQL Academy

An interactive, Pokémon-flavored training platform with one goal: **get hired as a
Platform Support Analyst I at The Trade Desk**.

**Live site:** https://christianbragado.github.io/pokysql-academy/

## The four tracks

| Track | Type | What it trains |
|---|---|---|
| **SQL Gym** | Water | 12 badge modules + 12 live SQL lab trials running on real SQLite (sql.js) in the browser — SELECT → JOINs → GROUP BY/HAVING → NULLIF ratios → CTEs → window functions → date/SLA math |
| **AdTech Academy** | Fire | The programmatic ecosystem, an interactive RTB auction simulator, CPM/CPC/CPA/CTR/ROAS drills, pixel/tag inspection, HTML5 creatives & clickTags, discrepancy investigation |
| **Ops Center** | Grass | Ticket triage simulator with SLA logic, escalation-note builder, an interactive Excel pivot-table builder, and flashcards for the full tool stack (Salesforce, Jira, Confluence, Postman, Vertica, SSMS, Tableau, AI tooling) |
| **Interview Arena** | Psychic | Company dossier (researched Aug 2026), spoken-answer question gauntlet, STAR story forge with markdown export, interview-day battle plan, and the 100-point RunSQL capstone |

Progress, XP, and badges persist in `localStorage`, sync into a shareable
`#progress=` link, and export/import as a JSON save file. Light/dark theme.
Older saves (v2/v3 of the original SQL-only course) migrate automatically.

## Job-prep documents

- [`docs/landing-the-job.md`](docs/landing-the-job.md) — the complete field guide: every listing requirement decoded, verified interview intel, company dossier, 8-week plan, application tactics
- [`docs/research/ttd-interview-research.md`](docs/research/ttd-interview-research.md) — the underlying research memo with per-claim verification flags
- [`public/capstone/README.md`](public/capstone/README.md) — the 100-point final test (PostgreSQL in RunSQL) with CSV data and DBML schema

## Development

The published app is a single self-contained HTML file built from `src/`:

```
src/
  shell.html        page skeleton (CSP, fonts, meta)
  styles.css        design system (League field-guide identity, both themes)
  helpers.js        shared utilities
  data/sql-course.js    SQL Gym modules + lab challenges (scaffold + solution)
  data/adtech.js        AdTech Academy modules + widget configs
  data/ops.js           Ops Center modules + widget configs
  data/interview.js     Interview Arena modules + decks + STAR prompts
  app.js            runtime: tracks, lessons, quizzes, sql.js lab, widgets, XP
```

```bash
npm run build:site   # build public/pokysql-academy.html from src/
python3 -m http.server 8899 -d public   # preview at localhost:8899/pokysql-academy.html
```

Deployment: the `gh-pages` branch mirrors `public/` and serves GitHub Pages.

## Credits

Pokémon facts and sprites come from [PokeAPI](https://pokeapi.co)'s open dataset
(sprites via jsDelivr). Pokémon names and imagery belong to their respective
rights holders; this is a personal educational project. All advertiser,
campaign, and ticket data is fictional. In-browser SQL by
[sql.js](https://sql.js.org) (SQLite compiled to WebAssembly).
