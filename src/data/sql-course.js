// SQL Gym content — ported verbatim from the original PokéSQL Academy course.
// Pokémon data cross-checked against PokeAPI. Sprites served from the PokeAPI sprite CDN.

const spriteUrl = (generation, id) => {
  const version = generation === 1 ? 'generation-i/red-blue' : generation === 2 ? 'generation-ii/crystal' : 'generation-iii/emerald';
  return `https://cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/versions/${version}/${id}.png`;
};

const pokemonDex = [
  { pokemon_id: 1, name: 'Bulbasaur', generation: 1, region: 'Kanto', primary_type: 'Grass', secondary_type: 'Poison', ability: 'Overgrow', base_experience: 64, height_m: 0.7, weight_kg: 6.9, hp: 45, attack: 49, defense: 49, special_attack: 65, special_defense: 65, speed: 45 },
  { pokemon_id: 25, name: 'Pikachu', generation: 1, region: 'Kanto', primary_type: 'Electric', secondary_type: null, ability: 'Static', base_experience: 112, height_m: 0.4, weight_kg: 6.0, hp: 35, attack: 55, defense: 40, special_attack: 50, special_defense: 50, speed: 90 },
  { pokemon_id: 94, name: 'Gengar', generation: 1, region: 'Kanto', primary_type: 'Ghost', secondary_type: 'Poison', ability: 'Cursed Body', base_experience: 225, height_m: 1.5, weight_kg: 40.5, hp: 60, attack: 65, defense: 60, special_attack: 130, special_defense: 75, speed: 110 },
  { pokemon_id: 133, name: 'Eevee', generation: 1, region: 'Kanto', primary_type: 'Normal', secondary_type: null, ability: 'Run Away', base_experience: 65, height_m: 0.3, weight_kg: 6.5, hp: 55, attack: 55, defense: 50, special_attack: 45, special_defense: 65, speed: 55 },
  { pokemon_id: 152, name: 'Chikorita', generation: 2, region: 'Johto', primary_type: 'Grass', secondary_type: null, ability: 'Overgrow', base_experience: 64, height_m: 0.9, weight_kg: 6.4, hp: 45, attack: 49, defense: 65, special_attack: 49, special_defense: 65, speed: 45 },
  { pokemon_id: 155, name: 'Cyndaquil', generation: 2, region: 'Johto', primary_type: 'Fire', secondary_type: null, ability: 'Blaze', base_experience: 62, height_m: 0.5, weight_kg: 7.9, hp: 39, attack: 52, defense: 43, special_attack: 60, special_defense: 50, speed: 65 },
  { pokemon_id: 158, name: 'Totodile', generation: 2, region: 'Johto', primary_type: 'Water', secondary_type: null, ability: 'Torrent', base_experience: 63, height_m: 0.6, weight_kg: 9.5, hp: 50, attack: 65, defense: 64, special_attack: 44, special_defense: 48, speed: 43 },
  { pokemon_id: 197, name: 'Umbreon', generation: 2, region: 'Johto', primary_type: 'Dark', secondary_type: null, ability: 'Synchronize', base_experience: 184, height_m: 1.0, weight_kg: 27.0, hp: 95, attack: 65, defense: 110, special_attack: 60, special_defense: 130, speed: 65 },
  { pokemon_id: 252, name: 'Treecko', generation: 3, region: 'Hoenn', primary_type: 'Grass', secondary_type: null, ability: 'Overgrow', base_experience: 62, height_m: 0.5, weight_kg: 5.0, hp: 40, attack: 45, defense: 35, special_attack: 65, special_defense: 55, speed: 70 },
  { pokemon_id: 255, name: 'Torchic', generation: 3, region: 'Hoenn', primary_type: 'Fire', secondary_type: null, ability: 'Blaze', base_experience: 62, height_m: 0.4, weight_kg: 2.5, hp: 45, attack: 60, defense: 40, special_attack: 70, special_defense: 50, speed: 45 },
  { pokemon_id: 258, name: 'Mudkip', generation: 3, region: 'Hoenn', primary_type: 'Water', secondary_type: null, ability: 'Torrent', base_experience: 62, height_m: 0.4, weight_kg: 7.6, hp: 50, attack: 70, defense: 50, special_attack: 50, special_defense: 50, speed: 40 },
  { pokemon_id: 376, name: 'Metagross', generation: 3, region: 'Hoenn', primary_type: 'Steel', secondary_type: 'Psychic', ability: 'Clear Body', base_experience: 270, height_m: 1.6, weight_kg: 550.0, hp: 80, attack: 135, defense: 130, special_attack: 95, special_defense: 90, speed: 70 }
];

pokemonDex.forEach((pokemon) => {
  pokemon.sprite = spriteUrl(pokemon.generation, pokemon.pokemon_id);
  pokemon.base_stat_total = pokemon.hp + pokemon.attack + pokemon.defense + pokemon.special_attack + pokemon.special_defense + pokemon.speed;
});

const pokemonRows = pokemonDex.slice(0, 4).map((pokemon) => [pokemon.pokemon_id, pokemon.name, pokemon.primary_type, pokemon.base_experience]);

const tableHtml = (headers, rows, highlightRow = -1) => `
  <div class="pa-table-wrap"><table><thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead>
  <tbody>${rows.map((row, index) => `<tr class="${index === highlightRow ? 'pa-highlight-row' : ''}">${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

const sqlModules = [
  {
    name: 'Pokédex Basics',
    outcome: 'Understand databases, tables, rows, columns, and values.',
    job: 'Support analysts must know what a record represents before trusting a query.',
    steps: [
      {
        kicker: 'Begin here · no prior knowledge required',
        title: 'A database is an organized collection of facts',
        copy: 'Imagine a digital Pokédex. Instead of storing everything in one paragraph, it organizes facts so a computer can find them reliably. A <strong>database</strong> holds related collections of data; each collection is usually a <strong>table</strong>.',
        demo: `<div class="pa-flow"><div class="pa-flow-item"><strong>Database</strong><span>Pokémon League records</span></div><div class="pa-flow-item"><strong>Table</strong><span>One organized collection, such as pokemon</span></div></div>`
      },
      {
        kicker: 'See the structure',
        title: 'Tables are made of rows and columns',
        copy: 'A <strong>row</strong> is one thing—in this table, one Pokémon. A <strong>column</strong> is one kind of fact, such as name or type. A <strong>cell</strong> is one value at the intersection.',
        demo: `${tableHtml(['pokemon_id', 'name', 'type', 'base_xp'], pokemonRows, 0)}<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>Row</strong><span>Pikachu and all its facts</span></div><div class="pa-anatomy-item"><strong>Column</strong><span>type for every Pokémon</span></div><div class="pa-anatomy-item"><strong>Cell</strong><span>Electric is Pikachu's type</span></div></div>`
      },
      {
        kicker: 'Mastery check · everything was just taught',
        title: 'In the Pokémon table, what does one row represent?',
        copy: 'Choose the answer that matches the table you just explored.',
        check: {
          choices: ['One Pokémon and its facts', 'One column name', 'The entire database'],
          answer: 0,
          explanation: 'Exactly. The table’s grain is one row per Pokémon.'
        }
      }
    ]
  },
  {
    name: 'Your First Query',
    outcome: 'Read a simple SELECT ... FROM query in plain English.',
    job: 'Most support investigations begin by retrieving a small, relevant set of columns.',
    steps: [
      {
        kicker: 'New tool · SELECT',
        title: 'A query is a question you ask the database',
        copy: '<strong>SELECT</strong> says which columns you want. <strong>FROM</strong> says which table contains them. SQL keywords are often capitalized for readability, but meaning matters more than capitalization.',
        demo: `<pre><span class="pa-code-keyword">SELECT</span> <span class="pa-code-name">name, primary_type</span>\n<span class="pa-code-keyword">FROM</span> <span class="pa-code-name">pokemon</span>;</pre><div class="pa-anatomy"><div class="pa-anatomy-item"><strong>SELECT name, primary_type</strong><span>Show these two columns</span></div><div class="pa-anatomy-item"><strong>FROM pokemon</strong><span>Read the pokemon table</span></div><div class="pa-anatomy-item"><strong>;</strong><span>End the statement</span></div></div>`
      },
      {
        kicker: 'Run before you are tested',
        title: 'Watch your first query return a result set',
        copy: 'A <strong>result set</strong> is the temporary table returned by a query. This query does not change the database—it only reads it.',
        query: {
          sql: 'SELECT name, primary_type\nFROM pokemon;',
          headers: ['name', 'primary_type'],
          rows: pokemonRows.map((r) => [r[1], r[2]])
        }
      },
      {
        kicker: 'Mastery check',
        title: 'What does SELECT name, primary_type mean?',
        copy: 'Translate the SQL into plain English.',
        check: {
          choices: ['Return the name and primary_type columns', 'Delete the name and primary_type columns', 'Sort every Pokémon by primary_type'],
          answer: 0,
          explanation: 'Correct. SELECT chooses the columns returned by the query.'
        }
      }
    ]
  },
  {
    name: 'Filter the Pokédex',
    outcome: 'Use WHERE, comparison operators, and NULL safely.',
    job: 'A support query should isolate the affected client, campaign, ticket, or time window.',
    steps: [
      {
        kicker: 'New tool · WHERE',
        title: 'WHERE keeps only rows that meet a condition',
        copy: 'First SQL chooses columns with SELECT. Then it reads a table with FROM. <strong>WHERE</strong> narrows the rows. Text values use quotes.',
        demo: `<pre><span class="pa-code-keyword">SELECT</span> <span class="pa-code-name">name, primary_type</span>\n<span class="pa-code-keyword">FROM</span> <span class="pa-code-name">pokemon</span>\n<span class="pa-code-keyword">WHERE</span> <span class="pa-code-name">primary_type</span> = <span class="pa-code-value">'Electric'</span>;</pre>`
      },
      {
        kicker: 'Important edge case',
        title: 'NULL means missing or unknown—not an empty string',
        copy: 'Use <strong>IS NULL</strong> and <strong>IS NOT NULL</strong>. The expression = NULL does not work because SQL cannot prove equality to an unknown value.',
        demo: `<pre><span class="pa-code-keyword">SELECT</span> <span class="pa-code-name">ticket_id</span>\n<span class="pa-code-keyword">FROM</span> <span class="pa-code-name">support_tickets</span>\n<span class="pa-code-keyword">WHERE</span> <span class="pa-code-name">resolved_at</span> <span class="pa-code-keyword">IS NULL</span>;</pre>`
      },
      {
        kicker: 'Run the filtered query',
        title: 'Ask for Electric Pokémon only',
        copy: 'The result keeps the same selected columns but returns fewer rows.',
        query: {
          sql: "SELECT name, primary_type\nFROM pokemon\nWHERE primary_type = 'Electric';",
          headers: ['name', 'primary_type'],
          rows: [['Pikachu', 'Electric']]
        }
      },
      {
        kicker: 'Mastery check',
        title: 'Which condition finds unresolved tickets?',
        copy: 'You have learned that unresolved tickets have no resolved_at value.',
        check: {
          choices: ['resolved_at = NULL', 'resolved_at IS NULL', 'resolved_at = 0'],
          answer: 1,
          explanation: 'Correct. IS NULL is the SQL-safe test for a missing value.'
        }
      }
    ]
  },
  {
    name: 'Sort & Shape',
    outcome: 'Use ORDER BY, LIMIT, DISTINCT, aliases, and CASE.',
    job: 'Triage often means finding the newest, highest-priority, or most expensive records first.',
    steps: [
      {
        kicker: 'New tools · ORDER BY and LIMIT',
        title: 'Sort the rows, then choose how many to return',
        copy: '<strong>ORDER BY base_xp DESC</strong> puts the highest XP first. <strong>LIMIT 2</strong> keeps the first two rows after sorting.',
        demo: `<pre><span class="pa-code-keyword">SELECT</span> <span class="pa-code-name">name, base_xp</span>\n<span class="pa-code-keyword">FROM</span> <span class="pa-code-name">pokemon</span>\n<span class="pa-code-keyword">ORDER BY</span> <span class="pa-code-name">base_xp</span> <span class="pa-code-keyword">DESC</span>\n<span class="pa-code-keyword">LIMIT</span> <span class="pa-code-value">2</span>;</pre>`
      },
      {
        kicker: 'Shape readable results',
        title: 'DISTINCT removes duplicates; aliases rename output; CASE labels conditions',
        copy: 'These tools make results easier to interpret without changing the underlying records.',
        demo: `<pre><span class="pa-code-keyword">SELECT DISTINCT</span> <span class="pa-code-name">primary_type</span>\n<span class="pa-code-keyword">FROM</span> <span class="pa-code-name">pokemon</span>\n<span class="pa-code-keyword">ORDER BY</span> <span class="pa-code-name">primary_type</span>;</pre>`
      },
      {
        kicker: 'New tool · CASE',
        title: 'CASE writes custom rules and custom sort orders',
        copy: 'A <strong>CASE expression</strong> outputs a value based on conditions — SQL’s if/else. Support classic: sort tickets P1 → P2 → P3 by urgency logic, not alphabet luck. Your capstone tests exactly this pattern.',
        query: {
          sql: "SELECT ticket_id, priority,\n  CASE priority\n    WHEN 'P1' THEN 1\n    WHEN 'P2' THEN 2\n    ELSE 3\n  END AS urgency_rank\nFROM support_tickets\nORDER BY urgency_rank, opened_at;"
        }
      },
      {
        kicker: 'Mastery check',
        title: 'Which clause puts newest tickets first?',
        copy: 'Assume opened_at stores the time each ticket was created.',
        check: {
          choices: ['ORDER BY opened_at DESC', 'WHERE opened_at DESC', 'LIMIT opened_at'],
          answer: 0,
          explanation: 'Correct. ORDER BY sorts, and DESC places the newest timestamps first.'
        }
      }
    ]
  },
  {
    name: 'Relationships & Keys',
    outcome: 'Understand primary keys, foreign keys, and table grain.',
    job: 'Keys and grain prevent duplicated metrics and incorrect incident conclusions.',
    steps: [
      {
        kicker: 'Before joins, learn why tables connect',
        title: 'A primary key identifies one row uniquely',
        copy: 'pokemon_id is the Pokémon table’s <strong>primary key</strong>. No two Pokémon rows should share it. A <strong>foreign key</strong> stores another table’s primary key so records can be related.',
        demo: `<div class="pa-joins"><div class="pa-join-card is-focus"><strong>pokemon</strong><span>pokemon_id PK · name · primary_type</span></div><div class="pa-join-card"><strong>captures</strong><span>capture_id PK · pokemon_id FK · trainer_id FK</span></div></div>`
      },
      {
        kicker: 'The hidden question behind every query',
        title: 'Grain means what one row represents',
        copy: 'The pokemon table has one row per Pokémon. The captures table has one row per capture. Joining them can create several rows for one Pokémon if it was captured by several trainers.',
        demo: `<div class="pa-flow"><div class="pa-flow-item"><strong>pokemon grain</strong><span>one row per Pokémon</span></div><div class="pa-flow-item"><strong>captures grain</strong><span>one row per capture event</span></div></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'What does one captures row represent?',
        copy: 'Use the grain stated in the lesson.',
        check: {
          choices: ['One Pokémon species', 'One capture event', 'One database'],
          answer: 1,
          explanation: 'Correct. Grain tells you what each row means before you combine or aggregate data.'
        }
      }
    ]
  },
  {
    name: 'Join Tables',
    outcome: 'Learn INNER JOIN and LEFT JOIN before choosing between them.',
    job: 'Platform support constantly combines accounts, campaigns, tickets, and event tables.',
    steps: [
      {
        kicker: 'New tool · JOIN',
        title: 'A join combines related rows using matching keys',
        copy: 'The ON clause states the relationship. Here, captures.trainer_id matches trainers.trainer_id. The join type decides what happens when no matching row exists.',
        demo: `<pre><span class="pa-code-keyword">SELECT</span> <span class="pa-code-name">trainers.name, captures.pokemon_id</span>\n<span class="pa-code-keyword">FROM</span> <span class="pa-code-name">trainers</span>\n<span class="pa-code-keyword">JOIN</span> <span class="pa-code-name">captures</span>\n  <span class="pa-code-keyword">ON</span> <span class="pa-code-name">trainers.trainer_id = captures.trainer_id</span>;</pre>`
      },
      {
        kicker: 'Join type 1 · INNER JOIN',
        title: 'INNER JOIN keeps only matching rows',
        copy: 'If Misty has a capture, she appears. If Brock has no capture, he is omitted. Use this when the question requires a match on both sides.',
        demo: `<div class="pa-joins"><div class="pa-join-card is-focus"><strong>Kept</strong><span>Ash → Pikachu · Misty → Squirtle</span></div><div class="pa-join-card"><strong>Omitted</strong><span>Brock → no matching capture</span></div></div>`
      },
      {
        kicker: 'Join type 2 · LEFT JOIN',
        title: 'LEFT JOIN keeps every row from the left table',
        copy: 'Starting FROM trainers means every trainer remains. Trainers without a capture receive NULL values for capture columns. Use this for questions containing “every,” “including zero,” or “even if none.”',
        demo: `<div class="pa-joins"><div class="pa-join-card is-focus"><strong>Kept with match</strong><span>Ash → Pikachu · Misty → Squirtle</span></div><div class="pa-join-card is-focus"><strong>Kept without match</strong><span>Brock → NULL</span></div></div>`
      },
      {
        kicker: 'Trade Desk translation',
        title: 'The business question chooses the join',
        copy: '“Tickets that have an account” can use INNER JOIN. “Every client, including clients with zero tickets” needs LEFT JOIN from clients to tickets.',
        demo: `<div class="pa-joins"><div class="pa-join-card"><strong>INNER JOIN</strong><span>Only entities with matches</span></div><div class="pa-join-card is-focus"><strong>LEFT JOIN</strong><span>All left-side entities, even with no match</span></div></div>`
      },
      {
        kicker: 'Mastery check · now the terms are familiar',
        title: 'You need every trainer, including trainers with no captures. Which join should you start with?',
        copy: 'Start FROM trainers and choose the join whose behavior matches “every trainer.”',
        check: {
          choices: ['INNER JOIN captures', 'LEFT JOIN captures', 'CROSS JOIN captures'],
          answer: 1,
          explanation: 'Correct. LEFT JOIN preserves every trainer and uses NULL when no capture matches.'
        }
      }
    ]
  },
  {
    name: 'Summarize Data',
    outcome: 'Use aggregates, GROUP BY, HAVING, and safe ratios.',
    job: 'Support teams need ticket volume, SLA compliance, failure rate, and client-impact metrics.',
    steps: [
      {
        kicker: 'New tools · aggregates',
        title: 'Aggregate functions turn many rows into measurements',
        copy: 'COUNT counts rows, SUM adds values, AVG finds a mean, and MIN/MAX find extremes. GROUP BY chooses the category for each measurement.',
        demo: `<pre><span class="pa-code-keyword">SELECT</span> <span class="pa-code-name">primary_type, COUNT(*) AS pokemon_count</span>\n<span class="pa-code-keyword">FROM</span> <span class="pa-code-name">pokemon</span>\n<span class="pa-code-keyword">GROUP BY</span> <span class="pa-code-name">primary_type</span>;</pre>`
      },
      {
        kicker: 'Rows versus groups',
        title: 'WHERE filters rows; HAVING filters completed groups',
        copy: 'Use WHERE before grouping. Use HAVING when the condition depends on an aggregate such as COUNT(*) or SUM(cost).',
        demo: `<pre><span class="pa-code-keyword">HAVING</span> <span class="pa-code-name">COUNT(*)</span> &gt; <span class="pa-code-value">5</span></pre>`
      },
      {
        kicker: 'The ratio trap',
        title: 'NULLIF keeps division from exploding on zero',
        copy: 'Metrics are ratios, and denominators hit zero constantly (a campaign day with zero impressions). <strong>x / NULLIF(y, 0)</strong> turns a zero denominator into NULL — the honest answer — instead of an error or infinity. <strong>COALESCE(value, 0)</strong> does the reverse: replaces NULL with a default when you need one. Run it — campaign 2005 has a zero-impression day.',
        query: {
          sql: "SELECT campaign_id, event_date,\n  ROUND(100.0 * clicks / NULLIF(impressions, 0), 2) AS ctr_pct\nFROM ad_events_daily\nORDER BY campaign_id, event_date;"
        }
      },
      {
        kicker: 'Mastery check',
        title: 'Which clause keeps only priorities with more than five tickets?',
        copy: 'The condition depends on COUNT(*), so it applies after grouping.',
        check: {
          choices: ['WHERE COUNT(*) > 5', 'HAVING COUNT(*) > 5', 'ORDER BY COUNT(*) > 5'],
          answer: 1,
          explanation: 'Correct. HAVING filters the grouped result after COUNT is calculated.'
        }
      }
    ]
  },
  {
    name: 'Advanced Patterns',
    outcome: 'Use CTEs and window functions for readable investigations.',
    job: 'Latest status, deduplication, rankings, and time comparisons are common support patterns.',
    steps: [
      {
        kicker: 'New tool · CTE',
        title: 'A CTE gives one step of a complex query a name',
        copy: 'WITH creates a temporary named result used by the query that follows. It improves readability and makes investigation logic easier to validate.',
        demo: `<pre><span class="pa-code-keyword">WITH</span> <span class="pa-code-name">open_tickets</span> <span class="pa-code-keyword">AS</span> (\n  <span class="pa-code-keyword">SELECT</span> * <span class="pa-code-keyword">FROM</span> support_tickets\n  <span class="pa-code-keyword">WHERE</span> resolved_at <span class="pa-code-keyword">IS NULL</span>\n)\n<span class="pa-code-keyword">SELECT</span> * <span class="pa-code-keyword">FROM</span> open_tickets;</pre>`
      },
      {
        kicker: 'New tool · window function',
        title: 'ROW_NUMBER can identify the latest row per entity',
        copy: 'PARTITION BY restarts numbering for each campaign. ORDER BY event_at DESC numbers the newest event as 1.',
        demo: `<pre><span class="pa-code-keyword">ROW_NUMBER()</span> <span class="pa-code-keyword">OVER</span> (\n  <span class="pa-code-keyword">PARTITION BY</span> campaign_id\n  <span class="pa-code-keyword">ORDER BY</span> event_at <span class="pa-code-keyword">DESC</span>\n)</pre>`
      },
      {
        kicker: 'Run the full pattern',
        title: 'Latest-row-per-entity, the pattern interviews love',
        copy: 'A CTE plus ROW_NUMBER, then keep rank 1. This exact shape answers "current status of every campaign," "most recent ticket per client," and "latest file per upload." Your in-browser lab runs real SQLite, so this executes for real.',
        query: {
          sql: "WITH ranked AS (\n  SELECT campaign_id, event_date, spend_usd,\n    ROW_NUMBER() OVER (\n      PARTITION BY campaign_id\n      ORDER BY event_date DESC\n    ) AS rn\n  FROM ad_events_daily\n)\nSELECT campaign_id, event_date, spend_usd\nFROM ranked\nWHERE rn = 1\nORDER BY campaign_id;"
        }
      },
      {
        kicker: 'The window family',
        title: 'RANK, LAG, and running totals — recognize the whole family',
        copy: '<strong>RANK()</strong> is ROW_NUMBER with ties sharing a rank. <strong>LAG(col)</strong> reads the previous row — perfect for day-over-day spend change. <strong>SUM(col) OVER (ORDER BY date)</strong> builds a running total for budget pacing. You do not need mastery of all of them — you need to recognize them and reach for the right one.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>ROW_NUMBER()</strong><span>Unique 1,2,3… per partition — dedupe & latest-row</span></div><div class="pa-anatomy-item"><strong>RANK()</strong><span>Ties share a rank — leaderboards</span></div><div class="pa-anatomy-item"><strong>LAG(spend)</strong><span>Previous row’s value — day-over-day deltas</span></div><div class="pa-anatomy-item"><strong>SUM() OVER (ORDER BY …)</strong><span>Running total — budget pacing</span></div></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'Which value identifies the newest event after numbering newest-first?',
        copy: 'ROW_NUMBER starts at 1 inside each campaign.',
        check: {
          choices: ['row_number = 0', 'row_number = 1', 'row_number IS NULL'],
          answer: 1,
          explanation: 'Correct. The newest row receives row_number 1 in each campaign partition.'
        }
      }
    ]
  },
  {
    name: 'Support Investigations',
    outcome: 'Validate data, calculate SLAs, and debug incorrect results.',
    job: 'This is the core operating loop for platform incidents and client escalations.',
    steps: [
      {
        kicker: 'Investigation loop',
        title: 'Define the grain, scope, and expected result before querying',
        copy: 'Write down the affected entity, exact time window, timezone, expected behavior, and comparison source. Then query the smallest useful slice.',
        demo: `<div class="pa-flow"><div class="pa-flow-item"><strong>1 · Scope</strong><span>client · campaign · time · timezone</span></div><div class="pa-flow-item"><strong>2 · Query</strong><span>smallest relevant data slice</span></div><div class="pa-flow-item"><strong>3 · Validate</strong><span>counts · duplicates · freshness · grain</span></div><div class="pa-flow-item"><strong>4 · Communicate</strong><span>finding · impact · next action</span></div></div>`
      },
      {
        kicker: 'Common failure mode',
        title: 'A join can inflate metrics without producing an error',
        copy: 'If both sides contain several rows per join key, one row can match many rows. Compare row counts before and after joins and aggregate each table to the needed grain first.',
        demo: `<div class="pa-joins"><div class="pa-join-card"><strong>Before join</strong><span>10 campaigns</span></div><div class="pa-join-card is-focus"><strong>After join</strong><span>40 event rows—correct only if that grain is intended</span></div></div>`
      },
      {
        kicker: 'Time math · the SLA question',
        title: 'Date arithmetic turns timestamps into SLA answers',
        copy: 'SLA reporting is "how long did this take?" In SQLite the trick is <strong>julianday()</strong> — days as a decimal, so hours = difference × 24. Other dialects say the same thing differently: PostgreSQL subtracts timestamps or uses <strong>DATE_TRUNC</strong>, SQL Server uses <strong>DATEDIFF(hour, a, b)</strong>. Learn the concept once; look up the dialect spelling on the day.',
        query: {
          sql: "SELECT ticket_id, priority,\n  ROUND((julianday(resolved_at) - julianday(opened_at)) * 24, 1)\n    AS hours_to_resolve\nFROM support_tickets\nWHERE resolved_at IS NOT NULL\nORDER BY hours_to_resolve DESC;"
        }
      },
      {
        kicker: 'Mastery check',
        title: 'A join unexpectedly doubles SUM(cost). What should you inspect first?',
        copy: 'The query runs, but the metric may be wrong.',
        check: {
          choices: ['Join cardinality and table grain', 'Whether keywords are uppercase', 'The result font size'],
          answer: 0,
          explanation: 'Correct. Validate grain and one-to-many or many-to-many relationships before trusting the sum.'
        }
      }
    ]
  },
  {
    name: 'Procedures & Dialects',
    outcome: 'Execute stored procedures safely and recognize SQL dialect differences.',
    job: 'The role explicitly includes executing stored procedures; Vertica and SSMS are listed as useful experience.',
    steps: [
      {
        kicker: 'Stored procedures',
        title: 'A stored procedure is a named database routine',
        copy: 'It can read or change data. Before execution, verify the environment, procedure name, parameters, permissions, expected side effects, validation query, and rollback or escalation path.',
        demo: `<div class="pa-flow"><div class="pa-flow-item"><strong>Before</strong><span>scope · parameters · current state</span></div><div class="pa-flow-item"><strong>During</strong><span>CALL or EXEC · capture outcome</span></div><div class="pa-flow-item"><strong>After</strong><span>validate · document · escalate if needed</span></div><div class="pa-flow-item"><strong>Safety</strong><span>never guess production parameters</span></div></div>`
      },
      {
        kicker: 'Dialect awareness',
        title: 'The idea stays stable while syntax can change',
        copy: 'PostgreSQL often uses LIMIT; SQL Server commonly uses TOP; Vertica is optimized for large analytical workloads. Learn portable SQL first, then verify dialect-specific syntax.',
        demo: `<div class="pa-anatomy"><div class="pa-anatomy-item"><strong>PostgreSQL</strong><span>LIMIT · ILIKE · DATE_TRUNC</span></div><div class="pa-anatomy-item"><strong>SQL Server</strong><span>TOP · EXEC · DATEADD</span></div><div class="pa-anatomy-item"><strong>Vertica</strong><span>analytical SQL · CALL · projections</span></div></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'What should happen before a production procedure is executed?',
        copy: 'Choose the operationally safe answer.',
        check: {
          choices: ['Verify environment, parameters, effects, and validation plan', 'Run it first and inspect later', 'Guess missing parameters from memory'],
          answer: 0,
          explanation: 'Correct. Safe execution starts with verified scope, parameters, impact, and a way to confirm success.'
        }
      }
    ]
  },
  {
    name: 'AdTech Data',
    outcome: 'Reason about campaigns, impressions, clicks, conversions, spend, and attribution.',
    job: 'The posting expects AdTech fluency alongside SQL and troubleshooting.',
    steps: [
      {
        kicker: 'Event data has a grain',
        title: 'One ad event is not the same as one campaign',
        copy: 'A campaign can generate millions of impression rows. Always identify whether a table is one row per campaign, per event, per user, or per reporting interval before joining.',
        demo: `<div class="pa-flow"><div class="pa-flow-item"><strong>Campaign</strong><span>budget and targeting configuration</span></div><div class="pa-flow-item"><strong>Impression</strong><span>an ad was served</span></div><div class="pa-flow-item"><strong>Click</strong><span>a user interacted</span></div><div class="pa-flow-item"><strong>Conversion</strong><span>a measured outcome occurred</span></div></div>`
      },
      {
        kicker: 'Discrepancy thinking',
        title: 'Differences can come from time, definitions, identity, or data freshness',
        copy: 'Before declaring a platform defect, compare timezone, attribution window, event deduplication, filters, report freshness, and metric definitions.',
        demo: `<div class="pa-terms"><span class="pa-term">timezone</span><span class="pa-term">attribution window</span><span class="pa-term">deduplication</span><span class="pa-term">filters</span><span class="pa-term">freshness</span><span class="pa-term">metric definition</span></div>`
      },
      {
        kicker: 'Mastery check',
        title: 'A client reports fewer conversions than your dashboard. What should you compare first?',
        copy: 'Choose the answer that establishes whether both sides measure the same thing.',
        check: {
          choices: ['Definitions, time window, timezone, filters, and attribution window', 'Only the campaign name', 'Only whether SQL keywords are uppercase'],
          answer: 0,
          explanation: 'Correct. Align scope and definitions before treating a discrepancy as a defect.'
        }
      }
    ]
  },
  {
    name: 'Trade Desk Simulation',
    outcome: 'Combine SQL, troubleshooting, safety, and client communication under time pressure.',
    job: 'The final badge mirrors the role: investigate accurately, act safely, and explain clearly.',
    steps: [
      {
        kicker: 'Interview framework',
        title: 'Say your assumptions before writing SQL',
        copy: 'Clarify table grain, keys, NULL behavior, time boundaries, timezone, and whether the task is read-only. Interviewers can then follow your reasoning even before the query is complete.',
        demo: `<div class="pa-flow"><div class="pa-flow-item"><strong>Clarify</strong><span>what exactly are we measuring?</span></div><div class="pa-flow-item"><strong>Plan</strong><span>tables · keys · grain · filters</span></div><div class="pa-flow-item"><strong>Query</strong><span>build and validate in steps</span></div><div class="pa-flow-item"><strong>Explain</strong><span>finding · confidence · next action</span></div></div>`
      },
      {
        kicker: 'Final communication pattern',
        title: 'Translate the query into impact and action',
        copy: 'A strong update states what happened, who or what is affected, the evidence, any uncertainty, the immediate remedy, and the owner of the next step.',
        demo: `<div class="pa-job-link"><strong>Example:</strong> Delivery continued, but reporting events arrived approximately three hours late. The issue affects dashboard freshness, not campaign serving. Engineering is investigating ingestion latency; the next update is scheduled for 2:00 PM PT.</div>`
      },
      {
        kicker: 'Readiness gate',
        title: 'What is the strongest first response to a spend discrepancy?',
        copy: 'Use the complete investigation framework you have built.',
        check: {
          choices: ['Clarify scope and definitions, inspect grain and freshness, then query and validate', 'Immediately execute a production procedure', 'Assume the dashboard is wrong'],
          answer: 0,
          explanation: 'Correct. That sequence combines analytical rigor, operational safety, and clear support judgment.'
        }
      }
    ]
  }
];

const mentorIds = [1, 25, 133, 94, 152, 158, 155, 197, 252, 255, 258, 376];
sqlModules.forEach((module, index) => { module.mentorId = mentorIds[index]; });

const trainers = [
  { trainer_id: 1, name: 'Ash', region: 'Kanto', trainer_rank: 'Ace' },
  { trainer_id: 2, name: 'Misty', region: 'Kanto', trainer_rank: 'Gym Leader' },
  { trainer_id: 3, name: 'Brock', region: 'Kanto', trainer_rank: 'Gym Leader' },
  { trainer_id: 4, name: 'Kris', region: 'Johto', trainer_rank: 'Trainer' },
  { trainer_id: 5, name: 'May', region: 'Hoenn', trainer_rank: 'Coordinator' }
];

const captures = [
  { capture_id: 101, trainer_id: 1, pokemon_id: 25, nickname: 'Sparky', caught_at: '2026-01-03' },
  { capture_id: 102, trainer_id: 1, pokemon_id: 1, nickname: null, caught_at: '2026-01-08' },
  { capture_id: 103, trainer_id: 2, pokemon_id: 158, nickname: 'Chomps', caught_at: '2026-02-12' },
  { capture_id: 104, trainer_id: 4, pokemon_id: 152, nickname: null, caught_at: '2026-03-01' },
  { capture_id: 105, trainer_id: 5, pokemon_id: 252, nickname: 'Twig', caught_at: '2026-03-18' },
  { capture_id: 106, trainer_id: 5, pokemon_id: 255, nickname: null, caught_at: '2026-03-21' }
];

const advertisers = [
  { advertiser_id: 101, name: 'Kanto Outdoor Co', vertical: 'Retail', timezone: 'America/Los_Angeles' },
  { advertiser_id: 102, name: 'Johto Health Labs', vertical: 'Healthcare', timezone: 'America/Chicago' },
  { advertiser_id: 103, name: 'Hoenn Air', vertical: 'Travel', timezone: 'America/New_York' }
];

const campaigns = [
  { campaign_id: 2001, advertiser_id: 101, name: 'Trail Gear Prospecting', status: 'active', daily_budget: 1200 },
  { campaign_id: 2002, advertiser_id: 101, name: 'Backpack Retargeting', status: 'active', daily_budget: 650 },
  { campaign_id: 2003, advertiser_id: 102, name: 'Wellness Awareness', status: 'active', daily_budget: 900 },
  { campaign_id: 2004, advertiser_id: 103, name: 'Autumn Routes', status: 'paused', daily_budget: 1500 },
  { campaign_id: 2005, advertiser_id: 103, name: 'Weekend Escape', status: 'active', daily_budget: 800 }
];

const adEvents = [
  { event_date: '2026-08-01', campaign_id: 2001, exchange_name: 'OpenX', impressions: 125000, clicks: 1430, conversions: 62, spend_usd: 711.45 },
  { event_date: '2026-08-01', campaign_id: 2001, exchange_name: 'PubMatic', impressions: 83000, clicks: 804, conversions: 31, spend_usd: 421.18 },
  { event_date: '2026-08-01', campaign_id: 2002, exchange_name: 'OpenX', impressions: 61000, clicks: 1098, conversions: 84, spend_usd: 389.22 },
  { event_date: '2026-08-01', campaign_id: 2003, exchange_name: 'Index Exchange', impressions: 210000, clicks: 1260, conversions: 9, spend_usd: 873.64 },
  { event_date: '2026-08-01', campaign_id: 2004, exchange_name: 'PubMatic', impressions: 145000, clicks: 1870, conversions: 44, spend_usd: 1124.20 },
  { event_date: '2026-08-02', campaign_id: 2005, exchange_name: 'OpenX', impressions: 0, clicks: 0, conversions: 0, spend_usd: 0 },
  { event_date: '2026-08-03', campaign_id: 2005, exchange_name: 'OpenX', impressions: 11000, clicks: 98, conversions: 1, spend_usd: 72.18 }
];

const supportTickets = [
  { ticket_id: 5001, advertiser_id: 103, campaign_id: 2005, priority: 'P1', category: 'campaign_delivery', opened_at: '2026-08-02 08:05', resolved_at: '2026-08-02 10:40' },
  { ticket_id: 5002, advertiser_id: 102, campaign_id: 2003, priority: 'P2', category: 'reporting_discrepancy', opened_at: '2026-08-03 07:42', resolved_at: null },
  { ticket_id: 5003, advertiser_id: 101, campaign_id: 2001, priority: 'P2', category: 'offline_attribution', opened_at: '2026-08-03 09:15', resolved_at: null },
  { ticket_id: 5004, advertiser_id: 101, campaign_id: 2002, priority: 'P3', category: 'pixel_validation', opened_at: '2026-08-01 15:25', resolved_at: '2026-08-02 11:10' },
  { ticket_id: 5005, advertiser_id: 103, campaign_id: 2005, priority: 'P2', category: 'creative_review', opened_at: '2026-08-04 08:10', resolved_at: null },
  { ticket_id: 5006, advertiser_id: 103, campaign_id: 2004, priority: 'P3', category: 'access', opened_at: '2026-08-02 12:00', resolved_at: '2026-08-02 16:30' }
];

const procedureAudit = [
  { audit_id: 1, procedure_name: 'refresh_campaign_report', environment: 'staging', result: 'success', executed_at: '2026-08-01 10:00' },
  { audit_id: 2, procedure_name: 'reprocess_offline_conversions', environment: 'production', result: 'success', executed_at: '2026-08-02 06:30' },
  { audit_id: 3, procedure_name: 'refresh_campaign_report', environment: 'staging', result: 'failed', executed_at: '2026-08-03 11:15' }
];

const getValue = (row, key) => {
  const match = Object.keys(row || {}).find((candidate) => candidate.toLowerCase() === key.toLowerCase());
  return match ? row[match] : undefined;
};

const labChallenges = [
  {
    title: 'Open the Pokédex table',
    prompt: 'Return every column and every Pokémon row. Before running it, predict the table grain.',
    starter: 'SELECT ???\nFROM pokemon;',
    solution: 'SELECT *\nFROM pokemon;',
    hint: 'SELECT * means every column. FROM names the table.',
    schema: ['pokemon · one row per Pokémon'],
    validate: (rows) => rows.length === 12 && getValue(rows[0], 'pokemon_id') !== undefined
  },
  {
    title: 'Choose two columns',
    prompt: 'Return only name and primary_type for all 12 Pokémon.',
    starter: 'SELECT ???, ???\nFROM pokemon;',
    solution: 'SELECT name, primary_type\nFROM pokemon;',
    hint: 'Place both column names after SELECT, separated by a comma.',
    schema: ['pokemon(name, primary_type)'],
    validate: (rows) => rows.length === 12 && getValue(rows[0], 'name') !== undefined && getValue(rows[0], 'primary_type') !== undefined
  },
  {
    title: 'Filter to Generation I',
    prompt: 'Return name and generation for only Kanto’s Generation I Pokémon.',
    starter: 'SELECT name, generation\nFROM pokemon\nWHERE ??? = ???;',
    solution: 'SELECT name, generation\nFROM pokemon\nWHERE generation = 1;',
    hint: 'WHERE keeps rows that satisfy a condition.',
    schema: ['pokemon(generation)'],
    validate: (rows) => rows.length === 4 && rows.every((row) => Number(getValue(row, 'generation')) === 1)
  },
  {
    title: 'Find the XP leaders',
    prompt: 'Return the three Pokémon with the highest base_experience, highest first.',
    starter: 'SELECT name, base_experience\nFROM pokemon\nORDER BY ??? ???\nLIMIT ???;',
    solution: 'SELECT name, base_experience\nFROM pokemon\nORDER BY base_experience DESC\nLIMIT 3;',
    hint: 'Sort descending before limiting the result.',
    schema: ['pokemon(base_experience)'],
    validate: (rows) => rows.length === 3 && String(getValue(rows[0], 'name')).toLowerCase() === 'metagross'
  },
  {
    title: 'Inspect relationship keys',
    prompt: 'Return each capture_id with its trainer_id and pokemon_id foreign keys.',
    starter: 'SELECT capture_id, ???, ???\nFROM captures;',
    solution: 'SELECT capture_id, trainer_id, pokemon_id\nFROM captures;',
    hint: 'No join is needed yet. You are inspecting the keys that will connect tables.',
    schema: ['captures · one row per capture', 'trainer_id FK', 'pokemon_id FK'],
    validate: (rows) => rows.length === 6 && getValue(rows[0], 'trainer_id') !== undefined && getValue(rows[0], 'pokemon_id') !== undefined
  },
  {
    title: 'Keep every trainer',
    prompt: 'Return every trainer and any captured pokemon_id. Brock must remain even though he has no captures.',
    starter: 'SELECT t.name, c.pokemon_id\nFROM trainers AS t\n??? JOIN captures AS c\n  ON t.??? = c.???\nORDER BY t.trainer_id;',
    solution: 'SELECT t.name, c.pokemon_id\nFROM trainers AS t\nLEFT JOIN captures AS c\n  ON t.trainer_id = c.trainer_id\nORDER BY t.trainer_id;',
    hint: 'The words “every trainer” point to trainers as the left table and a LEFT JOIN.',
    schema: ['trainers · one row per trainer', 'captures · one row per capture'],
    validate: (rows) => rows.length === 7 && rows.some((row) => String(getValue(row, 'name')).toLowerCase() === 'brock' && getValue(row, 'pokemon_id') == null)
  },
  {
    title: 'Count each generation',
    prompt: 'Return generation and pokemon_count. The result should have one row per generation.',
    starter: 'SELECT generation, ??? AS pokemon_count\nFROM pokemon\nGROUP BY ???\nORDER BY generation;',
    solution: 'SELECT generation, COUNT(*) AS pokemon_count\nFROM pokemon\nGROUP BY generation\nORDER BY generation;',
    hint: 'GROUP BY defines the output grain; COUNT(*) measures each group.',
    schema: ['pokemon · four rows in each generation'],
    validate: (rows) => rows.length === 3 && rows.every((row) => Number(getValue(row, 'pokemon_count')) === 4)
  },
  {
    title: 'Query above-average XP',
    prompt: 'Return Pokémon whose base_experience is greater than the table average, highest first.',
    starter: 'SELECT name, base_experience\nFROM pokemon\nWHERE base_experience > (\n  SELECT ??? FROM pokemon\n)\nORDER BY base_experience DESC;',
    solution: 'SELECT name, base_experience\nFROM pokemon\nWHERE base_experience > (\n  SELECT AVG(base_experience) FROM pokemon\n)\nORDER BY base_experience DESC;',
    hint: 'The inner query calculates one average; the outer query compares each row to it.',
    schema: ['pokemon(base_experience)'],
    validate: (rows) => rows.length === 4 && ['metagross', 'gengar', 'umbreon', 'pikachu'].every((name) => rows.some((row) => String(getValue(row, 'name')).toLowerCase() === name))
  },
  {
    title: 'Triage unresolved support tickets',
    prompt: 'Return ticket_id, priority, and category for unresolved tickets, oldest first.',
    starter: 'SELECT ticket_id, priority, category\nFROM support_tickets\nWHERE resolved_at ???\nORDER BY opened_at;',
    solution: 'SELECT ticket_id, priority, category\nFROM support_tickets\nWHERE resolved_at IS NULL\nORDER BY opened_at;',
    hint: 'Missing timestamps require IS NULL, not = NULL.',
    schema: ['support_tickets · one row per ticket'],
    validate: (rows) => rows.length === 3 && Number(getValue(rows[0], 'ticket_id')) === 5002
  },
  {
    title: 'Verify a safe staging outcome',
    prompt: 'Return successful procedure_name, environment, and result rows from staging only.',
    starter: "SELECT procedure_name, environment, result\nFROM procedure_audit\nWHERE environment = '???'\n  AND result = '???';",
    solution: "SELECT procedure_name, environment, result\nFROM procedure_audit\nWHERE environment = 'staging'\n  AND result = 'success';",
    hint: 'This audit query is read-only. Never invent a production CALL or EXEC statement.',
    schema: ['procedure_audit · one row per execution'],
    validate: (rows) => rows.length === 1 && String(getValue(rows[0], 'environment')).toLowerCase() === 'staging' && String(getValue(rows[0], 'result')).toLowerCase() === 'success'
  },
  {
    title: 'Build campaign delivery metrics',
    prompt: 'Return one row per campaign with impressions, clicks, spend, and CTR percentage. Protect division by zero.',
    starter: 'SELECT campaign_id,\n       SUM(impressions) AS impressions,\n       SUM(clicks) AS clicks,\n       ROUND(100.0 * SUM(clicks) / ???(SUM(impressions), 0), 2) AS ctr_pct,\n       ROUND(SUM(spend_usd), 2) AS spend_usd\nFROM ad_events_daily\nGROUP BY campaign_id\nORDER BY campaign_id;',
    solution: 'SELECT campaign_id,\n       SUM(impressions) AS impressions,\n       SUM(clicks) AS clicks,\n       ROUND(100.0 * SUM(clicks) / NULLIF(SUM(impressions), 0), 2) AS ctr_pct,\n       ROUND(SUM(spend_usd), 2) AS spend_usd\nFROM ad_events_daily\nGROUP BY campaign_id\nORDER BY campaign_id;',
    hint: 'Aggregate to campaign grain first. NULLIF makes a zero denominator become NULL.',
    schema: ['ad_events_daily · one row per date × campaign × exchange'],
    validate: (rows) => rows.length === 5 && rows.some((row) => Number(getValue(row, 'campaign_id')) === 2005 && getValue(row, 'ctr_pct') !== Infinity)
  },
  {
    title: 'Final browser investigation',
    prompt: 'Return every campaign with its count of unresolved tickets, including campaigns with zero.',
    starter: 'SELECT c.campaign_id, c.name,\n       COUNT(t.ticket_id) AS open_ticket_count\nFROM campaigns AS c\nLEFT JOIN support_tickets AS t\n  ON c.campaign_id = t.campaign_id\n AND ???\nGROUP BY c.campaign_id, c.name\nORDER BY c.campaign_id;',
    solution: 'SELECT c.campaign_id, c.name,\n       COUNT(t.ticket_id) AS open_ticket_count\nFROM campaigns AS c\nLEFT JOIN support_tickets AS t\n  ON c.campaign_id = t.campaign_id\n AND t.resolved_at IS NULL\nGROUP BY c.campaign_id, c.name\nORDER BY c.campaign_id;',
    hint: 'Filter unresolved rows inside the ON clause so campaigns with no open tickets stay in the LEFT JOIN result.',
    schema: ['campaigns · one row per campaign', 'support_tickets · one row per ticket'],
    validate: (rows) => rows.length === 5 && rows.some((row) => Number(getValue(row, 'campaign_id')) === 2004 && Number(getValue(row, 'open_ticket_count')) === 0)
  }
];
