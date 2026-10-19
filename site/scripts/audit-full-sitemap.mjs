// Exhaustive, read-only validation of every publicly advertised URL.
// Safe: GET only, bounded concurrency (3), short timeouts, no page mutations.
// Exit non-zero only on broken URLs / missing essential SEO fields.
// Report title and description duplication as warnings for review.
const base = "https://lavaner.ee";
const sitemapUrl = base + "/sitemap.xml";
const timeout = 16000;
async function fetchHtml(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(timeout), headers: { "User-Agent": "LAVANER-SEO-Audit/1.0 (+read-only)" } });
  return { status: r.status, type: r.headers.get("content-type") || "", body: await r.text(), finalUrl: r.url };
}
const unescape = (s) => s.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#39;", "'").trim();
function getTag(html, tag, key, value) {
  const tags = [...html.matchAll(new RegExp("<" + tag + "\\b[^>]*>", "gi"))].map(m => m[0]);
  return tags.find(t => new RegExp("\\b" + key + "=[\"']" + value + "[\"']", "i").test(t));
}
function attribute(htmlTag, name) {
  if (!htmlTag) return "";
  const m = htmlTag.match(new RegExp("\\b" + name + "=[\"']([^\"']*)[\"']", "i"));
  return m ? unescape(m[1]) : "";
}
const r = await fetchHtml(sitemapUrl);
if (r.status !== 200 || !r.type.includes("xml")) throw Error("Sitemap unavailable " + r.status);
const urls = [...r.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(x => unescape(x[1]));
if (urls.length < 70) throw Error("Sitemap unexpectedly short (" + urls.length + ")");
if (new Set(urls).size !== urls.length) throw Error("Duplicate sitemap URL(s)");
if (urls.some(u => !u.startsWith(base + "/"))) throw Error("Non-canonical sitemap URL present");
const failures = [], notes = [];
const titles = new Map(), descriptions = new Map();
let next = 0;
async function inspect(url) {
  try {
    const { status, type, body, finalUrl } = await fetchHtml(url);
    const local = [];
    if (status !== 200) local.push("HTTP " + status);
    if (!type.includes("html")) local.push("not HTML " + type);
    const canonicalTag = getTag(body, "link", "rel", "canonical");
    const canonical = attribute(canonicalTag, "href");
    if (canonical !== url) local.push("canonical mismatch: " + (canonical || "(missing)"));
    const title = unescape([...body.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)].map(x => x[1])[0] || "").replace(/<[^>]*>/g, "").trim();
    if (!title) local.push("missing title");
    const description = attribute(getTag(body, "meta", "name", "description"), "content");
    if (!description) local.push("missing meta description");
    if (!getTag(body, "link", "hreflang", "et-EE")) local.push("missing hreflang et-EE");
    if (!getTag(body, "link", "hreflang", "ru-EE")) local.push("missing hreflang ru-EE");
    if (!getTag(body, "link", "hreflang", "en-EE")) local.push("missing hreflang en-EE");
    if (!getTag(body, "link", "hreflang", "x-default")) local.push("missing hreflang x-default");
    const robots = attribute(getTag(body, "meta", "name", "robots"), "content");
    if (/\bnoindex\b/i.test(robots)) local.push("noindex in sitemap");
    const h1 = [...body.matchAll(/<h1(?:\s|>)/gi)].length;
    if (h1 !== 1) notes.push(url + ": expected 1 H1, got " + h1);
    if (title) titles.set(url, title);
    if (description) descriptions.set(url, description);
    if (finalUrl !== url) notes.push(url + ": final fetched URL " + finalUrl);
    if (local.length) failures.push(url + ": " + local.join("; "));
  } catch (e) { failures.push(url + ": " + String(e)); }
}
await Promise.all(Array.from({ length: 3 }, async () => {
  while (next < urls.length) await inspect(urls[next++]);
}));
function duplicated(map, label) {
  const groups = new Map();
  for (const [url, val] of map) groups.set(val, [...(groups.get(val) || []), url]);
  for (const paths of groups.values()) if (paths.length > 1) notes.push("Duplicate " + label + " for " + paths.join(", "));
}
duplicated(titles, "title");
duplicated(descriptions, "description");
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), totalUrls: urls.length, checkedWithTitle: titles.size, checkedWithDescription: descriptions.size, failures, warnings: notes }, null, 2));
if (failures.length) process.exitCode = 1;
