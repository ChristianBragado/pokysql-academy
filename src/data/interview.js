// Interview Arena — company dossier (researched Aug 2026), question drills,
// STAR story forge, and the interview-day battle plan + capstone.

const interviewModules = [
  {
    name: 'Know The Trade Desk',
    outcome: 'Speak fluently about what TTD is, its products, its values, and this exact moment in its story.',
    job: 'Interview reports consistently say culture fit decides TTD hires. Fluency about the company is how a beginner outshines experienced-but-lazy candidates.',
    sprite: [1, 63],
    steps: [
      {
        kicker: 'The elevator story',
        title: 'One paragraph you should own cold',
        copy: '"The Trade Desk is the largest <strong>independent demand-side platform</strong> — software that agencies and brands use to buy advertising on the <strong>open internet</strong> through real-time auctions. Founded in 2009 by <strong>Jeff Green</strong>, who describes the mission as building the <strong>NYSE of advertising</strong>: a transparent, objective market. Because TTD owns no media, it only ever represents the buyer — that independence is the entire pitch against walled gardens like Google and Amazon." Say it out loud until it is boring.',
        demo: `<div class="term-chips"><span class="term-chip">independent DSP</span><span class="term-chip">buy-side only</span><span class="term-chip">open internet</span><span class="term-chip">NYSE of advertising</span><span class="term-chip">founded 2009 · ~4,000 employees</span></div>`
      },
      {
        kicker: 'The product map',
        title: 'Five product names to recognize and place',
        copy: 'You do not need depth — you need to never look lost when these words appear. <strong>Kokai</strong>: the current AI-era platform (successor to Solimar); its rollout was famously rocky in 2024–25 and is now the center of the story. <strong>Koa</strong>: the AI that prices bids and optimizes trading. <strong>UID2</strong>: TTD-created open identity standard replacing third-party cookies (hashed email based). <strong>OpenPath / OpenAds</strong>: direct-to-publisher supply and the transparent auction layer announced in late 2025. <strong>Ventura</strong>: TTD’s connected-TV operating system.',
        demo: `<div class="pa-anatomy">
          <div class="pa-anatomy-item"><strong>Kokai</strong><span>The platform your users live in — and your tickets come from</span></div>
          <div class="pa-anatomy-item"><strong>Koa</strong><span>AI bidding/optimization engine inside Kokai</span></div>
          <div class="pa-anatomy-item"><strong>UID2</strong><span>Post-cookie identity, built on hashed emails</span></div>
          <div class="pa-anatomy-item"><strong>OpenPath → OpenAds</strong><span>Direct publisher supply + transparent auction (Prebid-based)</span></div>
          <div class="pa-anatomy-item"><strong>Ventura</strong><span>CTV operating system — the streaming land grab</span></div>
        </div>`
      },
      {
        kicker: 'The moment · researched August 2026',
        title: 'Walk in knowing exactly where the company stands',
        copy: 'As of August 2026: growth has slowed hard (Q2 2026 revenue ~$715M, roughly +3% year over year — reported Aug 6, 2026), the stock is far below its highs, Amazon’s DSP is the competitive threat everyone names, and leadership has been refreshed (new CFO/CMO/CCO). But <strong>customer retention has stayed above 95% for years</strong> — and that is your angle: when growth slows, <strong>support quality becomes the moat</strong>. Platform Support is where that 95% is defended, ticket by ticket. Saying that connects your junior role to the company’s survival story — verify the latest quarter before your interview in case the picture has moved.',
        demo: `<div class="flow"><div class="flow-item"><strong>Slowing growth</strong><span>+3% YoY in Q2 2026 — the pressure is real</span></div><div class="flow-item"><strong>&gt;95% retention</strong><span>The number the whole company defends</span></div><div class="flow-item"><strong>Your role</strong><span>Support IS the retention machine</span></div></div>`
      },
      {
        kicker: 'Culture · the six values',
        title: 'Vision, grit, agility, generosity, openness, full-heartedness',
        copy: 'These six are TTD’s stated values, and interview reports say fit against them is decisive. Prepare one 30-second story per value that matters most for support: <strong>grit</strong> (a problem you refused to drop), <strong>generosity</strong> (helping a teammate or documenting for others), <strong>openness</strong> (a time you said "I don’t know" and found out). Free prep gold: TTD’s own <strong>Edge Academy</strong> offers free programmatic courses — past candidates recommend the Programmatic 101 and Trading Essentials tracks, and mentioning you completed them signals genuine intent.',
        demo: `<div class="term-chips"><span class="term-chip">vision</span><span class="term-chip">grit</span><span class="term-chip">agility</span><span class="term-chip">generosity</span><span class="term-chip">openness</span><span class="term-chip">full-heartedness</span><span class="term-chip">+ Edge Academy certs (free)</span></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'The interviewer asks: "Why The Trade Desk, and why support?" Which answer lands?',
        copy: 'One of these connects you, the role, and the moment. The others are generic.',
        check: {
          choices: [
            '"TTD keeps >95% retention while fighting giants, and support is where retention is actually defended. I want to be on that line — my IT background plus the SQL and AdTech prep I’ve done means I can contribute to it from week one."',
            '"I hear the benefits are great and the stock might recover."',
            '"I just need any tech job and this one was posted recently."',
          ],
          answer: 0,
          explanation: 'The first answer shows company knowledge, connects support to strategy, and positions your background as preparation — vision + grit + full-heartedness in one breath.',
        },
      },
    ],
  },
  {
    name: 'The Question Gauntlet',
    outcome: 'Drill the questions this loop actually asks — SQL, AdTech, troubleshooting scenarios, and behaviorals.',
    job: 'Reported TTD screens probe how you have used data, how you self-teach, and how you reason through scenarios out loud.',
    sprite: [1, 64],
    steps: [
      {
        kicker: 'How to use this deck',
        title: 'Answer out loud before flipping — always out loud',
        copy: 'Interviews are spoken, so practice must be spoken. For each card: read the front, answer aloud in under 90 seconds, then flip and compare. The backs are strong answers, not scripts — steal their <em>structure</em>, replace their details with yours. Verified intel from candidate reports: recruiter screens have asked <strong>"how have you used data to back up a point?"</strong> and <strong>"tell me about teaching yourself something you didn’t understand"</strong> — both are in the deck.',
        widget: {
          type: 'flash',
          title: 'Interview question deck',
          deck: 'gauntlet',
          cards: [
            { cat: 'SQL', front: '"Find all campaigns that spent money yesterday but delivered zero impressions." How do you approach it — talk first, then SQL.', back: 'Talk first: "Spend with no delivery smells like a data problem — but let me confirm the grain of the events table first." Then: SELECT campaign_id, SUM(spend_usd) AS spend, SUM(impressions) AS imps FROM ad_events_daily WHERE event_date = (yesterday) GROUP BY campaign_id HAVING SUM(spend_usd) &gt; 0 AND SUM(impressions) = 0; — then say what you would check next: ingestion lag, join fan-out, or a genuinely broken counter.' },
            { cat: 'SQL', front: '"What is the difference between WHERE and HAVING?"', back: 'WHERE filters rows before grouping; HAVING filters groups after aggregation. "Show tickets opened this week" is WHERE; "show clients with more than five tickets" is HAVING — the count only exists after GROUP BY.' },
            { cat: 'SQL', front: '"How would you get only the latest status row per campaign?"', back: 'ROW_NUMBER() OVER (PARTITION BY campaign_id ORDER BY updated_at DESC) in a CTE, then filter rn = 1. Mention the naive alternative (join to MAX(updated_at)) and why row_number is cleaner with ties handled by a deterministic tiebreaker.' },
            { cat: 'SQL', front: '"Why did your SUM double after you added a join?"', back: 'Join fan-out: the joined table had multiple rows per key, so every metric row duplicated. Diagnose by comparing row counts before/after the join; fix by pre-aggregating the many-side to the right grain in a CTE before joining.' },
            { cat: 'AdTech', front: '"Explain what happens between a page loading and an ad appearing — for a non-technical person."', back: 'The 250ms auction, in plain words: "The page announces an open ad slot. Buying platforms like TTD instantly decide what it is worth for their advertisers and bid. Highest bid wins, pays what it bid, and its ad appears — all faster than the page finishes loading. A tiny tracker then counts that the ad really showed." Practice this until it is smooth — explaining tech simply is a listed job requirement.' },
            { cat: 'AdTech', front: '"A campaign stopped serving. Walk me through your investigation."', back: 'Funnel order: (1) Campaign gated? — status, flight dates, budget exhausted, pacing caps. (2) Eligible but not bidding? — targeting too narrow, creative unapproved, frequency caps saturated. (3) Bidding but losing? — win rate low, bids below market. (4) Winning but not counting? — tracker/discrepancy issue. Naming the funnel matters more than any single answer.' },
            { cat: 'AdTech', front: '"The client’s report shows 90 conversions; our platform shows 40. Are we broken?"', back: 'Probably neither system is broken: their analytics counts ALL conversions from every source; the platform counts only ad-attributed ones inside its attribution window. Align definitions, model, window, timezone, and date range — then compare at campaign-day grain to localize any real gap before escalating.' },
            { cat: 'Scenario', front: '"You have a P1 outage and an angry P2 client both demanding you RIGHT NOW. What do you do?"', back: 'P1 first — but the P2 client gets an immediate, honest holding message with a specific update time, and I keep that promise. Then: root-cause the P1, batch-update all affected clients once, and return to the P2 with full attention. Narrate the triage logic: severity, SLA clock, workaround, correlation.' },
            { cat: 'Scenario', front: '"You are asked to run a stored procedure in production to fix a client’s data. Talk me through it."', back: 'Pre-flight: confirm environment, exact procedure name and parameters, what it changes, and that I have a validation query ready. Run only what is documented — never guess parameters in production. Post-flight: run the validation query, log the execution, confirm with the requester. If anything is ambiguous, stop and ask — a wrong production write is worse than a slow fix.' },
            { cat: 'Scenario', front: '"A client is furious and says they are pulling their budget. De-escalate me. Go."', back: 'Acknowledge specifically ("your Aug 2 numbers are wrong — you are right, and I see exactly which days"), separate working from broken ("delivery never stopped; this is a reporting gap"), commit to a time not a fix ("update by 2 PM either way"), then keep the promise. Anger usually comes from feeling unheard and unpromised — fix those two things first.' },
            { cat: 'Behavioral', front: '"Tell me about a time you used data to back up a point." (asked verbatim in TTD screens)', back: 'Use a real story from your IT work: e.g., you pulled ticket/log data to prove a recurring issue deserved a root-cause fix instead of repeated patching, quantified the hours lost, and won the change. Structure: claim → the data you pulled → the decision it changed → the measured result.' },
            { cat: 'Behavioral', front: '"Tell me about teaching yourself something you didn’t understand." (asked verbatim in TTD screens)', back: 'This very preparation is a legitimate answer: you came from IT, taught yourself SQL to interview level, built/used a training platform with a live SQL engine, learned the programmatic ecosystem, and can now explain an RTB auction. Name the method: break it down, build something real, drill until fluent.' },
            { cat: 'Behavioral', front: '"Why are you leaving IT support for platform support at an ad company?"', back: 'Reframe: not leaving — leveling up the same craft. IT support taught triage, SLAs, angry users, and root-cause discipline. Platform support applies those to a richer domain: data-heavy investigations, SQL, a product with real market stakes. AdTech is the most data-dense support domain there is — that is the draw.' },
            { cat: 'Behavioral', front: '"Where do you want to be in three years?" (at a company with visible internal mobility)', back: 'Honest ambition tied to their ladder: master Platform Support I/II, become the analyst who owns the hardest discrepancy and attribution cases, then grow toward Support Engineer or Technical Account Manager — the listing itself says there is "plenty of room for advancement," so claiming a path reads as fit, not flight risk.' },
            { cat: 'You ask them', front: 'The interview ends: "Any questions for us?" Name three strong ones.', back: '(1) "What separates a good analyst from a great one on this team after a year?" (2) "What class of ticket eats the most team time right now — and is there appetite to fix it at the root?" (3) "How does the team use AI tooling today, and where do you want it to go?" Each question signals you already think like the team.' },
          ],
        },
      },
      {
        kicker: 'Mastery check',
        title: 'The best way to practice this deck is…',
        copy: 'Be honest with yourself.',
        check: {
          choices: [
            'Out loud, timed under ~90 seconds, structure first — repeatedly until fluent',
            'Silently reading fronts and backs once the night before',
            'Memorizing every back word for word',
          ],
          answer: 0,
          explanation: 'Spoken fluency is the skill being tested. Structure (funnel, triage logic, STAR) transfers under pressure; memorized scripts collapse.',
        },
      },
    ],
  },
  {
    name: 'STAR Forge',
    outcome: 'Write and polish five interview stories with measurable results, exportable for rehearsal.',
    job: 'Behavioral rounds decide culture fit — and TTD reports say fit is decisive. Five prepared stories cover ~90% of behavioral questions.',
    sprite: [2, 196],
    steps: [
      {
        kicker: 'The format that never fails',
        title: 'STAR: Situation, Task, Action, Result — plus a number and a lesson',
        copy: '<strong>S</strong>ituation (context, 1–2 sentences), <strong>T</strong>ask (your responsibility), <strong>A</strong>ction (what YOU specifically did — the longest part, "I" not "we"), <strong>R</strong>esult (lead with the measurable outcome). Add the two multipliers interviewers remember: <strong>a number</strong> ("cut repeat tickets 30%", "restored service in 20 minutes") and <strong>a lesson</strong> ("since then I always check X first"). Your IT background is full of these stories — the forge below extracts them.',
        demo: `<div class="flow"><div class="flow-item"><strong>S · Situation</strong><span>Set the scene fast</span></div><div class="flow-item"><strong>T · Task</strong><span>Your responsibility</span></div><div class="flow-item"><strong>A · Action</strong><span>What YOU did — most of the airtime</span></div><div class="flow-item"><strong>R · Result</strong><span>Number first, then the lesson</span></div></div>`
      },
      {
        kicker: 'Interactive · forge your five stories',
        title: 'The five stories that cover the whole behavioral round',
        copy: 'These five prompts map to the exact competencies in the listing: troubleshooting, de-escalation, prioritization, cross-team escalation, and process improvement. Write in your own words — saved on this device, exportable as markdown for rehearsal.',
        widget: {
          type: 'star',
          title: 'STAR story forge',
          prompts: [
            { id: 'troubleshoot', label: 'Deep troubleshooting', brief: 'A gnarly technical problem you chased to root cause — from your IT work: an outage, a recurring failure, a mystery only you cracked.', tip: 'Show method, not heroics: how you narrowed the search space, what you ruled out, how you proved the cause.' },
            { id: 'deescalate', label: 'Client de-escalation', brief: 'A time an angry user/customer/colleague calmed down because of how you handled it.', tip: 'The skill on display: specific acknowledgment, honest scope, a promised update time you kept.' },
            { id: 'prioritize', label: 'Prioritization under pressure', brief: 'Too many urgent things at once — how you chose, what you told the people who had to wait.', tip: 'Name your criteria out loud (impact, deadline, workaround) — the criteria ARE the answer.' },
            { id: 'escalate', label: 'Cross-team escalation', brief: 'A problem you could not fix alone: how you packaged it for another team and drove it to done.', tip: 'Evidence quality and follow-through matter more than the handoff itself.' },
            { id: 'improve', label: 'Process/knowledge improvement', brief: 'Something you documented, automated, or improved so the problem never came back at full cost.', tip: 'The listing explicitly rewards knowledge-base building — this story proves you leave systems better than you found them.' },
          ],
        },
      },
      {
        kicker: 'Mastery check',
        title: 'Which Result line wins the room?',
        copy: 'All three describe the same event.',
        check: {
          choices: [
            '"Repeat tickets for that error dropped about 30% over the next quarter, and the KB article I wrote became the team’s standard first response. I also learned to check ingestion timestamps before anything else."',
            '"It went really well and everyone was happy with me."',
            '"We fixed it as a team and moved on to other work."',
          ],
          answer: 0,
          explanation: 'A number, a durable artifact, and a lesson — that is a Result. "Went well" is air; "we fixed it" hides your contribution.',
        },
      },
    ],
  },
  {
    name: 'Interview Day Plan',
    outcome: 'Know the loop, run the capstone, and walk in with a checklist instead of nerves.',
    job: 'This module turns everything — 4 tracks, 26 modules — into a battle plan for the actual interview process.',
    sprite: [1, 65],
    steps: [
      {
        kicker: 'The loop · from verified reports',
        title: 'What the process most likely looks like',
        copy: 'From candidate reports for TTD support/client-services roles: <strong>(1) recruiter screen</strong> — resume walk, "how have you used data," logistics; <strong>(2) hiring-manager screen</strong> — role depth, scenarios, maybe verbal SQL; <strong>(3) possible skills exercise</strong> — TTD support loops have included a case study or <strong>data presentation</strong> (you get a dataset + prompt, you present findings and recommendations); <strong>(4) panel of ~3–4</strong> — peers and cross-functional, heavily weighted to communication and culture fit. Timelines can be slow (weeks between rounds); reorgs and pauses happen — do not read silence as rejection, and keep applying elsewhere in parallel.',
        demo: `<div class="flow"><div class="flow-item"><strong>1 · Recruiter</strong><span>Story + data questions</span></div><div class="flow-item"><strong>2 · Hiring manager</strong><span>Scenarios · verbal SQL</span></div><div class="flow-item"><strong>3 · Exercise</strong><span>Case study / data presentation (be ready)</span></div><div class="flow-item"><strong>4 · Panel ×4</strong><span>Communication · culture fit</span></div></div>`
      },
      {
        kicker: 'If the data presentation comes',
        title: 'The wrap-up deck formula',
        copy: 'Reported format: they hand you campaign data and a prompt; you build a short deck and defend it. The formula: <strong>1 slide</strong> — what the data says (topline metrics, the pivot that matters); <strong>1 slide</strong> — what worked vs what did not (name the metric and the why); <strong>1 slide</strong> — recommendations with expected impact; then <strong>defend calmly under questioning</strong> — "great question, the data I would pull to answer that is X" is a winning move when you do not know. Practice by presenting your capstone findings out loud to a friend.',
        demo: `<div class="term-chips"><span class="term-chip">topline first</span><span class="term-chip">worked vs didn’t + why</span><span class="term-chip">recommendations with impact</span><span class="term-chip">"the data I’d pull to answer that is…"</span></div>`
      },
      {
        kicker: 'The final boss',
        title: 'Run the 100-point capstone in RunSQL',
        copy: 'Build the realistic AdTech schema in a PostgreSQL sandbox, load the CSVs, and take the 100-point final: SQL practical (50), troubleshooting (25), operational judgment (15), behavioral (10). Passing standard: <strong>90+, no unsafe production action, no inflated-grain spend, no discrepancy verdict before aligning definitions</strong>. Do it once untimed, then again at 60 minutes, narrating aloud.',
        demo: `<div class="downloads">
          <a class="btn is-primary" href="./capstone/README.md">Open the 100-point test</a>
          <a class="btn" href="./capstone/ttd-adtech-schema.dbml">DBML schema</a>
          <a class="btn" href="./capstone/advertisers.csv">advertisers.csv</a>
          <a class="btn" href="./capstone/campaigns.csv">campaigns.csv</a>
          <a class="btn" href="./capstone/campaign_status_history.csv">status_history.csv</a>
          <a class="btn" href="./capstone/ad_events_daily.csv">ad_events_daily.csv</a>
          <a class="btn" href="./capstone/offline_conversions.csv">offline_conversions.csv</a>
          <a class="btn" href="./capstone/support_tickets.csv">support_tickets.csv</a>
          <a class="btn" href="./capstone/incidents.csv">incidents.csv</a>
        </div>`
      },
      {
        kicker: 'The night-before checklist',
        title: 'Twelve checks, then sleep',
        copy: 'Print this. <strong>Story:</strong> elevator pitch smooth · five STAR stories rehearsed aloud · "why TTD, why support" tied to retention. <strong>Tech:</strong> can whiteboard-talk a JOIN, GROUP BY/HAVING, ROW_NUMBER, and the fan-out bug · can narrate the 250ms auction · can walk the campaign-not-serving funnel and the discrepancy method. <strong>Company:</strong> Kokai/Koa/UID2/OpenPath-OpenAds/Ventura placed · six values with a story each · latest quarter checked the morning of. <strong>Logistics:</strong> three questions for them ready · Edge Academy certs mentioned in your intro if completed · water, notes, charged laptop, camera at eye level.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>Story ✓</strong><span>Pitch · 5 STARs · why-TTD</span></div><div class="pa-anatomy-item"><strong>Tech ✓</strong><span>SQL patterns · auction · funnels</span></div><div class="pa-anatomy-item"><strong>Company ✓</strong><span>Products · values · fresh news</span></div><div class="pa-anatomy-item"><strong>Logistics ✓</strong><span>Questions · setup · calm</span></div></div>`
      },
      {
        kicker: 'Final mastery check',
        title: 'Mid-interview, you get a question you genuinely cannot answer. The champion move is:',
        copy: 'This will happen. Decide now how you respond.',
        check: {
          choices: [
            'Say so, then show your method: "I haven’t hit that exact case — here is how I would find out," and reason aloud from what you do know',
            'Bluff a confident wrong answer and hope',
            'Apologize repeatedly and go quiet',
          ],
          answer: 0,
          explanation: 'Support work IS structured not-knowing. Interviewers for this role are literally hiring your behavior in that moment — openness plus method is the job.',
        },
      },
    ],
  },
];
