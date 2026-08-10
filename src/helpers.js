// Shared helpers available to every content file and the runtime.

const escapeHtml = (value) => String(value ?? 'NULL')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const fmtNum = (value) => typeof value === 'number' && Number.isFinite(value)
  ? value.toLocaleString('en-US', { maximumFractionDigits: 2 })
  : value;

// Simple SQL keyword highlighter for plain-text queries.
const SQL_KEYWORDS = /\b(SELECT|FROM|WHERE|AND|OR|NOT|ORDER BY|GROUP BY|HAVING|LIMIT|AS|ON|LEFT JOIN|INNER JOIN|JOIN|IS NULL|IS NOT NULL|NULL|DISTINCT|CASE|WHEN|THEN|ELSE|END|WITH|OVER|PARTITION BY|ROW_NUMBER|RANK|LAG|LEAD|COUNT|SUM|AVG|MIN|MAX|ROUND|NULLIF|COALESCE|CAST|BETWEEN|IN|LIKE|UNION ALL|UNION|ASC|DESC)\b/gi;
const highlightSql = (sql) => escapeHtml(sql)
  .replace(/&#039;([^&]*?)&#039;/g, '<span class="code-val">&#039;$1&#039;</span>')
  .replace(SQL_KEYWORDS, (kw) => `<span class="code-kw">${kw}</span>`);
