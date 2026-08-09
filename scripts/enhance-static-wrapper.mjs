import { readFile, writeFile } from "node:fs/promises";

const target = new URL("../public/pokysql-academy.html", import.meta.url);
let html = await readFile(target, "utf8");

if (html.includes('id="course-frame"')) {
  throw new Error("The static wrapper has already been enhanced.");
}

const metadata = `<title>PokéSQL Academy</title>
<meta name="description" content="A progressive, hands-on SQL and AdTech interview academy built for The Trade Desk Platform Support Analyst path.">
<meta property="og:title" content="PokéSQL Academy">
<meta property="og:description" content="SQL → AdTech → Interview Ready">
<meta property="og:type" content="website">
<meta property="og:url" content="https://christianbragado.github.io/pokysql-academy/">
<meta property="og:image" content="https://christianbragado.github.io/pokysql-academy/og-pokysql-academy.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="PokéSQL Academy">
<meta name="twitter:description" content="SQL → AdTech → Interview Ready">
<meta name="twitter:image" content="https://christianbragado.github.io/pokysql-academy/og-pokysql-academy.png">
<script>
(() => {
  const storageKey = 'pokysql-theme-v1';
  let theme = 'light';
  try {
    const saved = localStorage.getItem(storageKey);
    theme = saved === 'light' || saved === 'dark'
      ? saved
      : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch (error) {
    theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = theme;
})();
</script>`;

const shellStyles = `<style>
:root{color-scheme:light dark;background:light-dark(rgb(255 255 255),rgb(24 24 24));font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
:root[data-theme="light"]{color-scheme:light}
:root[data-theme="dark"]{color-scheme:dark}
html,body{margin:0;min-height:100%}
body{box-sizing:border-box;height:100vh;padding:1rem;display:grid;grid-template-rows:auto minmax(0,1fr);gap:.75rem;background:inherit;transition:background-color .2s ease,color .2s ease}
.progress-shell{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.65rem .8rem;border:1px solid light-dark(#dce3ed,#343c48);border-radius:14px;background:light-dark(#fff,#202020);color:light-dark(#182033,#f4f6fb)}
.progress-copy{display:grid;gap:.1rem}.progress-copy strong{font-size:.85rem;font-weight:600}.progress-copy span{font-size:.72rem;color:light-dark(#667085,#a9b0bc)}
.progress-actions{display:flex;gap:.45rem;flex-wrap:wrap;justify-content:flex-end}.progress-action{appearance:none;border:1px solid light-dark(#cfd8e4,#46505f);border-radius:9px;padding:.42rem .65rem;background:light-dark(#f4f6f9,#2a2f37);color:inherit;font:500 .74rem/1.2 inherit;cursor:pointer}.progress-action:hover,.progress-action:focus-visible{border-color:light-dark(#a45b08,#f2b94b)}
.theme-action{display:inline-flex;align-items:center;justify-content:center;gap:.38rem;min-width:6.2rem}.theme-icon{font-size:.9rem;line-height:1}
.import-label{position:relative;overflow:hidden}.import-label input{position:absolute;inline-size:1px;block-size:1px;opacity:0}
iframe{display:block;width:100%;height:100%;min-height:0;margin:0 auto;border:0}
@media(prefers-reduced-motion:reduce){body{transition:none}}
@media(max-width:620px){body{padding:.55rem}.progress-shell{align-items:flex-start;flex-direction:column}.progress-actions{justify-content:flex-start}.progress-action{font-size:.7rem;padding:.4rem .55rem}}
</style>`;

const toolbar = `<header class="progress-shell" aria-label="Progress portability tools">
  <div class="progress-copy"><strong>Cross-device progress</strong><span id="progress-status">Preparing your saved progress…</span></div>
  <div class="progress-actions">
    <button id="theme-toggle" class="progress-action theme-action" type="button" aria-pressed="false"><span id="theme-icon" class="theme-icon" aria-hidden="true">☀</span><span id="theme-label">Light</span></button>
    <button id="copy-progress" class="progress-action" type="button">Copy progress link</button>
    <button id="export-progress" class="progress-action" type="button">Export save</button>
    <label class="progress-action import-label">Import save<input id="import-progress" type="file" accept="application/json,.json"></label>
  </div>
</header>`;

const syncScript = `<script>
(() => {
  const storageKey = 'pokysql-course-progress-v3';
  const themeStorageKey = 'pokysql-theme-v1';
  const frame = document.getElementById('course-frame');
  const status = document.getElementById('progress-status');
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  let theme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const sendTheme = () => frame.contentWindow.postMessage({ type: 'pokysql-theme', theme }, '*');
  const renderTheme = () => {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Dark mode active. Switch to light mode.' : 'Light mode active. Switch to dark mode.');
    themeToggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    themeIcon.textContent = isDark ? '☾' : '☀';
    themeLabel.textContent = isDark ? 'Dark' : 'Light';
  };
  const setTheme = (nextTheme, persist = true) => {
    theme = nextTheme === 'dark' ? 'dark' : 'light';
    renderTheme();
    if (persist) {
      try { localStorage.setItem(themeStorageKey, theme); } catch (error) {}
    }
    sendTheme();
  };
  const parseHash = () => {
    try {
      const encoded = new URLSearchParams(location.hash.slice(1)).get('progress');
      return encoded ? JSON.parse(atob(encoded)) : null;
    } catch (error) { return null; }
  };
  const readStored = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || 'null'); }
    catch (error) { return null; }
  };
  const portableState = (state) => ({
    completed: state.completed || [],
    passed: state.passed || [],
    labCompleted: state.labCompleted || [],
    module: Number.isInteger(state.module) ? state.module : 0,
    step: Number.isInteger(state.step) ? state.step : 0,
    xp: Number.isFinite(state.xp) ? state.xp : 0
  });
  const updateHash = (state) => {
    const encoded = encodeURIComponent(btoa(JSON.stringify(portableState(state))));
    history.replaceState(null, '', location.pathname + location.search + '#progress=' + encoded);
  };
  const storeProgress = (state) => {
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch (error) {}
    updateHash(state);
    const badges = Array.isArray(state.completed) ? state.completed.length : 0;
    const labs = Array.isArray(state.labCompleted) ? state.labCompleted.length : 0;
    status.textContent = 'Saved on this device · ' + badges + '/12 badges · ' + labs + '/12 labs';
  };
  const initialState = parseHash() || readStored() || {};
  let latestState = initialState;

  window.addEventListener('message', (event) => {
    if (event.source !== frame.contentWindow || !event.data) return;
    if (event.data.type === 'pokysql-ready') {
      frame.contentWindow.postMessage({ type: 'pokysql-load-progress', state: initialState }, '*');
      sendTheme();
      return;
    }
    if (event.data.type === 'pokysql-progress' && event.data.state && typeof event.data.state === 'object') {
      latestState = event.data.state;
      storeProgress(latestState);
    }
  });

  themeToggle.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
  renderTheme();

  document.getElementById('copy-progress').addEventListener('click', async () => {
    storeProgress(latestState);
    try {
      await navigator.clipboard.writeText(location.href);
      status.textContent = 'Progress link copied — open it on another computer.';
    } catch (error) {
      window.prompt('Copy this progress link:', location.href);
    }
  });

  document.getElementById('export-progress').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(latestState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pokysql-progress.json';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    status.textContent = 'Save file exported.';
  });

  document.getElementById('import-progress').addEventListener('change', async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const imported = JSON.parse(await file.text());
      if (!imported || typeof imported !== 'object') throw new Error('Invalid save file');
      latestState = imported;
      storeProgress(latestState);
      frame.contentWindow.postMessage({ type: 'pokysql-load-progress', state: latestState }, '*');
      status.textContent = 'Save imported successfully.';
    } catch (error) {
      status.textContent = 'That file is not a valid PokéSQL save.';
    } finally {
      event.target.value = '';
    }
  });
})();
</script>`;

html = html.replace("<title>Pokysql Academy</title>", metadata);
html = html.replace(/<style>:root\{color-scheme:[\s\S]*?<\/style>/, shellStyles);
html = html.replace("<body>\n<iframe ", `<body>\n${toolbar}\n<iframe id="course-frame" `);
html = html.replace("</iframe>\n</body>", `</iframe>\n${syncScript}\n</body>`);

if (!html.includes('id="course-frame"') || !html.includes('id="copy-progress"') || !html.includes('id="theme-toggle"')) {
  throw new Error("Failed to enhance the static course wrapper.");
}

await writeFile(target, html);
