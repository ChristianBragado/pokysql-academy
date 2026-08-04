# PokéSQL Academy: RunSQL Final Arena

This is a fictional AdTech support database built to simulate the SQL and troubleshooting work described for The Trade Desk's Platform Support Analyst I role.

## Build the sandbox in RunSQL

1. Open `https://runsql.com/r` and create a PostgreSQL environment.
2. Paste `ttd-adtech-schema.dbml` into the database/schema side.
3. Create the schema, then import each CSV into the table with the matching filename.
4. Run a quick integrity check: every campaign's `advertiser_id` should exist in `advertisers`.
5. Keep your SQL and investigation notes. In an interview, explain your assumptions, grain, keys, NULL behavior, and validation checks aloud.

RunSQL's interface can change. If a button name differs, use its current schema/DBML and CSV import controls. The exercise is designed for PostgreSQL.

## Final test: 100 points

Do this without solution notes. Suggested time: 90 minutes.

### SQL practical — 50 points

1. Return every active campaign with advertiser name and daily budget. Sort highest budget first. (5)
2. Return every advertiser, including advertisers with zero unresolved tickets. Show `open_ticket_count`. (8)
3. For each campaign and event date, calculate impressions, clicks, CTR, conversions, spend, and budget utilization. Protect every ratio from divide-by-zero. (10)
4. Find campaign-days whose spend exceeded the campaign's daily budget. Explain why campaign 2006 appears more than once in the raw table but should appear once per day in your answer. (8)
5. Use a window function to return only the latest status row for every campaign. (8)
6. Find duplicate `order_id` values in `offline_conversions`, the number of rows per order, and the duplicated value. (6)
7. Return unresolved tickets ordered P1, P2, P3 and then oldest first without relying on alphabetical priority order. (5)

### Troubleshooting — 25 points

8. Ticket 5002 says dashboard totals are lower than the client report. Write your investigation plan: scope, SQL checks, likely causes, validation source, and client update. (10)
9. Ticket 5006 alleges overspend. Prove or disprove it at the correct grain. Distinguish platform spend, daily budget, timezone, and reporting freshness. (8)
10. Ticket 5008 concerns an HTML5 click-tag rejection. List the evidence you would gather before escalating and write a concise escalation note. (7)

### Operational judgment — 15 points

11. You are asked to execute a production stored procedure to reprocess campaign 2003. Write the safety checklist you would complete before and after execution. Do not invent or run a procedure. (8)
12. At 10:00 AM you own tickets 5002, 5003, 5006, and 5008. State your triage order and justify it using severity, customer impact, SLA, workaround, and incident correlation. (7)

### Behavioral communication — 10 points

13. Prepare two STAR stories: one about de-escalating a frustrated client and one about improving a support process or knowledge base. Each must include measurable impact and what you learned. (10)

## Readiness rubric

- 90–100: Interview-ready. Repeat under a 60-minute limit and narrate your reasoning.
- 80–89: Strong foundation. Repair every missed SQL concept and repeat the failed scenarios.
- 70–79: Developing. Revisit joins, grain, NULLs, aggregates, and validation before retesting.
- Below 70: Return to the progressive course. Do not memorize solutions; rebuild the mental model.

Automatic fail conditions for this role simulation: unsafe production action, no validation plan, incorrect join grain that inflates spend, `= NULL`, or treating a discrepancy as a defect before aligning definitions and time boundaries.
