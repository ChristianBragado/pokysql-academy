# Landing the Job: Platform Support Analyst I at The Trade Desk

*A complete field guide for a candidate coming from IT with no advertising background.*
*Researched August 9, 2026 — re-verify the "current moment" facts before your interview.*

- **The listing:** [Platform Support Analyst I (REQ-9238, Los Angeles)](https://careers.thetradedesk.com/jobs/5167636007/platform-support-analyst-i)
- **Base salary band:** $48,200–$88,300 (LA band; a Ventura, CA posting of the same title showed $39,400–$72,300 — bands are geo-adjusted)
- **Your training platform:** [PokéSQL Academy](https://christianbragado.github.io/pokysql-academy/) — every requirement below maps to a track in the app

---

## 1. What this job actually is

Strip away the jargon and the job is this: **you are the technical problem-solver who sits between the people using The Trade Desk's ad-buying platform and the engineers who build it.**

Traders and account teams live inside the platform (called **Kokai**). When something breaks — a campaign stops delivering, a report shows wrong numbers, a tracking pixel dies, a data file fails to process — they file a ticket. You:

1. **Triage** it (how bad, how many affected, which SLA clock is running)
2. **Investigate** it (mostly with SQL against the platform's databases, plus the UI, logs, and tools like Postman)
3. **Fix** what you can (including running vetted stored procedures to reprocess data)
4. **Escalate** what you can't (with evidence engineering can act on)
5. **Communicate** throughout (plain-English updates that keep clients calm)
6. **Document** the fix (knowledge-base articles so the next analyst is faster)

This is the same *shape* as IT support work — queues, SLAs, troubleshooting, angry users — applied to a data-heavy advertising platform. That is your central pitch: **you are not changing careers, you are leveling up the same craft into a richer domain.**

One important nuance from the listing's phrasing: you primarily support TTD's internal **Business Teams** (traders, account managers, technical account managers) and their clients — you are the buffer that lets engineering focus on building.

## 2. Every requirement, decoded and mapped

| Requirement (their words) | What it really means | Where you train it |
|---|---|---|
| "Executing stored procedures and querying our database using SQL" / "Strong SQL" | Daily SELECT/JOIN/GROUP BY work against ticket, campaign, and event tables; running pre-built maintenance routines safely | **SQL Gym** (12 badges + 12 live lab trials), capstone |
| "2+ years AdTech experience (RTB, DSPs, ad exchanges, aggregators, ad servers)" | You must speak the language of programmatic advertising fluently. You can't buy years, but you CAN buy fluency | **AdTech Academy** (all 6 modules) + Edge Academy certs |
| "Strong HTML experience" | Reading ad tags, pixels, and HTML5 creatives — spotting the broken macro or missing clickTag. Not web development | **AdTech Academy** modules 4–5 |
| "Advanced MS Excel: pivot tables, formulas, insights from large datasets" | Pivot tables ARE the interview bar. XLOOKUP/SUMIFS/COUNTIFS/IFERROR cover the rest | **Ops Center · Excel Gym** (interactive pivot builder) |
| "Incidents addressed within established SLAs" | Queue triage judgment: severity × scope × clock × workaround | **Ops Center · Run the Queue** (triage simulator) |
| "Explain complex subjects to a non-technical audience" / "de-escalating" | The #1 differentiator in support interviews. Practiced, not innate | **Ops Center · Escalate Like a Pro** + STAR Forge |
| "Contribute to the Knowledge Base" | They want analysts who document. Have a story ready about docs you've written | STAR Forge story #5 |
| "Proficient in AI tools" (2026 addition) | Use AI daily with verification discipline; bring a concrete workload-reduction idea | **Ops Center · Toolbelt** (AI cards) |
| Bonus: Salesforce, Jira, Confluence, Postman, Vertica, SSMS, Tableau | Honest familiarity, not mastery: "X is the tool for Y, here's what I've used that's adjacent" | **Ops Center · Toolbelt** flashcards |
| Bonus: "offline attribution, tracking tags, pixels, html5 creatives, discrepancies" | The five classic AdTech ticket types | **AdTech Academy** 4–6 + capstone stations |
| "3+ years as technical support rep" | Your IT background covers this directly — frame every IT story in support-analyst vocabulary | STAR Forge |
| "Light on-call/after-hours support" | Real. Say yes with a boundary-aware answer ("I've carried a pager; rotation with handoff discipline works") | — |

**Your gap analysis as an IT person:** SQL (trainable, weeks), AdTech vocabulary (trainable, weeks), Excel pivots (trainable, days), communication craft (you likely have it — needs packaging), AdTech *years* (not trainable — offset with demonstrated fluency + Edge Academy certificates + the capstone project as proof-of-work).

## 3. The interview process (from verified candidate reports)

No public report exists for this exact title, so this is assembled from TTD's closest roles (Applications Support Analyst, Client Services Associate) and company-wide stats:

1. **Recruiter screen** (~30 min) — resume walk; verified real questions from TTD screens: *"How have you used data to back up a point?"* and *"Tell me about teaching yourself something you didn't understand."*
2. **Hiring manager screen** — role depth, troubleshooting scenarios, possibly verbal SQL ("how would you find campaigns that stopped spending yesterday?").
3. **Possible skills exercise** — ~11% of TTD loops include a skills test. Client-services loops use a **data presentation**: they hand you a dataset + prompt, you present findings and recommendations and defend them under questioning. Prepare for it; treat it as likely.
4. **Panel of ~3–4** (~2 hours, sequential) — peers and cross-functional partners. Multiple reports agree: **culture fit decides TTD hires.**

Process warnings from candidates: timelines can stretch (weeks between rounds), ghosting happens, annual reorgs sometimes pause hiring mid-loop. Don't read silence as rejection; keep other applications running in parallel.

**SQL screen expectation:** easy-to-intermediate — JOINs, GROUP BY/HAVING, date filtering, NULL handling, maybe one window-function stretch (ROW_NUMBER latest-row pattern). DataLemur's TTD practice set confirms this range for adjacent roles. The SQL Gym + capstone covers all of it with margin.

## 4. The company dossier (memorize the bones)

- **Elevator story:** largest independent DSP; buy-side only; open internet; founded 2009 by Jeff Green; ~4,000 employees; Green's metaphor — building the **"NYSE of advertising."**
- **Products:** Kokai (AI-era platform), Koa (AI bidding engine), UID2 (post-cookie identity from hashed emails), OpenPath → OpenAds (direct publisher supply + transparent Prebid-based auction, late 2025), Ventura (CTV operating system).
- **Values (verified set of six):** vision, grit, agility, generosity, openness, full-heartedness. Prepare one 30-second story per support-relevant value. *(Note: an "18 principles" framing floats around — it did not verify; don't cite it.)*
- **The moment (as of Aug 2026):** Q2 2026 revenue ~$715M, only +3% YoY (reported Aug 6, 2026); stock ~80% off highs; Amazon DSP is the named threat; new CFO/CMO/CCO; Netflix joined the inventory marketplace; **customer retention >95%**.
- **Your angle:** when growth slows, support quality becomes the moat. Platform Support defends the >95% retention number ticket by ticket. That sentence connects an entry-level role to the company's survival story — use it in "why TTD, why support."
- **Free signal:** complete TTD's own **Edge Academy** courses (Programmatic 101, Trading Essentials, Marketing Essentials cert) — free, and past candidates say naming them lands well.

## 5. The 8-week plan

Using the academy (~45–60 min/day):

- **Weeks 1–2 — SQL foundations.** SQL Gym badges 1–6 + labs. Goal: SELECT/WHERE/ORDER/JOIN fluency without notes.
- **Week 3 — SQL power tools.** Badges 7–9 + labs (GROUP BY/HAVING, NULLIF ratios, CTEs, ROW_NUMBER, date math). These are the interview differentiators.
- **Week 4 — AdTech immersion.** AdTech Academy modules 1–3 (ecosystem, auction, money math) + start Edge Academy Programmatic 101. Practice narrating the 250ms auction aloud.
- **Week 5 — The ticket types.** AdTech 4–6 (pixels, creatives, discrepancies) + SQL badges 10–12. This is the week you start sounding like an analyst.
- **Week 6 — Ops craft.** All four Ops Center modules. Do the pivot missions until they're boring. Draft all five STAR stories in the forge.
- **Week 7 — The capstone.** Build the schema in RunSQL, take the 100-point final untimed. Repair every miss. Finish Edge Academy cert.
- **Week 8 — Interview mode.** Question Gauntlet out loud daily; capstone again at 60 minutes narrating; company dossier fresh; mock the data presentation once with a friend; night-before checklist.

Then apply — and keep training between rounds.

## 6. Application tactics

- **Resume:** translate IT experience into their vocabulary — "triaged X tickets/week within SLA," "wrote knowledge-base articles that cut repeat tickets," "root-caused recurring outage via log analysis." Mirror the listing's own nouns (SLA, escalation, knowledge base, stored procedures if you've touched them).
- **Proof of work:** link the academy + capstone in your resume/LinkedIn. "Built and completed a full AdTech support-analyst training program including a live-SQL practice environment" is a *grit* story an interviewer can click.
- **Referral > cold apply** where possible; 59% get in applying online, but a referral fights the volume.
- **Location:** the listing is LA (hybrid norm ~3 days/week in-office across TTD offices). Answer the relocation question cleanly.
- **Comp expectations:** Analyst I likely lands mid-band (~$60–75K base in LA) + equity programs (ESPP, RSU grants). Glassdoor total-pay estimates for the role family run ~$73–124K. Titles at TTD run conservative (the "I" asks for 3+ years).

## 7. Sources

Interview process & questions: Glassdoor TTD interview stats (521 interviews, updated Aug 2026); Glassdoor Applications Support Analyst reports; r/programmatic CSA-program and TTD-interview threads; r/adtech interview-experience thread; Blind TTD posts. Company: TTD careers listing REQ-9238; TTD IR Q2 2026 press release (Aug 6, 2026); ppc.land (Kokai Q2 2026, OpenAds); TTD OpenAds explainer; Zacks/Yahoo (Ventura); Forbes 2017 (Jeff Green); Comparably/Built In (values). SQL expectations: DataLemur TTD SQL practice set. Salary: careers listing, Built In (Ventura posting), Glassdoor salary pages, levels.fyi.

*Full research memo with per-claim verification flags: `docs/research/ttd-interview-research.md`.*
