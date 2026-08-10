// Ops Center — the support-analyst craft: SLAs, triage, escalation writing,
// Excel/pivot fluency, and the named tool stack from the job listing.

const opsModules = [
  {
    name: 'Run the Queue',
    outcome: 'Triage a ticket queue using severity, SLA, impact, and workaround logic.',
    job: 'The first bullet of the listing: "ensuring that incidents are addressed within established SLAs." Triage judgment is the job.',
    sprite: [1, 1],
    steps: [
      {
        kicker: 'The vocabulary of support',
        title: 'SLA, priority, severity — three words that run your day',
        copy: 'An <strong>SLA</strong> (service-level agreement) is a promised clock: "P1 gets a first response in 30 minutes, P2 in 4 hours." <strong>Priority</strong> (P1/P2/P3) encodes how fast something must move, driven by <strong>severity</strong> (how bad is the damage) and <strong>scope</strong> (how many clients feel it). The queue is never empty — the skill is choosing what to touch <em>next</em> and being able to defend the choice.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>P1 · critical</strong><span>Platform down, money actively being lost, no workaround</span></div><div class="pa-anatomy-item"><strong>P2 · major</strong><span>Feature broken or data wrong; business hurting but operating</span></div><div class="pa-anatomy-item"><strong>P3 · minor</strong><span>Cosmetic issues, questions, requests with easy workarounds</span></div></div>`
      },
      {
        kicker: 'The four questions of triage',
        title: 'Impact · SLA clock · workaround · correlation',
        copy: 'For every ticket ask: <strong>1)</strong> Who is bleeding, and how much (revenue, campaigns live now)? <strong>2)</strong> Which SLA clock expires soonest? <strong>3)</strong> Does a workaround exist that buys time? <strong>4)</strong> Do multiple tickets correlate — five clients reporting the same symptom is one incident, not five tickets, and it outranks its individual parts.',
        demo: `<div class="flow"><div class="flow-item"><strong>1 · Impact</strong><span>Spend at risk · clients affected</span></div><div class="flow-item"><strong>2 · Clock</strong><span>Which SLA breaches first?</span></div><div class="flow-item"><strong>3 · Workaround</strong><span>Can anyone be unblocked cheaply?</span></div><div class="flow-item"><strong>4 · Correlation</strong><span>Same root cause across tickets?</span></div></div>`
      },
      {
        kicker: 'Interactive · your queue at 10:00 AM',
        title: 'Order these five tickets',
        copy: 'Use the four questions. Move tickets with the arrows, then check your order. In the interview, narrate this exact reasoning.',
        widget: {
          type: 'triage',
          title: 'Triage simulator',
          brief: 'It is 10:00 AM. All five arrived overnight. P1 SLA: 30 min · P2: 4 h · P3: 1 business day.',
          tickets: [
            { priority: 'P2', title: 'Reporting dashboard empty for ALL clients since 6 AM', detail: ' — 14 tickets correlate to one ingestion incident. No workaround; clients flying blind on live spend.' },
            { priority: 'P1', title: 'Enterprise client’s campaigns stopped serving mid-flight', detail: ' — $40k/day in paused delivery for one major client. No workaround found yet.' },
            { priority: 'P2', title: 'Spend discrepancy claim from mid-size client', detail: ' — numbers differ 18% vs their ad server; client threatening escalation but campaigns still running.' },
            { priority: 'P3', title: 'Access request: new trader needs seat permissions', detail: ' — unblocks one person; two-minute fix; no SLA pressure until tomorrow.' },
            { priority: 'P3', title: 'HTML5 creative rejected, client asking why', detail: ' — routine explanation; campaign has other live creatives as a workaround.' },
          ],
          answer: [1, 0, 2, 3, 4],
          debrief: 'Debrief: the P1 single-client outage goes first — highest severity, active money bleeding, tightest SLA. The platform-wide reporting incident is a very close second (widest scope; escalate as ONE incident, not 14 tickets — and if delivery itself were affected it would jump to #1). The discrepancy is urgent-feeling but campaigns still run — it slots third with a definitions-first investigation. The 2-minute access request beats the creative explanation because it unblocks a person at almost zero cost.',
        },
      },
      {
        kicker: 'Mastery check',
        title: 'Fourteen separate tickets describe the same empty dashboard. What do you do?',
        copy: 'Choose the operationally correct move.',
        check: {
          choices: [
            'Link them to one incident, escalate once with the full client list, and send a single status update to all reporters',
            'Answer all fourteen tickets separately in SLA order',
            'Close thirteen as duplicates without replying',
          ],
          answer: 0,
          explanation: 'Correct. Correlated tickets = one incident. One escalation with scope evidence gets engineering moving faster, and one broadcast update keeps every client informed without 14× the work.',
        },
      },
    ],
  },
  {
    name: 'Escalate Like a Pro',
    outcome: 'Write an escalation note engineering can act on, and a client update that de-escalates.',
    job: '"Outstanding written communication, including explaining complex subjects to a non-technical audience" — this module is that sentence, operationalized.',
    sprite: [2, 152],
    steps: [
      {
        kicker: 'Two audiences, two languages',
        title: 'Engineering wants evidence. Clients want impact and a plan.',
        copy: 'The same incident produces two different documents. To <strong>engineering</strong>: symptoms, scope, reproduction, evidence, what you ruled out. To the <strong>client</strong>: what happened in plain English, what it affects (and does not), what you are doing, and exactly when they will hear from you next. Mixing the two audiences is the most common junior mistake.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>To engineering</strong><span>"Impressions for campaign 2005 are zero on OpenX only since 02:00 UTC; other exchanges normal; no targeting changes in audit log; sample bid request IDs attached."</span></div><div class="pa-anatomy-item"><strong>To client</strong><span>"Delivery on one exchange paused overnight; roughly 15% of your volume. Serving elsewhere is unaffected. Engineering is investigating; next update by 2:00 PM PT."</span></div></div>`
      },
      {
        kicker: 'The six-part escalation note',
        title: 'What happened · impact · evidence · ruled out · ask · next update',
        copy: 'Engineers act fastest on notes with these six parts. "Evidence" means specifics: IDs, timestamps, row counts, the query you ran. "Ruled out" saves them an hour. "Ask" makes ownership explicit. "Next update" is the promise that keeps the client calm while engineering works.',
        widget: {
          type: 'noteBuilder',
          title: 'Build the escalation note',
          brief: 'Ticket 5002: a client reports dashboard conversions lower than their own report. You investigated with SQL. Pick the strongest line for each section.',
          slots: [
            {
              label: 'What happened',
              options: [
                { text: 'Client says the dashboard is wrong and is upset.' },
                { text: 'Dashboard conversions for advertiser 102 are 22% below the client’s ad-server report for Aug 1–3.' },
                { text: 'There is some kind of conversion issue.' },
              ],
              best: 1,
              why: 'Quantified, scoped to an advertiser and a date range. "Wrong" and "some kind of issue" give engineering nothing to grab.',
            },
            {
              label: 'Impact',
              options: [
                { text: 'One advertiser affected; campaigns still delivering; client escalating and comparing us to their ad server daily.' },
                { text: 'It is probably fine.' },
                { text: 'EVERYTHING IS BROKEN and the client will churn.' },
              ],
              best: 0,
              why: 'Honest scope: business pressure without panic. Overstating impact burns credibility exactly when you need it.',
            },
            {
              label: 'Evidence',
              options: [
                { text: 'I have a feeling ingestion is slow.' },
                { text: 'The client sent a screenshot.' },
                { text: 'SQL at campaign-day grain shows the gap concentrated on Aug 2 after 21:00 UTC; offline_conversions has 3 duplicate order_ids that days; query attached.' },
              ],
              best: 2,
              why: 'A reproducible query, a narrowed time slice, and a concrete anomaly. This is what "trackability on all case work" means in the listing.',
            },
            {
              label: 'Ruled out',
              options: [
                { text: 'Checked: no timezone mismatch (both UTC), attribution windows match (30-day click), no pixel changes in the period.' },
                { text: 'I did not rule anything out yet.' },
                { text: 'It is definitely not our fault.' },
              ],
              best: 0,
              why: 'Each ruled-out cause is an hour engineering does not spend re-checking. Blame-free, evidence-first.',
            },
            {
              label: 'The ask',
              options: [
                { text: 'Please look into this when someone has time.' },
                { text: 'Requesting ingestion-pipeline review for Aug 2 21:00–23:00 UTC and confirmation whether dedupe ran on the offline file.' },
                { text: 'Fix it ASAP!!!' },
              ],
              best: 1,
              why: 'A specific, bounded request with the exact window. Vague asks sit in backlogs; shouted asks get deprioritized by humans.',
            },
            {
              label: 'Next update',
              options: [
                { text: 'Client promised an update by 2:00 PM PT today; please flag if that timeline is unrealistic.' },
                { text: 'No rush.' },
                { text: 'The client expects this fixed within the hour.' },
              ],
              best: 0,
              why: 'You committed to a time, told engineering about the commitment, and invited them to correct it. That is how trust is built in both directions.',
            },
          ],
        },
      },
      {
        kicker: 'De-escalation under fire',
        title: 'Angry clients calm down when you name the impact, own the next step, and keep the promise',
        copy: 'De-escalation is not apology theater. The pattern: <strong>acknowledge specifically</strong> ("your Aug 2 conversion counts are affected — you are right that they do not match"), <strong>separate what works from what is broken</strong> ("delivery was never interrupted"), <strong>commit to a time, not a fix</strong> ("update by 2 PM whether or not it is resolved"), and <strong>keep that promise even if the update is "still investigating."</strong> Missed update times — not bugs — are what destroy client trust.',
        demo: `<div class="term-chips"><span class="term-chip">acknowledge specifically</span><span class="term-chip">separate working from broken</span><span class="term-chip">commit to a time</span><span class="term-chip">keep the promise</span></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'It is 1:55 PM. You promised the client a 2:00 PM update but engineering has found nothing yet. What do you send?',
        copy: 'The trust-preserving move.',
        check: {
          choices: [
            '"Still investigating — we have ruled out timezone and attribution differences; the gap is isolated to Aug 2 evening. Next update by 5:00 PM." Sent at 2:00 PM.',
            'Nothing — wait until there is real news, even if that is tomorrow',
            '"It is fixed" — to buy time, then hope it actually gets fixed',
          ],
          answer: 0,
          explanation: 'Correct. An on-time "no news yet, here is what we ruled out, here is the next checkpoint" update builds more trust than a delayed perfect answer. Lying about a fix is career-ending in support.',
        },
      },
    ],
  },
  {
    name: 'Excel Gym',
    outcome: 'Build pivot tables, wield the five analyst formulas, and choose Excel vs SQL deliberately.',
    job: '"Advanced MS Excel skills: pivot tables, formulas, drawing insights from large datasets" is a hard requirement — and the pivot table is the whole game.',
    sprite: [3, 252],
    steps: [
      {
        kicker: 'The one Excel skill that matters most',
        title: 'A pivot table is GROUP BY with drag-and-drop',
        copy: 'You already learned <code>GROUP BY</code> in the SQL Gym — a pivot table is the same idea wearing a spreadsheet costume. <strong>Rows</strong> = the GROUP BY dimension. <strong>Values</strong> = the aggregate (SUM, AVERAGE, COUNT). <strong>Columns</strong> = an optional second dimension spread sideways. <strong>Filters</strong> = the WHERE clause. If you can say that sentence in an interview, you have proven both skills at once.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>Pivot Rows</strong><span>= GROUP BY dimension</span></div><div class="pa-anatomy-item"><strong>Pivot Values</strong><span>= SUM(...) / AVG(...) / COUNT(...)</span></div><div class="pa-anatomy-item"><strong>Pivot Columns</strong><span>= second dimension, spread wide</span></div><div class="pa-anatomy-item"><strong>Pivot Filters</strong><span>= WHERE clause</span></div></div>`
      },
      {
        kicker: 'Interactive · a real pivot over your campaign data',
        title: 'Complete the three missions',
        copy: 'This pivot builder runs over the same <code>ad_events_daily</code> data you queried in the SQL Gym. Configure Rows, Columns, Values, and Aggregation to answer each mission — exactly what you would do in Excel with the same data exported to CSV.',
        widget: {
          type: 'pivot',
          title: 'Pivot builder — ad delivery data',
          missions: [
            { brief: 'Show total SPEND by ADVERTISER (no column dimension).', expect: { row: 'advertiser', col: 'none', measure: 'spend_usd', agg: 'sum' }, nudge: 'Rows = Advertiser, Values = Spend, Aggregation = SUM, Columns = none.' },
            { brief: 'Break total IMPRESSIONS down by CAMPAIGN per EXCHANGE (campaigns as rows, exchanges as columns).', expect: { row: 'campaign', col: 'exchange_name', measure: 'impressions', agg: 'sum' }, nudge: 'Rows = Campaign, Columns = Exchange, Values = Impressions, SUM.' },
            { brief: 'Find the AVERAGE CONVERSIONS per event-row for each EXCHANGE (exchanges as rows).', expect: { row: 'exchange_name', col: 'none', measure: 'conversions', agg: 'avg' }, nudge: 'Rows = Exchange, Values = Conversions, Aggregation = AVERAGE.' },
          ],
        },
      },
      {
        kicker: 'The five formulas interviews expect',
        title: 'XLOOKUP, SUMIFS, COUNTIFS, IFERROR, and the humble ratio',
        copy: 'Beyond pivots, five formulas cover most analyst work. <strong>XLOOKUP</strong> joins two sheets on a key (the modern VLOOKUP — say "XLOOKUP, or VLOOKUP where compatibility matters"). <strong>SUMIFS/COUNTIFS</strong> are conditional aggregates — SQL’s WHERE + GROUP BY in one cell. <strong>IFERROR</strong> is your NULLIF divide-by-zero guard. And a calculated CTR column is just <code>=clicks/impressions</code> wrapped in IFERROR.',
        demo: `<pre>=XLOOKUP(A2, campaigns!A:A, campaigns!B:B)      <span class="code-kw">-- join: campaign name by id</span>
=SUMIFS(spend, campaign_id, A2, date, "&gt;="&amp;$F$1) <span class="code-kw">-- conditional total</span>
=COUNTIFS(priority, "P1", resolved_at, "")       <span class="code-kw">-- open P1 count</span>
=IFERROR(C2/B2, 0)                               <span class="code-kw">-- CTR, divide-by-zero safe</span></pre>`
      },
      {
        kicker: 'Judgment call',
        title: 'Excel or SQL? Size, repetition, and audience decide',
        copy: 'Under ~100k rows, one-off, client-facing formatting needed → <strong>Excel</strong>. Millions of rows, repeated daily, feeding a system → <strong>SQL</strong>. The interview-grade answer: "I prototype the question in Excel with the client’s own export, then productionize it as SQL so the answer is reproducible." That sentence shows you own both tools.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>Excel wins</strong><span>Small data · one-off · client-facing formatting · exploration</span></div><div class="pa-anatomy-item"><strong>SQL wins</strong><span>Big data · repeated daily · feeds systems · needs an audit trail</span></div></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'A client emails a 40,000-row CSV asking "which exchange wastes my budget?" — due today. Your move?',
        copy: 'Pick the answer that balances speed and durability.',
        check: {
          choices: [
            'Pivot the CSV in Excel now to answer the client today, and note the SQL needed to automate it if the question repeats',
            'Refuse to answer until the data is in a database',
            'Read all 40,000 rows manually to be thorough',
          ],
          answer: 0,
          explanation: 'Correct. Fast answer now with the right tool, durable answer later with the reproducible one. That is analyst judgment.',
        },
      },
    ],
  },
  {
    name: 'The Analyst Toolbelt',
    outcome: 'Say something competent about every tool named in the listing — and about using AI on the job.',
    job: 'Bonus traits: "Salesforce, Jira, Confluence, Postman, Vertica, SSMS, Tableau." You do not need mastery — you need honest, specific familiarity.',
    sprite: [1, 114],
    steps: [
      {
        kicker: 'Strategy first',
        title: 'Nobody expects you to master seven tools — they expect you to map them to jobs',
        copy: 'In the interview, never bluff depth you lack. The winning pattern: <strong>"I have used X for Y"</strong> where you can, and <strong>"I know X is the team’s tool for Y, and here is the adjacent thing I have used"</strong> where you cannot. This deck gives you the honest one-liner for every tool in the listing.',
        demo: `<div class="term-chips"><span class="term-chip">Salesforce → client record & case tracking</span><span class="term-chip">Jira → engineering escalations</span><span class="term-chip">Confluence → knowledge base</span><span class="term-chip">Postman → poke the API directly</span><span class="term-chip">Vertica → big analytics SQL</span><span class="term-chip">SSMS → SQL Server + stored procs</span><span class="term-chip">Tableau → dashboards clients see</span></div>`
      },
      {
        kicker: 'Interactive · the toolbelt deck',
        title: 'Drill until 80% of the deck is second nature',
        copy: 'Each card front is a question an interviewer could ask; the back is a competent, honest answer. Mark cards known as you go.',
        widget: {
          type: 'flash',
          title: 'Toolbelt flashcards',
          deck: 'tools',
          cards: [
            { cat: 'Ticketing', front: 'What would you use Salesforce for in this role?', back: 'As the CRM and often the support-case system: the client’s account record, open cases, history, and SLAs live there. I would work my queue from it and keep every investigation documented on the case — "trackability on all case work," as the listing puts it.' },
            { cat: 'Ticketing', front: 'Where does Jira fit for a support analyst?', back: 'Jira tracks engineering work. When I escalate a platform defect, it becomes a Jira ticket with my evidence attached; I follow it, nudge priorities with new client impact data, and translate its status back to the client in plain English.' },
            { cat: 'Docs', front: 'What is Confluence to a support team?', back: 'The knowledge base. The listing explicitly says analysts create and improve documentation — after every novel investigation, the fix becomes a Confluence article so the next analyst resolves it in minutes, not hours.' },
            { cat: 'API', front: 'Why would a support analyst open Postman?', back: 'To test the platform API directly and isolate a problem: if the API returns correct data but the UI shows something else, the bug is in the UI layer. Postman turns "it looks wrong" into "endpoint X returns Y for parameter Z" — an escalation engineering can act on immediately.' },
            { cat: 'Databases', front: 'What is Vertica and why does TTD list it?', back: 'A columnar analytics database built for huge aggregations — the kind of store an ad platform uses for reporting data. Column storage makes SUM/GROUP BY over billions of rows fast. My SQL carries over; Vertica adds strong window-function support and a few dialect quirks.' },
            { cat: 'Databases', front: 'What is SSMS?', back: 'SQL Server Management Studio — Microsoft’s client for SQL Server. It is where you would run queries and execute stored procedures (EXEC) against SQL Server databases, with an object explorer to inspect schemas and procedure definitions before touching anything.' },
            { cat: 'Databases', front: 'What is a stored procedure, and the safety ritual before running one?', back: 'A saved routine in the database that can read or change data. Before executing: confirm environment (staging vs prod), exact name and parameters, expected effect, and a validation query for afterwards. Never guess parameters in production; log the run and check the audit trail.' },
            { cat: 'BI', front: 'How does Tableau show up in support work?', back: 'Dashboards — internal ops metrics and client-facing reports are often Tableau. I read them critically (what filter, what timezone, what refresh time) because "the dashboard is wrong" tickets usually trace to one of those three settings.' },
            { cat: 'AI', front: 'The listing requires "proficiency with AI tools." What do you say?', back: 'I use AI assistants daily as an accelerator with verification: drafting SQL that I then test on sample data, summarizing long ticket threads, turning investigation notes into client-ready updates, and drafting KB articles. I never paste client data into unapproved tools, and I verify outputs before they reach anyone — AI drafts, the analyst signs.' },
            { cat: 'AI', front: 'Name a support workflow you would improve with AI, concretely.', back: 'Ticket deflection and triage: cluster incoming tickets by symptom to spot incident correlation faster, auto-suggest the matching KB article on ticket creation, and auto-draft the six-part escalation note from the ticket history. The listing literally asks analysts to find AI workload-reduction opportunities — have one ready.' },
            { cat: 'Process', front: 'What is agile/scrum in one support-flavored sentence?', back: 'Work organized in short sprints with a visible backlog, daily standups, and retrospectives — for support, it means my escalations enter engineering’s sprint process, so I write them with enough evidence to be estimated and prioritized without a round trip.' },
            { cat: 'Process', front: 'The listing mentions "executing stored procedures" as routine work. Red flag or normal?', back: 'Normal for platform support — mature platforms wrap common data fixes (reprocess a file, refresh a report) in vetted procedures so analysts can run them safely instead of writing ad-hoc UPDATEs. The skill being tested is disciplined execution: right environment, right parameters, validated result.' },
          ],
        },
      },
      {
        kicker: 'Mastery check',
        title: 'The interviewer asks about Vertica and you have never used it. Best answer?',
        copy: 'Honesty with a bridge beats bluffing every time.',
        check: {
          choices: [
            '"I haven’t run Vertica in production, but I know it is a columnar analytics database, my SQL transfers directly, and I have practiced the window-function patterns it is built for."',
            '"Yes, I am a Vertica expert" — and hope no follow-up comes',
            '"No." — and wait silently for the next question',
          ],
          answer: 0,
          explanation: 'Correct. Honest, specific, and forward-leaning: names what it is, claims the transferable skill, shows preparation. Bluffing collapses on the first follow-up; bare "no" wastes the chance.',
        },
      },
    ],
  },
];
