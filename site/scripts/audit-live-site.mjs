// Read-only public SEO audit. Makes GET/HEAD requests only; never changes DNS or live content.
const host = "https://lavaner.ee";
const failures = [];
const assert = (condition, msg) => { if (!condition) failures.push(msg); };
const fetchChecked = async (path, options = {}) => {
  const url = host + path;
  const response = await fetch(url, { signal: AbortSignal.timeout(15000), ...options });
  console.log(`${url} => ${response.status} | ${response.headers.get("content-type") || "unknown"}`);
  return response;
};
for (const path of ["/", "/ru", "/en", "/korteri-remont-tallinn", "/ru/remont-kvartir-tallinn", "/en/apartment-renovation-tallinn"]) {
  const response = await fetchChecked(path);
  assert(response.status === 200, `${path} returned ${response.status}, expected 200`);
  const html = await response.text();
  assert(/<html[\s>]/i.test(html), `${path} did not return HTML`);
  assert(/rel=["']canonical["']/i.test(html), `${path} missing canonical tag`);
  assert(/hreflang/i.test(html), `${path} missing language alternates`);
  assert(!/<meta[^>]+(?:name=["']robots["'][^>]+content=["'][^"']*noindex|content=["'][^"']*noindex[^>]+name=["']robots["'])/i.test(html), `${path} appears noindex`);
  assert(!/noindex/i.test(response.headers.get("x-robots-tag") || ""), `${path} noindex response header`);
}
const robots = await fetchChecked("/robots.txt");
const robotsBody = await robots.text();
assert(robots.status === 200, "robots.txt is not 200");
assert(/sitemap:/i.test(robotsBody), "robots.txt missing Sitemap");
const sitemap = await fetchChecked("/sitemap.xml");
const sitemapBody = await sitemap.text();
const urls = [...sitemapBody.matchAll(/<url>/g)].length;
console.log("Sitemap entries", urls);
assert(sitemap.status === 200, "sitemap.xml is not 200");
assert(urls >= 70, "sitemap.xml has fewer than 70 entries");
try {
  const res = await fetch("http://lavaner.ee/", { redirect: "manual", signal: AbortSignal.timeout(15000) });
  console.log("http://lavaner.ee ->", res.status, res.headers.get("location"));
  assert([301, 308].includes(res.status), "HTTP did not return permanent redirect");
  assert((res.headers.get("location") || "").startsWith("https://lavaner.ee"), "HTTP destination is not canonical HTTPS");
} catch (e) {
  console.warn("HTTP protocol check failed:", String(e));
  failures.push("Could not verify HTTP->HTTPS redirect from runner");
}
if (failures.length) {
  console.error("LIVE SEO FAILURES:", failures.join("; "));
  process.exitCode = 1;
} else {
  console.log("Public site audit passed: HTML, canonical/hreflang, index permissions, sitemap, robots, HTTP redirect");
}
