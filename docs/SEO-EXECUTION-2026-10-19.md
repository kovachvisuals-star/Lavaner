# LAVANER — SEO execution priorities (19 October 2026)

Source: Google Search Console, sc-domain:lavaner.ee, 10–16 October 2026. This is a planning document only; it does not change the production website.

## Verified query/page opportunities
| Query | Landing page | Impressions | Average position | Action |
|---|---|---:|---:|---|
| katusetööd tallinnas | /katustood | 1 | 22 | Improve clear service description, proof of completed roofing projects, request-a-quote CTA |
| siseviimistlustööd tallinnas | /siseviimistlus | 12 | 73.5 | Explain actual finishing tasks and service area; link to matching completed projects |
| siseviimistlus | /siseviimistlus | 11 | 93.09 | Strengthen page relevance and internal links |
| maja renoveerimine | /maja-renoveerimine | 5 | 86 | Describe renovation scope and workflow, avoid unsupported claims |
| vannitoa ehitus | /vannitoa-remont | 4 | 49 | Answer real bathroom renovation questions and surface contact CTA |
| fassaaditööd | /fassaaditood | 1 | 87 | Add verified façade work examples |
| ehitusfirma tallinnas | / | 1 | 22 | Clarify geographic coverage and services |

## Priority checks before any production deployment
1. Keep PR #5 as draft until CI and Cloudflare staging are verified; no automatic DNS changes.
2. Validate titles, descriptions, H1, canonical, hreflang, status codes and crawl rules for ET/RU/EN URLs.
3. Do not create location doorway pages or claim work in specific areas without evidence.
4. Fix misleading intent: marine construction queries (laevakerede ehitus) do not represent intended building leads.
5. Verify lead conversion tracking: mailto clicks are not submitted enquiries.
6. Measure clicks, impressions, CTR, average position and actual leads 7 days after deployment, comparing full periods.

## Acceptance criteria
- Production URLs return 200 with correct canonical and language alternates.
- Relevant pages appear in sitemap and have no unintended noindex.
- Real lead submission path is verified, or clearly labelled email-launch only.
- No claim of indexing or ranking improvement without fresh Search Console evidence.
