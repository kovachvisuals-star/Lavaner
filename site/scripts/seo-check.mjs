import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const load = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const checks = [
  ['Production base URL uses https', () => load('src/lib/routes-map.ts').includes('https://lavaner.ee')],
  ['Site pause switch is off', () => /SITE_PAUSED\s*=\s*false/.test(load('src/lib/site-status.ts'))],
  ['Sitemap route is present', () => load('src/routes/sitemap[.]xml.tsx').includes('application/xml')],
  ['Multilingual alternate metadata is present', () => load('src/lib/seo.ts').includes('hrefLang')],
  ['Quote form does not falsely claim a lead', () => {
    const form = load('src/components/site/QuoteForm.tsx');
    return form.includes('track("email_click", {') && !form.includes('track("generate_lead", {');
  }],
  ['Service pages for roof, facade and houses exist', () => {
    const routes = load('src/lib/routes-map.ts');
    return ['katustood', 'fassaaditood', 'eramute-ehitus'].every((s) => routes.includes(s));
  }],
  ['No environment secret checked into source mirror', () => !fs.existsSync(path.join(root, '.env'))],
];
let errors = 0;
for (const [name, fn] of checks) {
  const passed = Boolean(fn());
  process.stdout.write(`${passed ? 'PASS' : 'FAIL'}: ${name}\n`);
  if (!passed) errors++;
}
if (errors) process.exitCode = 1;
