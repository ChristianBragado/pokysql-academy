// AdTech Academy — programmatic advertising from zero, aimed at the
// "2+ years AdTech experience (RTB, DSPs, ad exchanges, ad servers)" requirement.

const adtechModules = [
  {
    name: 'The Ad Money Map',
    outcome: 'Name every player between an advertiser and a publisher, and place The Trade Desk on the map.',
    job: 'The listing demands "advanced knowledge of RTB, DSPs, ad exchanges, aggregators, ad servers." This module gives you the map those words live on.',
    sprite: [1, 4],
    steps: [
      {
        kicker: 'Start here · no advertising background needed',
        title: 'Advertising is a supply chain, and every ad you see traveled through it',
        copy: 'A brand (the <strong>advertiser</strong>) wants to show an ad. A website or streaming app (the <strong>publisher</strong>) has space to show it. Everything else in AdTech exists to connect those two sides — automatically, at massive scale. Buying ad space through automated systems instead of phone calls and faxes is called <strong>programmatic advertising</strong>.',
        demo: `<div class="flow"><div class="flow-item"><strong>Buy side</strong><span>Advertisers &amp; agencies with money to spend</span></div><div class="flow-item"><strong>The pipes</strong><span>DSPs, exchanges, SSPs — the automated market</span></div><div class="flow-item"><strong>Sell side</strong><span>Publishers with ad space (inventory) to sell</span></div></div>`
      },
      {
        kicker: 'Interactive · reveal each player',
        title: 'Click through the chain: who does what',
        copy: 'These six players appear in almost every support ticket you will ever touch. Click each one and say its role out loud — in the interview you should be able to draw this from memory.',
        widget: {
          type: 'ecosystem',
          title: 'The programmatic supply chain',
          nodes: [
            { name: '1 · Advertiser', role: 'The brand with a budget — say, a hiking-gear company that wants customers.' },
            { name: '2 · Agency / trader', role: 'Runs campaigns for the advertiser. At TTD these are your main users — they live inside the platform.' },
            { name: '3 · DSP (demand-side platform)', role: 'Software that bids on ad space for buyers, using data to decide what each impression is worth. The Trade Desk IS a DSP — the largest independent one.' },
            { name: '4 · Ad exchange', role: 'The marketplace where the auction happens, in real time, for every single impression. OpenX, Index Exchange, and Google AdX are exchanges.' },
            { name: '5 · SSP (supply-side platform)', role: 'The publisher’s mirror image of a DSP: software that offers the publisher’s ad space to many exchanges and buyers to get the best price. PubMatic and Magnite are SSPs.' },
            { name: '6 · Publisher + ad server', role: 'The site/app showing the ad. Its ad server (e.g. Google Ad Manager) is the traffic controller that decides which ad finally renders and counts it.' },
          ],
        },
      },
      {
        kicker: 'Why "independent" matters',
        title: 'The Trade Desk is buy-side only — that is its whole identity',
        copy: 'Google and Amazon own the ad space they sell (YouTube, Amazon.com), so they represent both buyer and seller — advertisers call them <strong>walled gardens</strong>. The Trade Desk owns no media. It only represents buyers on the <strong>open internet</strong> (news sites, streaming TV, podcasts, apps), so its incentives stay aligned with advertisers. Founder Jeff Green describes the vision as building the <strong>"NYSE of advertising"</strong> — a transparent, objective market for ad space.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>Walled garden</strong><span>Sells you its own inventory. Grades its own homework.</span></div><div class="pa-anatomy-item"><strong>The Trade Desk</strong><span>Buy-side only. No inventory to favor. Transparent fees.</span></div><div class="pa-anatomy-item"><strong>Open internet</strong><span>Everything outside the walls: CTV, audio, news, apps.</span></div></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'A client asks: "So what exactly is The Trade Desk?"',
        copy: 'Pick the answer you could say in an interview without notes.',
        check: {
          choices: [
            'A demand-side platform: software that agencies and brands use to buy ad impressions across the open internet through real-time auctions',
            'A social network that sells its own ad space to brands',
            'A website that publishes news and sells banner ads',
          ],
          answer: 0,
          explanation: 'Exactly. Buy-side software, real-time auctions, open internet — those three phrases together define TTD.',
        },
      },
    ],
  },
  {
    name: 'The 250ms Auction',
    outcome: 'Trace a real-time bid from page load to rendered ad, and explain first-price auctions.',
    job: 'RTB is the beating heart of the platform you would support. When a campaign "isn’t delivering," this auction is where you look first.',
    sprite: [1, 58],
    steps: [
      {
        kicker: 'The core mechanic of programmatic',
        title: 'Every impression is auctioned while the page is still loading',
        copy: '<strong>Real-time bidding (RTB)</strong> means: a person opens a page or a streaming app break starts → the seller broadcasts a <strong>bid request</strong> describing the moment (page, ad size, rough location, privacy-safe user signals) → DSPs decide in milliseconds what that impression is worth to their advertisers and respond with a <strong>bid response</strong> → highest bid wins → the winner’s ad renders. The whole round trip runs in roughly a quarter of a second.',
        demo: `<div class="term-chips"><span class="term-chip">bid request</span><span class="term-chip">bid response</span><span class="term-chip">auction</span><span class="term-chip">win notice</span><span class="term-chip">ad markup</span><span class="term-chip">impression tracker</span></div>`
      },
      {
        kicker: 'Interactive · run the auction',
        title: 'Watch one impression get bought',
        copy: 'Step through a single auction below. Narrating this flow smoothly is a classic "explain something technical to a non-technical person" interview moment.',
        widget: {
          type: 'auction',
          title: 'One impression, ~250 milliseconds',
          phases: [
            { name: 'Page load', time: '0 ms', note: 'A reader opens a recipe site. The page has one ad slot: 300×250, above the fold. The publisher’s SSP packages this moment for sale.' },
            { name: 'Bid request', time: '~20 ms', note: 'The exchange broadcasts a bid request to dozens of DSPs: page category, ad size, device, geo, and privacy-safe IDs. No name, no email — just signals.' },
            { name: 'DSPs evaluate', time: '~80 ms', note: 'Each DSP checks: do any of my campaigns target this audience, geo, and site? What is this impression worth given budget, pacing, and frequency caps? TTD’s bidding engine (Koa) prices it automatically.' },
            {
              name: 'Bids land', time: '~150 ms', note: 'Four DSPs answer with CPM bids (price per 1,000 impressions). In a <strong>first-price auction</strong> — today’s industry standard — the winner pays exactly what they bid, so bidding your true value matters.',
              bids: [
                { dsp: 'The Trade Desk', cpm: 8.40, pct: 100, win: true },
                { dsp: 'DSP Bravo', cpm: 6.10, pct: 73 },
                { dsp: 'DSP Charlie', cpm: 4.75, pct: 57 },
                { dsp: 'DSP Delta', cpm: 2.20, pct: 26 },
              ],
            },
            { name: 'Win + render', time: '~200 ms', note: 'TTD wins at $8.40 CPM and receives a win notice. The ad markup (an HTML/JS snippet) is returned to the page and the creative renders.' },
            { name: 'Trackers fire', time: '~250 ms', note: 'The impression pixel fires → both sides count 1 impression. If the user later clicks, a click tracker fires. Spend recorded: $8.40 ÷ 1000 = $0.0084 for this one impression. Every number in every report was born this way.' },
          ],
        },
      },
      {
        kicker: 'Where support work begins',
        title: 'When something breaks, it breaks somewhere on that timeline',
        copy: 'Campaign not spending? Maybe it is losing auctions (bid too low), not seeing bid requests (targeting too narrow), or blocked before bidding (budget exhausted, creative not approved). Numbers not matching? Maybe the impression counted at phase 6 on one side but not the other. Support analysts translate "it’s broken" into <strong>which phase failed</strong>.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>No delivery</strong><span>Losing auctions, no matching requests, or campaign gated</span></div><div class="pa-anatomy-item"><strong>Low win rate</strong><span>Bids below the market’s clearing price</span></div><div class="pa-anatomy-item"><strong>Discrepancy</strong><span>Two systems counted phase 6 differently</span></div></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'In a first-price auction, TTD bids $8.40 CPM and the next bid is $6.10. What does TTD pay?',
        copy: 'The industry moved from second-price to first-price auctions around 2019 — interviewers like this one.',
        check: {
          choices: ['$8.40 CPM — the winner pays exactly what it bid', '$6.11 CPM — one cent above the second bid', 'Nothing until the user clicks'],
          answer: 0,
          explanation: 'Right. First-price = pay your bid. (Paying a penny above the runner-up was the old second-price model.) CPM is priced per 1,000 impressions regardless of clicks.',
        },
      },
    ],
  },
  {
    name: 'Money Math',
    outcome: 'Compute CPM, CPC, CPA, CTR, and ROAS from raw delivery numbers — fast and without notes.',
    job: 'Advanced Excel "drawing insights from large datasets" starts with fluency in these five formulas. They appear in tickets, dashboards, and interviews.',
    sprite: [2, 155],
    steps: [
      {
        kicker: 'The five metrics that run advertising',
        title: 'Everything is spend divided by something',
        copy: 'Advertising metrics look intimidating until you notice they are all one pattern: <strong>money ÷ events</strong>, or <strong>events ÷ events</strong>. Learn five and you can derive the rest.',
        demo: `<div class="pa-anatomy">
          <div class="pa-anatomy-item"><strong>CPM</strong><span>Cost per 1,000 impressions = spend ÷ impressions × 1000</span></div>
          <div class="pa-anatomy-item"><strong>CPC</strong><span>Cost per click = spend ÷ clicks</span></div>
          <div class="pa-anatomy-item"><strong>CPA</strong><span>Cost per acquisition = spend ÷ conversions</span></div>
          <div class="pa-anatomy-item"><strong>CTR</strong><span>Click-through rate = clicks ÷ impressions × 100</span></div>
          <div class="pa-anatomy-item"><strong>CVR</strong><span>Conversion rate = conversions ÷ clicks × 100</span></div>
          <div class="pa-anatomy-item"><strong>ROAS</strong><span>Return on ad spend = revenue ÷ spend</span></div>
        </div>`
      },
      {
        kicker: 'Interactive · do the math',
        title: 'Four drills with realistic campaign numbers',
        copy: 'A campaign delivered <strong>2,500,000 impressions</strong>, <strong>4,750 clicks</strong>, and <strong>190 conversions</strong>, spending <strong>$13,750</strong>, and drove <strong>$41,250</strong> in tracked revenue. Compute each metric — the same numbers an analyst would pull with the SQL you learned in the Gym.',
        widget: {
          type: 'calc',
          title: 'Metric drills — round to 2 decimals',
          drills: [
            { metric: 'CPM', question: 'What was the effective CPM in dollars?', placeholder: 'e.g. 4.20', answer: 5.5, formula: 'CPM = spend ÷ impressions × 1000 = 13750 ÷ 2,500,000 × 1000', explain: '$13,750 ÷ 2,500,000 × 1,000 = $5.50 per thousand impressions.' },
            { metric: 'CTR', question: 'What was the CTR as a percentage?', placeholder: 'e.g. 0.25', answer: 0.19, formula: 'CTR = clicks ÷ impressions × 100 = 4750 ÷ 2,500,000 × 100', explain: '4,750 ÷ 2,500,000 × 100 = 0.19%. Display CTRs usually live between 0.05% and 0.5%.' },
            { metric: 'CPA', question: 'What did each conversion cost, in dollars?', placeholder: 'e.g. 55.00', answer: 72.37, tolerance: 0.05, formula: 'CPA = spend ÷ conversions = 13750 ÷ 190', explain: '$13,750 ÷ 190 = $72.37 per conversion.' },
            { metric: 'ROAS', question: 'What was the ROAS (as a multiple, e.g. 2.5)?', placeholder: 'e.g. 2.5', answer: 3, formula: 'ROAS = revenue ÷ spend = 41250 ÷ 13750', explain: '$41,250 ÷ $13,750 = 3.0× — three dollars back per dollar spent.' },
          ],
        },
      },
      {
        kicker: 'Sanity ranges',
        title: 'Know what "normal" looks like so anomalies jump out',
        copy: 'Support analysts spot broken data by smell. A display CTR of <strong>9%</strong> is almost certainly click fraud or a mis-firing tracker, not a great campaign. A CPM of <strong>$0.02</strong> on premium streaming TV means something is mispriced. Typical open-internet ranges: display CPM $1–$10, video/CTV CPM $15–$45, display CTR 0.05–0.5%.',
        demo: `<div class="term-chips"><span class="term-chip">display CPM $1–$10</span><span class="term-chip">CTV CPM $15–$45</span><span class="term-chip">display CTR 0.05–0.5%</span><span class="term-chip">CTR 9% → investigate</span></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'A dashboard shows spend $600, impressions 0, clicks 12. What is your first instinct?',
        copy: 'Think like an analyst, not a calculator.',
        check: {
          choices: [
            'The data is broken — clicks cannot exceed impressions, and spend with zero impressions means a counting or join problem',
            'The campaign is performing incredibly well',
            'CPM must be $600',
          ],
          answer: 0,
          explanation: 'Correct. Impossible ratios (clicks with no impressions, spend with no delivery) are data-integrity signals — usually a bad join, a timezone gap, or delayed event ingestion.',
        },
      },
    ],
  },
  {
    name: 'Pixels, Tags & Identity',
    outcome: 'Read a tracking tag line by line, spot broken macros, and explain cookies vs UID2.',
    job: 'The listing’s bonus skills — "tracking tags, pixels, offline attribution" — plus the required "strong HTML experience" all live in this module.',
    sprite: [1, 37],
    steps: [
      {
        kicker: 'The HTML you actually need',
        title: 'A tracking pixel is just a tiny HTTP request wearing an HTML costume',
        copy: 'A <strong>pixel</strong> is a 1×1 invisible image (or a small script) placed on a page. When the browser loads it, it makes a request to a measurement server — and that request <em>is</em> the tracking event. Everything interesting rides in the URL’s query parameters.',
        demo: `<pre>&lt;img src="https://insight.adsrvr.org/track/pxl/?adv=<span class="code-val">kanto123</span>&amp;ct=<span class="code-val">signup</span>&amp;fmt=3"
     width="1" height="1" style="display:none"&gt;</pre><div class="pa-anatomy"><div class="pa-anatomy-item"><strong>adv=kanto123</strong><span>Which advertiser this event belongs to</span></div><div class="pa-anatomy-item"><strong>ct=signup</strong><span>Which conversion event fired (the tag’s name)</span></div><div class="pa-anatomy-item"><strong>1×1, hidden</strong><span>The user never sees it — only the request matters</span></div></div>`
      },
      {
        kicker: 'Macros — the #1 tag bug you will diagnose',
        title: 'Placeholders like %%CACHEBUSTER%% must be replaced before the browser sees them',
        copy: 'Ad tags contain <strong>macros</strong> — placeholders the ad server swaps for real values at serve time: a random number to defeat caching (<strong>cachebuster</strong>), the click-through URL, the creative ID. If a macro arrives in the browser unreplaced, tracking silently breaks: cached impressions undercount, clicks go nowhere. Spotting a literal <code>%%MACRO%%</code> in a URL is a support-analyst superpower.',
        widget: {
          type: 'tagInspect',
          title: 'Find the line that breaks this tag',
          brief: 'A client pasted this impression tag into their site and impressions are undercounting. One line is broken — click it.',
          lines: [
            '<img width="1" height="1" style="border-style:none"',
            '  alt="" ',
            '  src="https://ad.doubleclick.net/ddm/trackimp/N1234.567;',
            '       dc_trk_aid=5550001;dc_trk_cid=990001;',
            '       ord=%%CACHEBUSTER%%;dc_lat=;dc_rdid=;"',
            '/>',
          ],
          flawed: 4,
          explanation: 'Correct — ord=%%CACHEBUSTER%% was never replaced with a random number. Browsers cache the identical URL and repeated views stop counting, which undercounts impressions. The fix: the serving system must populate the macro (or the client must use the tag format their CMS supports).',
        },
      },
      {
        kicker: 'Identity · cookies and what replaced them',
        title: 'How platforms recognize the same user twice',
        copy: 'Historically, <strong>third-party cookies</strong> let ad platforms recognize users across sites (via <strong>cookie syncing</strong> between platforms). Privacy changes broke that model: Safari and Firefox block third-party cookies, and mobile/CTV never had them. The Trade Desk’s answer is <strong>Unified ID 2.0 (UID2)</strong> — an open-source ID built from a user’s hashed, encrypted email with consent controls. Frequency caps, audience targeting, and attribution all depend on identity working.',
        demo: `<div class="flow"><div class="flow-item"><strong>3P cookies</strong><span>Old default · blocked in most browsers</span></div><div class="flow-item"><strong>UID2</strong><span>Hashed email → encrypted, rotating ID · TTD-created, industry-run</span></div><div class="flow-item"><strong>Why support cares</strong><span>Broken identity → broken frequency caps, retargeting, and attribution tickets</span></div></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'A client’s conversion counts dropped to zero the day they redesigned their site. First hypothesis?',
        copy: 'Use what a pixel actually is.',
        check: {
          choices: [
            'The redesign removed or broke the conversion pixel, so the tracking request never fires',
            'The Trade Desk deleted their data',
            'Users suddenly stopped converting entirely, coincidentally that day',
          ],
          answer: 0,
          explanation: 'Exactly. A pixel only counts if the page actually loads it. Site redesigns are the classic cause of sudden zero-conversion tickets — verify the tag exists on the new page (browser DevTools → Network tab) before anything else.',
        },
      },
    ],
  },
  {
    name: 'Creatives & QA',
    outcome: 'Explain HTML5 creatives and clickTags, and predict why a creative gets rejected.',
    job: '"HTML5 creatives" and "creative review" tickets are named in the listing. This is the vocabulary for those conversations.',
    sprite: [3, 255],
    steps: [
      {
        kicker: 'What actually renders on the page',
        title: 'A modern display ad is a tiny zipped website',
        copy: 'An <strong>HTML5 creative</strong> is a ZIP file containing HTML, CSS, JS, and images that renders inside the ad slot’s iframe. Because it is real code, it can break like real code: missing assets, oversized files, insecure requests, or a broken <strong>clickTag</strong> — the variable the ad server injects so clicks route through its tracker before reaching the landing page.',
        demo: `<pre>&lt;script&gt;
  <span class="code-kw">var</span> clickTag = "<span class="code-val">%%CLICK_URL%%https://landing.example.com</span>";
&lt;/script&gt;
&lt;a href="javascript:window.open(clickTag)"&gt;
  &lt;!-- creative content --&gt;
&lt;/a&gt;</pre><div class="pa-anatomy"><div class="pa-anatomy-item"><strong>clickTag</strong><span>Click goes to the tracker first, then the landing page — that is how clicks get counted</span></div><div class="pa-anatomy-item"><strong>Hard-coded URL instead</strong><span>Clicks work but never count → "clicks discrepancy" ticket</span></div></div>`
      },
      {
        kicker: 'The rejection checklist',
        title: 'Five reasons creatives fail review, in the order you should check them',
        copy: 'Creative audits protect users and publishers. When a client asks "why was my creative rejected?", walk this list before escalating.',
        demo: `<div class="pa-anatomy">
          <div class="pa-anatomy-item"><strong>1 · No/broken clickTag</strong><span>Clicks would be untrackable</span></div>
          <div class="pa-anatomy-item"><strong>2 · Not SSL</strong><span>http:// assets on https:// pages get blocked by browsers</span></div>
          <div class="pa-anatomy-item"><strong>3 · Too heavy</strong><span>File size over spec (typical initial load ≤ 150–200 KB) hurts page speed</span></div>
          <div class="pa-anatomy-item"><strong>4 · Wrong size</strong><span>Creative dimensions must match the slot exactly (300×250 ≠ 300×600)</span></div>
          <div class="pa-anatomy-item"><strong>5 · Policy content</strong><span>Category restrictions: health claims, alcohol, gambling, etc.</span></div>
        </div>`
      },
      {
        kicker: 'Video & streaming TV in two minutes',
        title: 'CTV is TTD’s biggest story — know the words',
        copy: 'Video ads are delivered via <strong>VAST</strong> — an XML standard that tells the player which video file to fetch and which tracking events to fire (start, first-quartile, midpoint, complete). <strong>CTV (Connected TV)</strong> means streaming apps on smart TVs — no cookies, no clicks, full-screen, unskippable — measured by <strong>completion rate</strong> rather than CTR. The Trade Desk is the leading independent DSP for CTV, which is why this role’s tickets increasingly involve streaming campaigns.',
        demo: `<div class="term-chips"><span class="term-chip">VAST tag</span><span class="term-chip">quartile events</span><span class="term-chip">completion rate</span><span class="term-chip">CTV = no cookies, no clicks</span></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'A client’s HTML5 creative shows and clicks through to the site, but reported clicks are near zero. Most likely cause?',
        copy: 'Combine the clickTag lesson with the pixel lesson.',
        check: {
          choices: [
            'The creative hard-coded its landing page URL instead of using the clickTag, so clicks bypass the tracker',
            'Users are clicking but the internet is losing the traffic',
            'The campaign budget is too low to record clicks',
          ],
          answer: 0,
          explanation: 'Right. Working clicks + missing click counts = the click path skips the measurement redirect. The fix is rebuilding the creative to use the clickTag variable.',
        },
      },
    ],
  },
  {
    name: 'Discrepancy Detective',
    outcome: 'Run the standard investigation when two systems report different numbers.',
    job: '"Discrepancies" is a named bonus skill, and reporting-mismatch tickets are the daily bread of platform support.',
    sprite: [1, 59],
    steps: [
      {
        kicker: 'The most common ticket in AdTech',
        title: 'Two systems will almost never report identical numbers — the question is how different',
        copy: 'The client’s ad server says 1,000,000 impressions; the platform says 940,000. Who is wrong? Often <strong>neither</strong>. Systems count at different moments (bid won vs creative rendered vs viewable), filter bots differently, close their books in different timezones, and refresh on different schedules. The industry treats up to roughly <strong>10% variance</strong> as normal; beyond that, investigate.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>Count moment</strong><span>Served vs rendered vs viewable — each drops some events</span></div><div class="pa-anatomy-item"><strong>Filtering</strong><span>Bot/fraud filters differ by vendor</span></div><div class="pa-anatomy-item"><strong>Timezone</strong><span>UTC day vs America/New_York day splits midnight traffic</span></div><div class="pa-anatomy-item"><strong>Freshness</strong><span>One system is hours behind on ingestion</span></div></div>`
      },
      {
        kicker: 'The investigation, in order',
        title: 'Align definitions → align time → compare at the same grain → then judge',
        copy: 'Never declare a bug before this sequence: <strong>1)</strong> Confirm both numbers measure the same event (impressions? viewable impressions? unique users?). <strong>2)</strong> Align the date range and timezone. <strong>3)</strong> Compare at the same grain (campaign-day, not lifetime totals) to find <em>where</em> the gap starts. <strong>4)</strong> Compute the discrepancy: |A − B| ÷ B × 100. <strong>5)</strong> Only then escalate — with the exact slice where the numbers diverge.',
        widget: {
          type: 'calc',
          title: 'Discrepancy math',
          drills: [
            { metric: 'Discrepancy %', question: 'Client ad server: 1,000,000 impressions. Platform: 940,000. What is the discrepancy, as a % of the client’s number?', placeholder: 'e.g. 8.5', answer: 6, formula: '|1,000,000 − 940,000| ÷ 1,000,000 × 100', explain: '60,000 ÷ 1,000,000 = 6% — inside the ~10% industry norm. Explain the counting differences; no defect.' },
          ],
        },
      },
      {
        kicker: 'Attribution · who gets credit',
        title: 'Attribution windows silently create "missing conversions" tickets',
        copy: 'A <strong>conversion</strong> is credited to an ad by an <strong>attribution model</strong> within an <strong>attribution window</strong> — e.g. "last click, 30-day window" or "last view, 7-day window." Two systems with different models or windows will legitimately disagree on conversion counts. <strong>Offline attribution</strong> (matching in-store purchases to ads via uploaded transaction files) adds delay and duplicate risks — remember the duplicate <code>order_id</code> hunt in your capstone.',
        demo: `<div class="flow"><div class="flow-item"><strong>Impression day 0</strong><span>User sees the ad</span></div><div class="flow-item"><strong>Purchase day 6</strong><span>Inside a 7-day window → counted</span></div><div class="flow-item"><strong>Purchase day 9</strong><span>Outside the window → not counted, and that is correct behavior</span></div></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'Client: "Your platform shows 40 conversions; my analytics shows 90. Fix your bug." Your first move?',
        copy: 'This is a de-escalation moment and a methodology moment at once.',
        check: {
          choices: [
            'Compare definitions first: attribution model, window, and which events each system counts — then align time zones and grain before judging',
            'Agree the platform is broken and escalate to engineering immediately',
            'Tell the client their analytics is wrong',
          ],
          answer: 0,
          explanation: 'Correct. Site analytics counts every conversion from any source; the platform counts only ad-attributed conversions inside its window. Explaining that difference calmly resolves a huge share of these tickets with zero escalation.',
        },
      },
    ],
  },
];
