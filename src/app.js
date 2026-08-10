// ============================================================
// PokéSQL Academy runtime
// Four tracks: SQL Gym · AdTech Academy · Ops Center · Interview Arena
// Single-file app, localStorage persistence, sql.js practice engine.
// ============================================================

const app = document.getElementById('app');
const THEME_KEY = 'pokysql-theme-v1';
const STORE_KEY = 'pokysql-academy-v4';
const LEGACY_KEYS = ['pokysql-course-progress-v3', 'pokysql-course-progress-v2'];

/* ---------------- Track registry ---------------- */

const TRACKS = [
  { id: 'sql', label: 'SQL Gym', kind: 'Water · badge road', tagline: 'From “what is a table” to production-grade investigation queries, one badge at a time.', modules: sqlModules, hasLab: true },
  { id: 'adtech', label: 'AdTech Academy', kind: 'Fire · industry knowledge', tagline: 'DSPs, real-time bidding, pixels, creatives, and the money math of programmatic advertising.', modules: adtechModules },
  { id: 'ops', label: 'Ops Center', kind: 'Grass · analyst craft', tagline: 'Ticket triage, SLAs, escalation writing, Excel pivots, and the support analyst toolbelt.', modules: opsModules },
  { id: 'interview', label: 'Interview Arena', kind: 'Psychic · final gauntlet', tagline: 'Company dossier, question drills, STAR stories, and the 100-point capstone.', modules: interviewModules },
];
const trackById = (id) => TRACKS.find((t) => t.id === id);

/* ---------------- State ---------------- */

const blankTrackState = () => ({ completed: [], passed: [] });
const defaultState = () => ({
  version: 4,
  xp: 0,
  ledger: {},
  view: 'home',
  cursors: {
    sql: { module: 0, step: 0 },
    adtech: { module: 0, step: 0 },
    ops: { module: 0, step: 0 },
    interview: { module: 0, step: 0 },
  },
  sql: { ...blankTrackState(), labCompleted: [], labDrafts: {}, labAttempts: {}, revealed: {} },
  adtech: blankTrackState(),
  ops: { ...blankTrackState(), pivotMissions: {}, triageBest: null },
  interview: { ...blankTrackState(), stars: {}, flashKnown: {} },
});

const cleanIndexes = (values, max) => [...new Set((Array.isArray(values) ? values : [])
  .filter((v) => Number.isInteger(v) && v >= 0 && v < max))].sort((a, b) => a - b);

const normalizeState = (raw) => {
  const c = raw && typeof raw === 'object' ? raw : {};
  const state = defaultState();
  state.xp = Number.isFinite(c.xp) ? Math.max(0, Math.floor(c.xp)) : 0;
  state.ledger = c.ledger && typeof c.ledger === 'object' ? { ...c.ledger } : {};
  state.view = ['home', 'sql', 'adtech', 'ops', 'interview'].includes(c.view) ? c.view : 'home';
  for (const track of TRACKS) {
    const max = track.modules.length;
    const src = c[track.id] && typeof c[track.id] === 'object' ? c[track.id] : {};
    const dst = state[track.id];
    // Completion must stay contiguous so the prerequisite chain holds.
    const done = new Set(cleanIndexes(src.completed, max));
    dst.completed = [];
    for (let i = 0; i < max && done.has(i); i += 1) dst.completed.push(i);
    dst.passed = cleanIndexes(src.passed, max);
    const cur = c.cursors && c.cursors[track.id] ? c.cursors[track.id] : {};
    const m = Number.isInteger(cur.module) ? Math.max(0, Math.min(cur.module, max - 1)) : 0;
    state.cursors[track.id] = {
      module: (m === 0 || dst.completed.includes(m - 1)) ? m : 0,
      step: Number.isInteger(cur.step) ? Math.max(0, cur.step) : 0,
    };
    if (state.cursors[track.id].module !== m) state.cursors[track.id].step = 0;
  }
  const sqlSrc = c.sql && typeof c.sql === 'object' ? c.sql : {};
  state.sql.labCompleted = cleanIndexes(sqlSrc.labCompleted, labChallenges.length);
  state.sql.labDrafts = sqlSrc.labDrafts && typeof sqlSrc.labDrafts === 'object'
    ? Object.fromEntries(Object.entries(sqlSrc.labDrafts).filter(([k, v]) => typeof v === 'string').map(([k, v]) => [k, v.slice(0, 20000)]))
    : {};
  state.sql.labAttempts = sqlSrc.labAttempts && typeof sqlSrc.labAttempts === 'object' ? { ...sqlSrc.labAttempts } : {};
  state.sql.revealed = sqlSrc.revealed && typeof sqlSrc.revealed === 'object' ? { ...sqlSrc.revealed } : {};
  const opsSrc = c.ops && typeof c.ops === 'object' ? c.ops : {};
  state.ops.pivotMissions = opsSrc.pivotMissions && typeof opsSrc.pivotMissions === 'object' ? { ...opsSrc.pivotMissions } : {};
  state.ops.triageBest = Number.isFinite(opsSrc.triageBest) ? opsSrc.triageBest : null;
  const ivSrc = c.interview && typeof c.interview === 'object' ? c.interview : {};
  state.interview.stars = ivSrc.stars && typeof ivSrc.stars === 'object' ? ivSrc.stars : {};
  state.interview.flashKnown = ivSrc.flashKnown && typeof ivSrc.flashKnown === 'object' ? ivSrc.flashKnown : {};
  return state;
};

// Old saves ({completed, labCompleted, module, step, xp, …}) map onto the SQL track.
const migrateLegacy = (old) => {
  if (!old || typeof old !== 'object') return null;
  const state = defaultState();
  state.xp = Number.isFinite(old.xp) ? Math.max(0, Math.floor(old.xp)) : 0;
  state.view = 'sql';
  state.sql.completed = cleanIndexes(old.completed, sqlModules.length);
  state.sql.passed = cleanIndexes(old.passed, sqlModules.length);
  state.sql.labCompleted = cleanIndexes(old.labCompleted, labChallenges.length);
  state.sql.labDrafts = old.labDrafts && typeof old.labDrafts === 'object' ? { ...old.labDrafts } : {};
  state.sql.labAttempts = old.labAttempts && typeof old.labAttempts === 'object' ? { ...old.labAttempts } : {};
  state.cursors.sql = {
    module: Number.isInteger(old.module) ? old.module : 0,
    step: Number.isInteger(old.step) ? old.step : 0,
  };
  state.sql.completed.forEach((i) => { state.ledger[`badge:sql:${i}`] = 1; });
  state.sql.labCompleted.forEach((i) => { state.ledger[`lab:${i}`] = 1; });
  return normalizeState(state);
};

const parseHashProgress = () => {
  try {
    const encoded = new URLSearchParams(location.hash.slice(1)).get('progress');
    if (!encoded) return null;
    const parsed = JSON.parse(atob(decodeURIComponent(encoded)));
    return parsed && parsed.version === 4 ? normalizeState(parsed) : migrateLegacy(parsed);
  } catch (error) { return null; }
};

const loadState = () => {
  const fromHash = parseHashProgress();
  if (fromHash) return fromHash;
  try {
    const rawV4 = localStorage.getItem(STORE_KEY);
    if (rawV4) return normalizeState(JSON.parse(rawV4));
    for (const key of LEGACY_KEYS) {
      const raw = localStorage.getItem(key);
      if (raw) {
        const migrated = migrateLegacy(JSON.parse(raw));
        if (migrated) return migrated;
      }
    }
  } catch (error) { /* fall through to fresh state */ }
  return defaultState();
};

let state = loadState();

const portableState = () => {
  // Compact snapshot for shareable links: cursors + completion + XP, no drafts/stories.
  const snap = { version: 4, xp: state.xp, ledger: state.ledger, view: state.view, cursors: state.cursors };
  for (const track of TRACKS) {
    snap[track.id] = { completed: state[track.id].completed, passed: state[track.id].passed };
  }
  snap.sql.labCompleted = state.sql.labCompleted;
  return snap;
};

const save = () => {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (error) { /* private mode */ }
  try {
    const encoded = encodeURIComponent(btoa(JSON.stringify(portableState())));
    history.replaceState(null, '', location.pathname + location.search + '#progress=' + encoded);
  } catch (error) { /* URL too long — localStorage still holds everything */ }
};

/* ---------------- XP, toasts, celebration ---------------- */

const XP_TOTAL_HINT = 3400;
const RANKS = [
  [0, 'New Trainer'], [250, 'Rising Trainer'], [700, 'Query Trainer'], [1200, 'Gym Challenger'],
  [1800, 'Support Ace'], [2500, 'Elite Four'], [3200, 'League Champion'],
];
const rankFor = (xp) => RANKS.reduce((acc, [min, name]) => (xp >= min ? name : acc), RANKS[0][1]);

const toastHost = document.createElement('div');
toastHost.className = 'toast-host';
document.body.appendChild(toastHost);
const sparkHost = document.createElement('div');
sparkHost.className = 'spark-host';
document.body.appendChild(sparkHost);

const toast = (message, gold = false) => {
  const el = document.createElement('div');
  el.className = `toast${gold ? ' is-gold' : ''}`;
  el.textContent = message;
  toastHost.appendChild(el);
  setTimeout(() => el.remove(), 3200);
};

const sparkle = (x, y, color) => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < 14; i += 1) {
    const s = document.createElement('span');
    s.className = 'spark';
    const angle = (Math.PI * 2 * i) / 14;
    const dist = 40 + Math.random() * 70;
    s.style.cssText = `left:${x}px;top:${y}px;background:${color};--dx:${Math.cos(angle) * dist}px;--dy:${Math.sin(angle) * dist - 30}px;`;
    sparkHost.appendChild(s);
    setTimeout(() => s.remove(), 950);
  }
};

// Award XP exactly once per ledger key.
const award = (key, amount, label) => {
  if (state.ledger[key]) return false;
  state.ledger[key] = 1;
  state.xp += amount;
  save();
  renderTopbar();
  const chip = document.querySelector('.xp-chip');
  if (chip) { chip.classList.remove('is-bump'); void chip.offsetWidth; chip.classList.add('is-bump'); }
  toast(`+${amount} XP${label ? ' · ' + label : ''}`, true);
  return true;
};

/* ---------------- Theme ---------------- */

let theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
const setTheme = (next) => {
  theme = next === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem(THEME_KEY, theme); } catch (error) { /* ignore */ }
  renderTopbar();
};

/* ---------------- SQL engine (sql.js / SQLite) ---------------- */

let db = null;
let engineStatus = 'loading'; // loading | ready | failed

const sqlType = (value) => (typeof value === 'number' ? (Number.isInteger(value) ? 'INTEGER' : 'REAL') : 'TEXT');
const sqlLiteral = (value) => {
  if (value === null || value === undefined) return 'NULL';
  if (typeof value === 'number') return String(value);
  return `'${String(value).replaceAll("'", "''")}'`;
};

const PRACTICE_TABLES = () => ({
  pokemon: pokemonDex.map(({ sprite, base_stat_total, ...pokemon }) => pokemon),
  trainers,
  captures,
  advertisers,
  campaigns,
  ad_events_daily: adEvents,
  support_tickets: supportTickets,
  procedure_audit: procedureAudit,
});

const initEngine = async () => {
  try {
    if (typeof initSqlJs !== 'function') throw new Error('sql.js failed to load');
    const SQL = await initSqlJs({ locateFile: (f) => `https://cdn.jsdelivr.net/npm/sql.js@1.13.0/dist/${f}` });
    db = new SQL.Database();
    for (const [name, rows] of Object.entries(PRACTICE_TABLES())) {
      const columns = Object.keys(rows[0]);
      const defs = columns.map((col) => `${col} ${sqlType(rows.find((r) => r[col] !== null && r[col] !== undefined)?.[col])}`);
      db.run(`CREATE TABLE ${name} (${defs.join(', ')});`);
      const inserts = rows.map((row) => `INSERT INTO ${name} VALUES (${columns.map((col) => sqlLiteral(row[col])).join(', ')});`);
      db.run(inserts.join('\n'));
    }
    engineStatus = 'ready';
  } catch (error) {
    engineStatus = 'failed';
  }
  render();
};

const runQuery = (sql) => {
  const results = db.exec(sql);
  if (!results.length) return [];
  const { columns, values } = results[0];
  return values.map((row) => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
};

const queryIsReadOnly = (query) => {
  const stripped = query.replace(/--[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  const statements = stripped.trim().split(';').map((s) => s.trim()).filter(Boolean);
  if (statements.length !== 1 || !/^(SELECT|WITH)\b/i.test(statements[0])) return false;
  return !/\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|REPLACE|CALL|EXEC|MERGE|GRANT|REVOKE|ATTACH|PRAGMA|VACUUM)\b/i.test(statements[0]);
};

/* ---------------- Generic render helpers ---------------- */

const tableFromRows = (rows, limit = 200) => {
  if (!Array.isArray(rows)) return '<div class="feedback is-bad">The engine did not return a result set.</div>';
  if (rows.length === 0) return '<div class="feedback">Query ran successfully and returned 0 rows.</div>';
  const headers = Object.keys(rows[0]);
  const body = rows.slice(0, limit).map((row) =>
    `<tr>${headers.map((h) => `<td>${escapeHtml(fmtNum(row[h]))}</td>`).join('')}</tr>`).join('');
  const more = rows.length > limit ? `<div class="feedback">Showing first ${limit} of ${rows.length} rows.</div>` : '';
  return `<div class="table-wrap"><table><thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>${more}`;
};

/* ---------------- Topbar ---------------- */

const brandBall = `<svg class="brand-ball" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M1.5 12h7.6M14.9 12h7.6" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;

const renderTopbar = () => {
  let bar = document.querySelector('.topbar');
  if (!bar) {
    bar = document.createElement('header');
    bar.className = 'topbar';
    app.prepend(bar);
  }
  bar.innerHTML = `
    <button class="brand" type="button" data-nav="home">${brandBall}PokéSQL Academy</button>
    <nav class="track-tabs" aria-label="Tracks">
      ${TRACKS.map((t) => `<button class="track-tab${state.view === t.id ? ' is-active' : ''}" type="button" data-nav="${t.id}" data-track="${t.id}"><span class="tab-dot"></span>${t.label}</button>`).join('')}
    </nav>
    <div class="xp-chip" title="Rank is earned across every track">★ ${state.xp} XP · ${rankFor(state.xp)}</div>
    <button class="icon-btn" type="button" data-action="theme" aria-pressed="${theme === 'dark'}" title="Switch to ${theme === 'dark' ? 'light' : 'dark'} mode">${theme === 'dark' ? '☾ Dark' : '☀ Light'}</button>
    <div class="save-menu">
      <button class="icon-btn" type="button" data-action="save-menu" aria-haspopup="true">Save ▾</button>
      <div class="save-pop" role="menu">
        <div class="save-note">Progress autosaves on this device. Use these to move it.</div>
        <button type="button" data-action="copy-link">Copy progress link</button>
        <button type="button" data-action="export">Export save file</button>
        <label>Import save file<input type="file" accept="application/json,.json" data-action="import"></label>
        <button type="button" data-action="reset">Reset all progress…</button>
      </div>
    </div>`;
};

/* ---------------- Home ---------------- */

const TRACK_SPRITES = {
  sql: mentorIds.slice(0, 6).map((id) => [pokemonDex.find((p) => p.pokemon_id === id).generation, id]),
  adtech: [[1, 4], [1, 5], [1, 6], [1, 58], [2, 155], [3, 255]],
  ops: [[1, 1], [1, 2], [1, 3], [2, 152], [3, 252], [1, 114]],
  interview: [[1, 63], [1, 64], [1, 65], [1, 150], [2, 196], [1, 122]],
};

const trackProgress = (track) => {
  const done = state[track.id].completed.length;
  return { done, total: track.modules.length, pct: Math.round((done / track.modules.length) * 100) };
};

const renderHome = (main) => {
  const allDone = TRACKS.every((t) => state[t.id].completed.length === t.modules.length);
  const current = TRACKS.find((t) => state[t.id].completed.length < t.modules.length) || TRACKS[0];
  const cursor = state.cursors[current.id];
  main.innerHTML = `
    <section class="hero">
      <div class="hero-eyebrow">Platform Support Analyst · The Trade Desk prep</div>
      <h1>Train like a champion. Interview like an analyst.</h1>
      <p class="hero-sub">Four training tracks — SQL, AdTech, support operations, and interview craft — built directly from the job listing, real interview reports, and a realistic ad-platform database. Earn every badge and walk into the loop ready.</p>
    </section>
    <div class="continue-bar" data-track="${current.id}">
      <div class="continue-copy">
        <strong>${allDone ? 'League complete — you are interview-ready.' : `Continue: ${current.label}`}</strong>
        <span>${allDone ? 'Re-run any drill to stay sharp, or print your certificate below.' : `${current.modules[Math.min(cursor.module, current.modules.length - 1)].name} · ${trackProgress(current).done}/${current.modules.length} complete`}</span>
      </div>
      <button class="btn is-primary" type="button" data-nav="${current.id}">${allDone ? 'Revisit tracks' : 'Continue training'}</button>
    </div>
    <div class="track-grid">
      ${TRACKS.map((t) => {
        const p = trackProgress(t);
        return `<button class="track-card" type="button" data-nav="${t.id}" data-track="${t.id}">
          <div class="track-card-head"><span class="track-kind">${t.kind}</span></div>
          <h3>${t.label}</h3>
          <p>${t.tagline}</p>
          <div class="track-sprites">${TRACK_SPRITES[t.id].map(([gen, id], i) => `<img src="${spriteUrl(gen, id)}" alt="" loading="lazy" class="${i < p.done ? '' : 'is-locked'}">`).join('')}</div>
          <div class="track-meter"><div class="track-meter-label"><span>${p.done}/${p.total} modules</span><span>${p.pct}%</span></div><div class="meter"><span style="width:${p.pct}%"></span></div></div>
        </button>`;
      }).join('')}
    </div>
    ${allDone ? `<div class="widget" style="margin-top:22px;text-align:center" data-track="interview">
      <div class="widget-title">Champion certificate</div>
      <h3 style="font-size:1.4rem">🏆 ${escapeHtml('League Champion')} · ${state.xp} XP</h3>
      <p style="margin:0;color:var(--ink-muted)">Every module in every track is complete. Print this page or screenshot it — then go get the job.</p>
    </div>` : ''}`;
};

/* ---------------- Track view ---------------- */

const moduleUnlocked = (trackId, index) => index === 0 || state[trackId].completed.includes(index - 1);

const moduleIcon = (track, module, index) => {
  if (module.mentorId) {
    const mentor = pokemonDex.find((p) => p.pokemon_id === module.mentorId);
    return `<img src="${mentor.sprite}" alt="">`;
  }
  if (module.sprite) return `<img src="${spriteUrl(module.sprite[0], module.sprite[1])}" alt="">`;
  return `<span>${module.emoji || '◆'}</span>`;
};

const renderTrack = (main, track) => {
  const tState = state[track.id];
  const cursor = state.cursors[track.id];
  cursor.module = Math.min(cursor.module, track.modules.length - 1);
  if (!moduleUnlocked(track.id, cursor.module)) { cursor.module = 0; cursor.step = 0; }
  const module = track.modules[cursor.module];
  const p = trackProgress(track);

  main.innerHTML = `
    <div data-track="${track.id}">
      <div class="track-head">
        <div>
          <div class="hero-eyebrow">${track.kind}</div>
          <h2>${track.label}</h2>
        </div>
        <div class="track-head-progress">
          <div class="track-meter-label"><span>${p.done}/${p.total} modules · ${state.xp} XP total</span><span>${p.pct}%</span></div>
          <div class="meter"><span style="width:${p.pct}%"></span></div>
        </div>
      </div>
      <div class="track-layout">
        <nav class="module-rail" aria-label="${track.label} modules">
          ${track.modules.map((m, i) => {
            const done = tState.completed.includes(i);
            const open = moduleUnlocked(track.id, i);
            return `<button class="module-btn${i === cursor.module ? ' is-active' : ''}${done ? ' is-done' : ''}" type="button" data-module="${i}" ${open ? '' : 'disabled'} aria-label="${escapeHtml(m.name)}: ${done ? 'complete' : open ? 'available' : 'locked'}">
              <span class="m-icon">${done ? '✓' : moduleIcon(track, m, i)}</span>
              <span class="m-name">${String(i + 1).padStart(2, '0')} · ${escapeHtml(m.name)}<small>${escapeHtml(m.outcome)}</small></span>
              <span class="m-state">${done ? '✓' : open ? '' : '🔒'}</span>
            </button>`;
          }).join('')}
        </nav>
        <div>
          <section class="lesson" aria-live="polite">
            <header class="lesson-head">
              <div>
                <div class="lesson-eyebrow" id="lesson-eyebrow"></div>
                <div class="lesson-title" id="lesson-title"></div>
                <div class="lesson-outcome" id="lesson-outcome"></div>
              </div>
              <div class="step-dots" id="step-dots" aria-label="Lesson progress"></div>
            </header>
            <div class="stage" id="stage"></div>
            <footer class="lesson-controls">
              <button class="btn is-ghost is-small" type="button" id="restart-module">Restart module</button>
              <div class="lesson-controls-right">
                <button class="btn" type="button" id="step-back">Back</button>
                <button class="btn is-primary" type="button" id="step-next">Next</button>
              </div>
            </footer>
          </section>
          ${track.hasLab ? '<section class="lab" id="lab"></section>' : ''}
        </div>
      </div>
    </div>`;

  main.querySelectorAll('[data-module]').forEach((btn) => {
    btn.addEventListener('click', () => {
      cursor.module = Number(btn.dataset.module);
      cursor.step = 0;
      save();
      render();
    });
  });
  main.querySelector('#restart-module').addEventListener('click', () => {
    cursor.step = 0;
    renderLesson(track);
  });
  main.querySelector('#step-back').addEventListener('click', () => {
    if (cursor.step > 0) { cursor.step -= 1; save(); renderLesson(track); }
  });
  main.querySelector('#step-next').addEventListener('click', () => {
    if (cursor.step < module.steps.length - 1) { cursor.step += 1; save(); renderLesson(track); }
  });

  renderLesson(track);
  if (track.hasLab) renderLab(track);
};

/* ---------------- Lesson stage ---------------- */

const renderMentorCard = (module) => {
  if (!module.mentorId) return '';
  const mentor = pokemonDex.find((p) => p.pokemon_id === module.mentorId);
  const types = [mentor.primary_type, mentor.secondary_type].filter(Boolean);
  return `<aside class="mentor" aria-label="${escapeHtml(mentor.name)} mentor card">
    <div class="mentor-visual"><img src="${mentor.sprite}" alt="${escapeHtml(mentor.name)} sprite"></div>
    <div class="mentor-name">#${String(mentor.pokemon_id).padStart(3, '0')} ${escapeHtml(mentor.name)}</div>
    <div class="mentor-meta">${mentor.region} · Gen ${mentor.generation} · ${mentor.ability}</div>
    <div class="type-row">${types.map((t) => `<span class="type-chip">${escapeHtml(t)}</span>`).join('')}</div>
    <div class="dex-stats">
      <div class="dex-stat"><span>Base XP</span><strong>${mentor.base_experience}</strong></div>
      <div class="dex-stat"><span>Stat total</span><strong>${mentor.base_stat_total}</strong></div>
      <div class="dex-stat"><span>Height</span><strong>${mentor.height_m} m</strong></div>
      <div class="dex-stat"><span>Weight</span><strong>${mentor.weight_kg} kg</strong></div>
    </div>
  </aside>`;
};

const renderLesson = (track) => {
  const cursor = state.cursors[track.id];
  const tState = state[track.id];
  const module = track.modules[cursor.module];
  cursor.step = Math.min(cursor.step, module.steps.length - 1);
  const step = module.steps[cursor.step];

  document.getElementById('lesson-eyebrow').textContent = `Module ${String(cursor.module + 1).padStart(2, '0')} · Step ${cursor.step + 1} of ${module.steps.length}`;
  document.getElementById('lesson-title').textContent = module.name;
  document.getElementById('lesson-outcome').textContent = module.outcome;

  const dots = document.getElementById('step-dots');
  dots.innerHTML = module.steps.map((s, i) =>
    `<span class="step-dot${i === cursor.step ? ' is-current' : i < cursor.step ? ' is-past' : ''}"></span>`).join('');

  let body = `<div class="step-kicker">${step.kicker}</div><div class="step-title">${step.title}</div><div class="step-copy">${step.copy}</div>`;
  if (step.demo) body += `<div class="demo">${step.demo}</div>`;
  if (step.query) body += renderRunnableQuery(step.query);
  if (step.widget) body += `<div class="widget" id="step-widget"><div class="widget-title">${escapeHtml(step.widget.title || 'Interactive drill')}</div><div id="widget-body"></div></div>`;
  if (step.check) body += `<div class="choices" id="choices">${step.check.choices.map((choice, i) => `<button class="choice" type="button" data-choice="${i}">${choice}</button>`).join('')}</div><div class="feedback" id="check-feedback"></div><div id="claim-wrap"></div>`;
  if (module.job) body += `<div class="job-link"><strong>Why this matters at The Trade Desk:</strong> ${module.job}</div>`;

  const stage = document.getElementById('stage');
  const hasMentor = Boolean(module.mentorId);
  stage.style.gridTemplateColumns = hasMentor ? '' : 'minmax(0, 1fr)';
  stage.innerHTML = `<div class="stage-main">${body}</div>${hasMentor ? renderMentorCard(module) : ''}`;

  document.getElementById('step-back').disabled = cursor.step === 0;
  const next = document.getElementById('step-next');
  next.style.display = step.check ? 'none' : '';
  next.disabled = cursor.step >= module.steps.length - 1;

  bindStep(track, module, step, stage);
};

const renderRunnableQuery = (query) => {
  const code = query.sql ? highlightSql(query.sql) : query.code;
  const staticTable = query.headers
    ? `<div class="table-wrap"><table><thead><tr>${query.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${query.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
    : '';
  return `<div class="demo">
    <pre>${code}</pre>
    <div class="lab-actions"><button class="btn is-primary is-small" type="button" id="try-query">Run this query</button><span class="feedback" id="try-feedback">${query.sql && engineStatus === 'ready' ? 'Runs live against the practice database.' : 'Read-only practice query'}</span></div>
    <div id="try-output" hidden>${staticTable}</div>
  </div>`;
};

const bindStep = (track, module, step, stage) => {
  const tryBtn = stage.querySelector('#try-query');
  if (tryBtn) {
    tryBtn.addEventListener('click', () => {
      const output = stage.querySelector('#try-output');
      if (step.query.sql && engineStatus === 'ready') {
        try { output.innerHTML = tableFromRows(runQuery(step.query.sql)); }
        catch (error) { output.innerHTML = `<div class="feedback is-bad">SQL error: ${escapeHtml(error.message)}</div>`; }
      }
      output.hidden = false;
      tryBtn.textContent = 'Query ran ✓';
      stage.querySelector('#try-feedback').textContent = 'This is a real result set from the in-browser database.';
    });
  }

  if (step.widget) bindWidget(track, module, step, stage.querySelector('#widget-body'));

  if (step.check) {
    const cursor = state.cursors[track.id];
    const tState = state[track.id];
    let wrongCount = 0;
    stage.querySelectorAll('.choice').forEach((btn) => {
      btn.addEventListener('click', () => {
        const selected = Number(btn.dataset.choice);
        const feedback = stage.querySelector('#check-feedback');
        if (selected === step.check.answer) {
          stage.querySelectorAll('.choice').forEach((b) => { b.disabled = true; });
          btn.classList.add('is-correct');
          feedback.textContent = step.check.explanation;
          feedback.className = 'feedback is-good';
          if (!tState.passed.includes(cursor.module)) tState.passed.push(cursor.module);
          const isLastStep = cursor.step === module.steps.length - 1;
          const isDone = tState.completed.includes(cursor.module);
          const wrap = stage.querySelector('#claim-wrap');
          if (!isLastStep) {
            wrap.innerHTML = '<button class="btn is-primary" type="button" id="check-continue" style="margin-top:12px">Continue</button>';
            wrap.querySelector('#check-continue').addEventListener('click', () => { cursor.step += 1; save(); renderLesson(track); });
          } else if (isDone) {
            wrap.innerHTML = '<div class="feedback is-good" style="margin-top:10px">Module already complete. Revisit anytime.</div>';
          } else {
            wrap.innerHTML = '<button class="btn is-primary" type="button" id="claim-badge" style="margin-top:12px">Complete module · +100 XP</button>';
            wrap.querySelector('#claim-badge').addEventListener('click', (event) => {
              tState.completed.push(cursor.module);
              tState.completed.sort((a, b) => a - b);
              award(`badge:${track.id}:${cursor.module}`, 100, `${module.name} complete`);
              const trackColor = getComputedStyle(document.querySelector(`[data-track="${track.id}"]`)).getPropertyValue('--track');
              sparkle(event.clientX, event.clientY, trackColor || 'gold');
              if (state[track.id].completed.length === track.modules.length) {
                toast(`🏆 ${track.label} complete!`, true);
              }
              if (cursor.module < track.modules.length - 1) { cursor.module += 1; cursor.step = 0; }
              save();
              render();
            });
          }
          save();
        } else {
          wrongCount += 1;
          btn.classList.add('is-wrong');
          btn.disabled = true;
          const feedbackEl = stage.querySelector('#check-feedback');
          if (wrongCount >= step.check.choices.length - 1) {
            const correct = stage.querySelector(`.choice[data-choice="${step.check.answer}"]`);
            if (correct) correct.classList.add('is-correct');
            feedbackEl.textContent = 'Here is the answer — read why, then click it to continue.';
          } else {
            feedbackEl.textContent = 'Not yet — eliminate that option and try again.';
          }
          feedbackEl.className = 'feedback is-bad';
        }
      });
    });
  }
};

/* ---------------- SQL Lab ---------------- */

const renderLab = (track) => {
  const lab = document.getElementById('lab');
  const cursor = state.cursors.sql;
  const challenge = labChallenges[cursor.module];
  const complete = state.sql.labCompleted.includes(cursor.module);
  const statusLabel = engineStatus === 'ready'
    ? `${complete ? 'Trial cleared' : 'Trial open'} · ${state.sql.labCompleted.length}/${labChallenges.length}`
    : engineStatus === 'loading' ? 'Loading SQLite engine…' : 'Practice engine offline';

  if (engineStatus !== 'ready') {
    lab.innerHTML = `<header class="lab-head"><div><div class="step-kicker">Professor Oak's query terminal</div><h3>Live SQL Lab</h3></div><div class="lab-status">${statusLabel}</div></header>
    <div class="lab-body"><div class="arena-lock">${engineStatus === 'loading' ? 'Starting the in-browser SQLite engine…' : 'The SQL engine could not load. Check your connection and reload the page.'}</div></div>`;
    return;
  }

  const attempts = Number(state.sql.labAttempts[cursor.module] || 0);
  const revealed = Boolean(state.sql.revealed[cursor.module]);
  const draft = state.sql.labDrafts[cursor.module] ?? challenge.starter;
  const tables = PRACTICE_TABLES();

  lab.innerHTML = `
    <header class="lab-head">
      <div><div class="step-kicker">Professor Oak's query terminal · real SQLite in your browser</div><h3>Live SQL Lab — ${escapeHtml(challenge.title)}</h3></div>
      <div class="lab-status is-ready">${statusLabel}</div>
    </header>
    <div class="lab-body">
      <div class="lab-grid">
        <div class="lab-brief">
          <div class="step-kicker">Badge ${String(cursor.module + 1).padStart(2, '0')} trial · ${complete ? 'cleared ✓' : '+40 XP'}</div>
          <h4>${escapeHtml(challenge.title)}</h4>
          <p>${escapeHtml(challenge.prompt)}${challenge.starter.includes('???') ? ' Replace every ??? in the starter to complete the mission.' : ''}</p>
          <div class="schema-chips">${challenge.schema.map((s) => `<span class="schema-chip">${escapeHtml(s)}</span>`).join('')}</div>
          <div class="hint-box" id="lab-hint">Professor hint: ${escapeHtml(challenge.hint)}</div>
          <div class="lab-actions">
            <button class="btn is-small" type="button" id="lab-hint-btn">Show hint</button>
            <button class="btn is-small" type="button" id="lab-solution-btn" ${attempts >= 1 || revealed || complete ? '' : 'disabled'} title="${attempts >= 1 || revealed || complete ? 'Load the reference solution into the editor' : 'Make at least one attempt first'}">Reveal solution</button>
          </div>
        </div>
        <div class="editor-wrap">
          <textarea class="sql-editor" id="sql-editor" spellcheck="false" aria-label="SQL editor">${escapeHtml(draft)}</textarea>
          <div class="lab-actions">
            <button class="btn is-primary" type="button" id="lab-run">Run SQL <span class="kbd">⌘⏎</span></button>
            <button class="btn" type="button" id="lab-restore">Restore starter</button>
            <span class="feedback" id="lab-feedback">One read-only SELECT or WITH statement · SQLite dialect</span>
          </div>
          <div class="lab-results" id="lab-results"></div>
        </div>
      </div>
      <details class="schema-browser">
        <summary>Schema browser — every table you can query</summary>
        <div class="schema-tables">
          ${Object.entries(tables).map(([name, rows]) => `<div class="schema-table"><strong>${name}</strong><span>${Object.keys(rows[0]).join(' · ')}</span></div>`).join('')}
        </div>
      </details>
    </div>`;

  const editor = lab.querySelector('#sql-editor');
  const feedback = lab.querySelector('#lab-feedback');
  const results = lab.querySelector('#lab-results');

  editor.addEventListener('input', () => {
    state.sql.labDrafts[cursor.module] = editor.value;
    save();
  });
  editor.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      lab.querySelector('#lab-run').click();
    }
  });
  lab.querySelector('#lab-hint-btn').addEventListener('click', () => {
    lab.querySelector('#lab-hint').classList.add('is-visible');
  });
  lab.querySelector('#lab-solution-btn').addEventListener('click', () => {
    state.sql.revealed[cursor.module] = 1;
    editor.value = challenge.solution;
    state.sql.labDrafts[cursor.module] = challenge.solution;
    feedback.textContent = 'Reference solution loaded. Read every line aloud, then run it — and try to rebuild it from memory after.';
    feedback.className = 'feedback';
    save();
  });
  lab.querySelector('#lab-restore').addEventListener('click', () => {
    editor.value = challenge.starter;
    state.sql.labDrafts[cursor.module] = challenge.starter;
    results.innerHTML = '';
    feedback.textContent = 'Starter restored. Predict the result before you run it.';
    feedback.className = 'feedback';
    save();
  });
  lab.querySelector('#lab-run').addEventListener('click', () => {
    const query = editor.value;
    state.sql.labAttempts[cursor.module] = Number(state.sql.labAttempts[cursor.module] || 0) + 1;
    lab.querySelector('#lab-solution-btn').disabled = false;
    if (!queryIsReadOnly(query)) {
      results.innerHTML = '';
      feedback.textContent = 'Safety lock: one read-only SELECT or WITH statement only. Data-changing and procedure statements are blocked — exactly the discipline production demands.';
      feedback.className = 'feedback is-bad';
      save();
      return;
    }
    try {
      const rows = runQuery(query);
      results.innerHTML = tableFromRows(rows);
      if (challenge.validate(rows)) {
        const firstClear = !state.sql.labCompleted.includes(cursor.module);
        if (firstClear) {
          state.sql.labCompleted.push(cursor.module);
          award(`lab:${cursor.module}`, 40, 'Lab trial cleared');
        }
        feedback.textContent = firstClear ? 'Trial cleared! Result shape and values match the mission.' : 'Cleared again — repetition builds recall.';
        feedback.className = 'feedback is-good';
        lab.querySelector('.lab-status').textContent = `Trial cleared · ${state.sql.labCompleted.length}/${labChallenges.length}`;
      } else {
        feedback.textContent = 'The query ran, but the result does not match the mission yet. Check columns, filters, grain, and ordering.';
        feedback.className = 'feedback is-bad';
        lab.querySelector('#lab-hint').classList.add('is-visible');
      }
    } catch (error) {
      results.innerHTML = '';
      feedback.textContent = `SQL error: ${error.message}`;
      feedback.className = 'feedback is-bad';
      lab.querySelector('#lab-hint').classList.add('is-visible');
    }
    save();
  });
};

/* ---------------- Widgets ---------------- */

const bindWidget = (track, module, step, host) => {
  const w = step.widget;
  const key = `w:${track.id}:${state.cursors[track.id].module}:${w.type}`;
  if (w.type === 'auction') return widgetAuction(host, w, key);
  if (w.type === 'calc') return widgetCalc(host, w, key);
  if (w.type === 'tagInspect') return widgetTagInspect(host, w, key);
  if (w.type === 'pivot') return widgetPivot(host, w, key);
  if (w.type === 'triage') return widgetTriage(host, w, key);
  if (w.type === 'flash') return widgetFlash(host, w, key);
  if (w.type === 'star') return widgetStar(host, w, key);
  if (w.type === 'noteBuilder') return widgetNoteBuilder(host, w, key);
  if (w.type === 'ecosystem') return widgetEcosystem(host, w, key);
  host.innerHTML = '<div class="feedback">This drill could not load.</div>';
};

/* Ecosystem map — click each player to reveal its role */
const widgetEcosystem = (host, w, key) => {
  let revealed = new Set();
  const draw = () => {
    host.innerHTML = `
      <div class="flow">
        ${w.nodes.map((n, i) => `<button class="flow-item" type="button" data-node="${i}" style="cursor:pointer;text-align:left;font:inherit;color:inherit;${revealed.has(i) ? 'border-color:var(--track)' : ''}">
          <strong>${escapeHtml(n.name)}</strong><span>${revealed.has(i) ? escapeHtml(n.role) : 'Click to reveal role'}</span>
        </button>`).join('')}
      </div>
      <div class="feedback">${revealed.size}/${w.nodes.length} players revealed${revealed.size === w.nodes.length ? ' — you can now trace a dollar from advertiser to publisher.' : ''}</div>`;
    host.querySelectorAll('[data-node]').forEach((btn) => {
      btn.addEventListener('click', () => {
        revealed.add(Number(btn.dataset.node));
        if (revealed.size === w.nodes.length) award(key, 20, 'Ecosystem mapped');
        draw();
      });
    });
  };
  draw();
};

/* RTB auction step-through */
const widgetAuction = (host, w, key) => {
  let phase = -1;
  const phases = w.phases;
  const draw = () => {
    const current = phases[phase];
    host.innerHTML = `
      <div class="auction-stage">
        <div class="auction-timeline">
          ${phases.map((p, i) => `<div class="auction-step${i === phase ? ' is-live' : i < phase ? ' is-done' : ''}"><strong>${i + 1}. ${escapeHtml(p.name)}</strong><span>${escapeHtml(p.time)}</span></div>`).join('')}
        </div>
        <div class="auction-note">${phase < 0 ? 'Press <strong>Start auction</strong> to watch one impression get bought in ~250 milliseconds.' : current.note}</div>
        ${phase >= 0 && current.bids ? `<div style="display:grid;gap:6px">${current.bids.map((b) => `
          <div class="bid-row${b.win ? ' is-winner' : ''}"><strong style="width:150px">${escapeHtml(b.dsp)}</strong><div class="bid-bar"><span style="width:${b.pct}%"></span></div><span style="width:70px;text-align:right">$${b.cpm.toFixed(2)}</span>${b.win ? '<span>🏆 wins</span>' : ''}</div>`).join('')}</div>` : ''}
        <div class="lab-actions">
          <button class="btn is-primary is-small" type="button" id="auction-next">${phase < 0 ? 'Start auction' : phase >= phases.length - 1 ? 'Replay' : 'Next phase'}</button>
          <span class="feedback">${phase >= 0 ? `Phase ${phase + 1} of ${phases.length}` : ''}</span>
        </div>
      </div>`;
    host.querySelector('#auction-next').addEventListener('click', () => {
      phase = phase >= phases.length - 1 ? 0 : phase + 1;
      if (phase === phases.length - 1) award(key, 20, 'Auction traced end to end');
      draw();
    });
  };
  draw();
};

/* Metric calculator drills */
const widgetCalc = (host, w, key) => {
  host.innerHTML = w.drills.map((d, i) => `
    <div class="calc-drill" data-drill="${i}">
      <div class="calc-q"><strong>${escapeHtml(d.metric)}:</strong> ${d.question}</div>
      <div class="calc-row">
        <input class="calc-input" type="number" step="any" inputmode="decimal" placeholder="${escapeHtml(d.placeholder)}" aria-label="${escapeHtml(d.metric)} answer">
        <button class="btn is-small" type="button" data-check>Check</button>
        <button class="btn is-ghost is-small" type="button" data-formula>Formula</button>
        <span class="feedback" data-fb></span>
      </div>
    </div>`).join('');
  host.querySelectorAll('[data-drill]').forEach((el) => {
    const i = Number(el.dataset.drill);
    const d = w.drills[i];
    const fb = el.querySelector('[data-fb]');
    el.querySelector('[data-formula]').addEventListener('click', () => {
      fb.textContent = d.formula;
      fb.className = 'feedback';
    });
    const check = () => {
      const value = parseFloat(el.querySelector('input').value);
      if (!Number.isFinite(value)) { fb.textContent = 'Type a number first.'; fb.className = 'feedback is-bad'; return; }
      if (Math.abs(value - d.answer) <= (d.tolerance ?? 0.011)) {
        fb.textContent = `Correct — ${d.explain}`;
        fb.className = 'feedback is-good';
        award(`${key}:${i}`, 10, `${d.metric} mastered`);
      } else {
        fb.textContent = 'Not quite. Check the formula and units (dollars vs thousandths).';
        fb.className = 'feedback is-bad';
      }
    };
    el.querySelector('[data-check]').addEventListener('click', check);
    el.querySelector('input').addEventListener('keydown', (e) => { if (e.key === 'Enter') check(); });
  });
};

/* Tag inspector — find the broken line */
const widgetTagInspect = (host, w, key) => {
  let found = false;
  const draw = () => {
    host.innerHTML = `
      <p style="margin:0;font-size:0.9rem">${w.brief}</p>
      <pre class="tag-inspect">${w.lines.map((line, i) => `<span class="tag-line${found && i === w.flawed ? ' is-flagged' : ''}" data-line="${i}">${escapeHtml(line)}</span>`).join('\n')}</pre>
      <div class="feedback ${found ? 'is-good' : ''}" id="tag-fb">${found ? w.explanation : 'Click the line that would break this tag in production.'}</div>`;
    if (!found) {
      host.querySelectorAll('.tag-line').forEach((line) => {
        line.addEventListener('click', () => {
          if (Number(line.dataset.line) === w.flawed) {
            found = true;
            award(key, 20, 'Broken tag spotted');
            draw();
          } else {
            const fb = host.querySelector('#tag-fb');
            fb.textContent = 'That line is fine. Look for the piece a browser could never resolve.';
            fb.className = 'feedback is-bad';
          }
        });
      });
    }
  };
  draw();
};

/* Pivot table builder over the ad-events data */
const widgetPivot = (host, w, key) => {
  const joined = adEvents.map((e) => {
    const campaign = campaigns.find((c) => c.campaign_id === e.campaign_id);
    const advertiser = advertisers.find((a) => a.advertiser_id === campaign.advertiser_id);
    return { ...e, campaign: campaign.name, advertiser: advertiser.name };
  });
  const DIMS = { advertiser: 'Advertiser', campaign: 'Campaign', exchange_name: 'Exchange', event_date: 'Date' };
  const MEASURES = { impressions: 'Impressions', clicks: 'Clicks', conversions: 'Conversions', spend_usd: 'Spend (USD)' };
  const AGGS = { sum: 'SUM', avg: 'AVERAGE', count: 'COUNT' };
  let config = { row: 'advertiser', col: 'none', measure: 'spend_usd', agg: 'sum' };

  const aggregate = (rows, measure, agg) => {
    if (agg === 'count') return rows.length;
    const total = rows.reduce((acc, r) => acc + Number(r[measure] || 0), 0);
    return agg === 'avg' ? (rows.length ? total / rows.length : 0) : total;
  };

  const draw = () => {
    const rowValues = [...new Set(joined.map((r) => r[config.row]))].sort();
    const colValues = config.col === 'none' ? [null] : [...new Set(joined.map((r) => r[config.col]))].sort();
    const cells = rowValues.map((rv) => colValues.map((cv) => {
      const bucket = joined.filter((r) => r[config.row] === rv && (cv === null || r[config.col] === cv));
      return aggregate(bucket, config.measure, config.agg);
    }));
    const fmt = (v) => config.measure === 'spend_usd' && config.agg !== 'count'
      ? `$${v.toLocaleString('en-US', { maximumFractionDigits: 2 })}` : fmtNum(Math.round(v * 100) / 100);

    host.innerHTML = `
      <div class="pivot-controls">
        <div class="pivot-field"><label>Rows</label><select data-cfg="row">${Object.entries(DIMS).map(([k, v]) => `<option value="${k}"${config.row === k ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
        <div class="pivot-field"><label>Columns</label><select data-cfg="col"><option value="none">— none —</option>${Object.entries(DIMS).map(([k, v]) => `<option value="${k}"${config.col === k ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
        <div class="pivot-field"><label>Values</label><select data-cfg="measure">${Object.entries(MEASURES).map(([k, v]) => `<option value="${k}"${config.measure === k ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
        <div class="pivot-field"><label>Aggregation</label><select data-cfg="agg">${Object.entries(AGGS).map(([k, v]) => `<option value="${k}"${config.agg === k ? ' selected' : ''}>${v}</option>`).join('')}</select></div>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>${DIMS[config.row]}</th>${colValues.map((cv) => `<th>${cv === null ? `${AGGS[config.agg]} of ${MEASURES[config.measure]}` : escapeHtml(cv)}</th>`).join('')}</tr></thead>
        <tbody>${rowValues.map((rv, ri) => `<tr><td><strong>${escapeHtml(rv)}</strong></td>${cells[ri].map((c) => `<td>${fmt(c)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
      <div style="display:grid;gap:6px">
        ${w.missions.map((m, i) => `<div class="calc-row"><span class="feedback ${state.ops.pivotMissions[i] ? 'is-good' : ''}" style="flex:1">${state.ops.pivotMissions[i] ? '✓ ' : ''}Mission ${i + 1}: ${m.brief}</span><button class="btn is-small" type="button" data-mission="${i}" ${state.ops.pivotMissions[i] ? 'disabled' : ''}>Check my pivot</button></div>`).join('')}
      </div>`;

    host.querySelectorAll('[data-cfg]').forEach((sel) => {
      sel.addEventListener('change', () => { config[sel.dataset.cfg] = sel.value; draw(); });
    });
    host.querySelectorAll('[data-mission]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.mission);
        const m = w.missions[i];
        const ok = Object.entries(m.expect).every(([k, v]) => config[k] === v);
        const fb = btn.previousElementSibling;
        if (ok) {
          state.ops.pivotMissions[i] = 1;
          award(`${key}:${i}`, 10, 'Pivot mission complete');
          save();
          draw();
        } else {
          fb.textContent = `Mission ${i + 1}: ${m.brief} — not this configuration. ${m.nudge}`;
          fb.className = 'feedback is-bad';
        }
      });
    });
  };
  draw();
};

/* Ticket triage — order the queue */
const widgetTriage = (host, w, key) => {
  let order = w.tickets.map((_, i) => i);
  let checked = false;
  const draw = () => {
    host.innerHTML = `
      <p style="margin:0;font-size:0.9rem">${w.brief}</p>
      <div class="triage-list">
        ${order.map((ticketIdx, pos) => {
          const t = w.tickets[ticketIdx];
          const mark = checked ? (w.answer[pos] === ticketIdx ? ' is-correct' : ' is-wrong') : '';
          return `<div class="triage-ticket${mark}">
            <span class="triage-rank">${pos + 1}</span>
            <span class="t-pri ${t.priority.toLowerCase()}">${t.priority}</span>
            <span class="t-copy"><strong>${escapeHtml(t.title)}</strong>${escapeHtml(t.detail)}</span>
            <span class="t-order">
              <button type="button" data-move="up" data-pos="${pos}" aria-label="Move up" ${pos === 0 ? 'disabled' : ''}>↑</button>
              <button type="button" data-move="down" data-pos="${pos}" aria-label="Move down" ${pos === order.length - 1 ? 'disabled' : ''}>↓</button>
            </span>
          </div>`;
        }).join('')}
      </div>
      <div class="lab-actions">
        <button class="btn is-primary is-small" type="button" id="triage-check">Check my order</button>
        <button class="btn is-ghost is-small" type="button" id="triage-shuffle">Reset</button>
        <span class="feedback" id="triage-fb"></span>
      </div>
      ${checked ? `<div class="feedback">${w.debrief}</div>` : ''}`;
    host.querySelectorAll('[data-move]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pos = Number(btn.dataset.pos);
        const swap = btn.dataset.move === 'up' ? pos - 1 : pos + 1;
        [order[pos], order[swap]] = [order[swap], order[pos]];
        checked = false;
        draw();
      });
    });
    host.querySelector('#triage-check').addEventListener('click', () => {
      checked = true;
      const correct = order.filter((t, pos) => w.answer[pos] === t).length;
      draw();
      const fb = host.querySelector('#triage-fb');
      if (correct === order.length) {
        fb.textContent = 'Perfect triage. This is exactly the reasoning to narrate in an interview.';
        fb.className = 'feedback is-good';
        award(key, 30, 'Queue triaged perfectly');
      } else {
        fb.textContent = `${correct}/${order.length} in the right slot. Re-read the debrief and adjust.`;
        fb.className = 'feedback is-bad';
      }
      state.ops.triageBest = Math.max(state.ops.triageBest ?? 0, correct);
      save();
    });
    host.querySelector('#triage-shuffle').addEventListener('click', () => {
      order = w.tickets.map((_, i) => i);
      checked = false;
      draw();
    });
  };
  draw();
};

/* Flashcards */
const widgetFlash = (host, w, key) => {
  const deckKey = w.deck;
  let filter = 'all';
  let index = 0;
  let flipped = false;
  const known = () => state.interview.flashKnown[deckKey] || (state.interview.flashKnown[deckKey] = {});
  const cards = () => w.cards.map((c, i) => ({ ...c, i })).filter((c) => filter === 'all' || c.cat === filter);

  const draw = () => {
    const deck = cards();
    if (index >= deck.length) index = 0;
    const card = deck[index];
    const knownCount = w.cards.filter((c, i) => known()[i]).length;
    const cats = [...new Set(w.cards.map((c) => c.cat))];
    host.innerHTML = `
      <div class="flash-deck">
        <div class="flash-filters">
          <button class="flash-filter${filter === 'all' ? ' is-active' : ''}" type="button" data-f="all">All (${w.cards.length})</button>
          ${cats.map((cat) => `<button class="flash-filter${filter === cat ? ' is-active' : ''}" type="button" data-f="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`).join('')}
        </div>
        ${card ? `<div class="flash-card" id="flash-card" role="button" tabindex="0" aria-label="Flashcard — click to flip">
          <span class="f-cat">${escapeHtml(card.cat)}${known()[card.i] ? ' · ✓ known' : ''}</span>
          <span class="f-front">${flipped ? '' : card.front}</span>
          ${flipped ? `<span class="f-back">${card.back}</span>` : ''}
          <span class="f-flip-note">${flipped ? 'Click to see the prompt again' : 'Click to reveal the answer'}</span>
        </div>
        <div class="flash-nav">
          <button class="btn is-small" type="button" id="f-prev">← Prev</button>
          <span class="flash-count">${index + 1}/${deck.length}</span>
          <button class="btn is-small" type="button" id="f-next">Next →</button>
          <button class="btn is-primary is-small" type="button" id="f-know">${known()[card.i] ? 'Still know it' : 'I know this'}</button>
        </div>` : '<div class="feedback">No cards in this filter.</div>'}
        <div class="feedback">${knownCount}/${w.cards.length} marked known${knownCount >= Math.ceil(w.cards.length * 0.8) ? ' — deck mastered.' : ''}</div>
      </div>`;
    host.querySelectorAll('[data-f]').forEach((btn) => {
      btn.addEventListener('click', () => { filter = btn.dataset.f; index = 0; flipped = false; draw(); });
    });
    const cardEl = host.querySelector('#flash-card');
    if (cardEl) {
      const flip = () => { flipped = !flipped; draw(); };
      cardEl.addEventListener('click', flip);
      cardEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } });
      host.querySelector('#f-prev').addEventListener('click', () => { index = (index - 1 + cards().length) % cards().length; flipped = false; draw(); });
      host.querySelector('#f-next').addEventListener('click', () => { index = (index + 1) % cards().length; flipped = false; draw(); });
      host.querySelector('#f-know').addEventListener('click', () => {
        known()[card.i] = 1;
        save();
        const knownCount = w.cards.filter((c, i) => known()[i]).length;
        if (knownCount >= Math.ceil(w.cards.length * 0.8)) award(key, 25, 'Deck mastered');
        index = (index + 1) % cards().length;
        flipped = false;
        draw();
      });
    }
  };
  draw();
};

/* STAR story forge */
const widgetStar = (host, w, key) => {
  let active = 0;
  const stories = () => state.interview.stars;
  const fields = [
    ['situation', 'Situation', 'Where were you working, and what was the context? One or two sentences.'],
    ['task', 'Task', 'What were you responsible for? What did success look like?'],
    ['action', 'Action', 'What did YOU do — specific steps, tools, decisions. This is the longest part.'],
    ['result', 'Result', 'What happened? Lead with the measurable outcome.'],
    ['metric', 'The number', 'One measurable fact: minutes saved, tickets resolved, % improvement, users helped.'],
    ['lesson', 'Lesson learned', 'One sentence: what you would repeat or do differently.'],
  ];
  const storyDone = (id) => {
    const s = stories()[id];
    return s && fields.every(([f]) => (s[f] || '').trim().length >= 10);
  };

  const draw = () => {
    const prompt = w.prompts[active];
    const story = stories()[prompt.id] || {};
    host.innerHTML = `
      <div class="star-tabs">
        ${w.prompts.map((p, i) => `<button class="star-tab${i === active ? ' is-active' : ''}${storyDone(p.id) ? ' is-filled' : ''}" type="button" data-story="${i}">${escapeHtml(p.label)}</button>`).join('')}
      </div>
      <p style="margin:6px 0 0;font-size:0.9rem"><strong>Prompt:</strong> ${prompt.brief}</p>
      <p style="margin:0;font-size:0.8rem;color:var(--ink-faint)">${prompt.tip}</p>
      <div class="star-form">
        ${fields.map(([f, label, help]) => `<div class="star-field"><label for="star-${f}">${label}</label><small>${help}</small><textarea id="star-${f}" data-field="${f}">${escapeHtml(story[f] || '')}</textarea></div>`).join('')}
      </div>
      <div class="lab-actions">
        <button class="btn is-primary is-small" type="button" id="star-save">Save story</button>
        <button class="btn is-small" type="button" id="star-export">Export all stories (.md)</button>
        <span class="feedback ${storyDone(prompt.id) ? 'is-good' : ''}">${storyDone(prompt.id) ? '✓ This story is complete.' : `${w.prompts.filter((p) => storyDone(p.id)).length}/${w.prompts.length} stories complete`}</span>
      </div>`;
    host.querySelectorAll('[data-story]').forEach((btn) => {
      btn.addEventListener('click', () => { active = Number(btn.dataset.story); draw(); });
    });
    host.querySelector('#star-save').addEventListener('click', () => {
      const s = stories()[prompt.id] || (stories()[prompt.id] = {});
      host.querySelectorAll('[data-field]').forEach((area) => { s[area.dataset.field] = area.value; });
      save();
      if (storyDone(prompt.id)) award(`${key}:${prompt.id}`, 20, 'STAR story forged');
      draw();
    });
    host.querySelector('#star-export').addEventListener('click', () => {
      const md = w.prompts.map((p) => {
        const s = stories()[p.id] || {};
        return `## ${p.label}\n\n**Prompt:** ${p.brief.replace(/<[^>]+>/g, '')}\n\n${fields.map(([f, label]) => `**${label}:** ${s[f] || '_not written yet_'}`).join('\n\n')}`;
      }).join('\n\n---\n\n');
      const blob = new Blob([`# My STAR Stories — The Trade Desk Interview\n\n${md}\n`], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'star-stories.md';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
  };
  draw();
};

/* Escalation note builder */
const widgetNoteBuilder = (host, w, key) => {
  const picks = new Array(w.slots.length).fill(null);
  let graded = false;
  const draw = () => {
    host.innerHTML = `
      <p style="margin:0;font-size:0.9rem">${w.brief}</p>
      ${w.slots.map((slot, si) => `
        <div class="star-field">
          <label>${si + 1}. ${escapeHtml(slot.label)}</label>
          <div class="choices" style="margin-top:4px">
            ${slot.options.map((opt, oi) => {
              let cls = '';
              if (graded) {
                if (oi === slot.best) cls = ' is-correct';
                else if (picks[si] === oi) cls = ' is-wrong';
              } else if (picks[si] === oi) cls = ' is-correct';
              return `<button class="choice${cls}" type="button" data-slot="${si}" data-opt="${oi}" style="font-weight:400">${escapeHtml(opt.text)}</button>`;
            }).join('')}
          </div>
          ${graded ? `<small style="color:var(--ink-muted)">${escapeHtml(slot.why)}</small>` : ''}
        </div>`).join('')}
      <div class="lab-actions">
        <button class="btn is-primary is-small" type="button" id="note-grade" ${picks.every((p) => p !== null) ? '' : 'disabled'}>Grade my note</button>
        <span class="feedback" id="note-fb">${picks.every((p) => p !== null) ? '' : 'Pick one line for every section first.'}</span>
      </div>`;
    host.querySelectorAll('[data-slot]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (graded) return;
        picks[Number(btn.dataset.slot)] = Number(btn.dataset.opt);
        draw();
      });
    });
    const grade = host.querySelector('#note-grade');
    if (grade) grade.addEventListener('click', () => {
      graded = true;
      const score = picks.filter((p, i) => p === w.slots[i].best).length;
      draw();
      const fb = host.querySelector('#note-fb');
      fb.textContent = `${score}/${w.slots.length} strongest choices.`;
      fb.className = score >= w.slots.length - 1 ? 'feedback is-good' : 'feedback is-bad';
      if (score >= w.slots.length - 1) award(key, 20, 'Escalation note approved');
    });
  };
  draw();
};

/* ---------------- Root render ---------------- */

const render = () => {
  renderTopbar();
  let main = document.querySelector('.main');
  if (!main) {
    main = document.createElement('main');
    main.className = 'main';
    app.appendChild(main);
    const footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML = 'Pokémon facts and sprites come from PokeAPI\'s open dataset; names and imagery belong to their rights holders — this is a personal educational project. Practice data is fictional. Capstone runs as PostgreSQL in <a href="https://runsql.com/r" rel="noreferrer">RunSQL</a>.';
    app.appendChild(footer);
  }
  if (state.view === 'home') renderHome(main);
  else renderTrack(main, trackById(state.view));
  window.scrollTo({ top: 0 });
};

/* ---------------- Global events ---------------- */

document.addEventListener('click', (event) => {
  const nav = event.target.closest('[data-nav]');
  if (nav) {
    state.view = nav.dataset.nav;
    save();
    render();
    return;
  }
  const action = event.target.closest('[data-action]');
  const pop = document.querySelector('.save-pop');
  if (!action) {
    if (pop && !event.target.closest('.save-menu')) pop.classList.remove('is-open');
    return;
  }
  if (action.dataset.action === 'theme') setTheme(theme === 'dark' ? 'light' : 'dark');
  if (action.dataset.action === 'save-menu') pop.classList.toggle('is-open');
  if (action.dataset.action === 'copy-link') {
    save();
    navigator.clipboard.writeText(location.href).then(
      () => toast('Progress link copied — open it on any device.'),
      () => window.prompt('Copy this progress link:', location.href),
    );
    pop.classList.remove('is-open');
  }
  if (action.dataset.action === 'export') {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pokysql-save.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('Save file exported.');
    pop.classList.remove('is-open');
  }
  if (action.dataset.action === 'reset') {
    if (window.confirm('Reset ALL progress across every track? This cannot be undone.')) {
      state = defaultState();
      save();
      render();
      toast('Progress reset. Fresh start, trainer.');
    }
    pop.classList.remove('is-open');
  }
});

document.addEventListener('change', async (event) => {
  const input = event.target.closest('[data-action="import"]');
  if (!input || !input.files || !input.files[0]) return;
  try {
    const parsed = JSON.parse(await input.files[0].text());
    const next = parsed && parsed.version === 4 ? normalizeState(parsed) : migrateLegacy(parsed);
    if (!next) throw new Error('bad save');
    state = next;
    save();
    render();
    toast('Save imported successfully.');
  } catch (error) {
    toast('That file is not a valid PokéSQL save.');
  } finally {
    input.value = '';
  }
});

/* ---------------- Boot ---------------- */

render();
initEngine();
