// Dependency-free structural audit of the GitHub copy.
// Run from site/: bun scripts/validate-source.mjs
import { readdir, readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { LANGS } from "../src/lib/i18n.ts";
import { SERVICE_KEYS, SERVICE_SLUGS, PAGE_KEYS, PAGE_SLUGS, homeUrl, serviceUrl, pageUrl, SITE_URL } from "../src/lib/routes-map.ts";
const root = process.cwd();
const failures = [];
function check(ok, message) { if (!ok) failures.push(message); }
check(SITE_URL === "https://lavaner.ee", "Unexpected canonical origin");
check(LANGS.join(",") === "et,ru,en", "Language configuration unexpectedly changed");
const publicRoutes = [];
for (const lang of LANGS) {
  publicRoutes.push(homeUrl(lang));
  for (const key of SERVICE_KEYS) {
    check(Boolean(SERVICE_SLUGS[key]?.[lang]), "Missing service slug: " + key + "/" + lang);
    publicRoutes.push(serviceUrl(lang, key));
  }
  for (const key of PAGE_KEYS.filter(k => k !== "blog")) {
    check(Boolean(PAGE_SLUGS[key]?.[lang]), "Missing page slug: " + key + "/" + lang);
    publicRoutes.push(pageUrl(lang, key));
  }
}
check(publicRoutes.length === 78, "Expected 78 public URLs, got " + publicRoutes.length);
check(publicRoutes.length === new Set(publicRoutes).size, "Duplicate public URL");
check(!publicRoutes.some(u => /\/blogi?$/.test(u)), "Unpublished blog accidentally in sitemap");
for (const path of publicRoutes) check(path.startsWith("/"), "Invalid route " + path);
async function walk(dir) {
  let files = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(path));
    else if (e.name.endsWith(".asset.json")) files.push(path);
  }
  return files;
}
const descriptors = await walk(resolve(root, "src/assets"));
let mediaBytes = 0;
for (const descriptor of descriptors) {
  const content = JSON.parse(await readFile(descriptor, "utf8"));
  check(content.url?.startsWith("/__l5e/assets-v1/"), "Unexpected descriptor path " + descriptor);
  const filename = resolve(root, "public", content.url?.slice(1) ?? "__missing__");
  try {
    const size = (await stat(filename)).size;
    check(size === content.size, "Asset length differs: " + content.url);
    mediaBytes += size;
  } catch {
    failures.push("Missing archived asset: " + content.url);
  }
}
for (const path of ["lavaner-logo-exact.webp", "favicon.ico", "icon-192.png", "icon-512.png"]) {
  try { check((await stat(resolve(root, "public", path))).size > 100, "Empty public asset " + path); }
  catch { failures.push("Missing public binary " + path); }
}
const quote = await readFile(resolve(root, "src/components/site/QuoteForm.tsx"), "utf8");
check(quote.includes('track("email_click"'), "Missing honest mailto click event");
check(quote.includes('DIRECT_QUOTE_ENABLED'), "Missing opt-in direct quote feature flag");
check(!quote.includes('track("generate_lead", {\n      form_name'), "A mailto click may be incorrectly recorded as generated lead");
const workers = await readFile(resolve(root, "wrangler.jsonc"), "utf8");
check(workers.includes('"lavaner-staging"'), "No separate Cloudflare staging worker name");
const result = { publicUrls: publicRoutes.length, languages: LANGS, serviceTypes: SERVICE_KEYS.length, archivedMedia: descriptors.length, mediaMB: +(mediaBytes/1048576).toFixed(2), failures };
console.log(JSON.stringify(result,null,2));
if (failures.length) process.exitCode = 1;
