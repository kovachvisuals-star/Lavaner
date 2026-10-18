# LAVANER — direct source and hosting

This branch holds a source snapshot prepared from the owner's Lovable project on 2026-10-18. It is not connected to the live deployment.

## Safety
- Never commit `.env`, API keys, or private credentials.
- Test ET/RU/EN routes, `/robots.txt`, `/sitemap.xml`, redirects, images and contact submission on a staging host first.
- The source uses `@lovable.dev/vite-tanstack-config` and Lovable asset references at `/__l5e/...`; **these image paths are not portable by default**. Download and rehost the owner-authorized assets before switching hosting.
- Deploy to a separately configured hosting provider (e.g. Cloudflare Workers/Pages) with correct build output and DNS access. Changing nameservers/domain records is a separate verified step.
- Until the site is working end-to-end on a new host, leave lavaner.ee's current routing untouched.

## SEO work
- Optimize Estonian titles/descriptions based on confirmed Search Console queries; preserve service slugs and multilingual canonical/hreflang.
- Track `email_click`, not `generate_lead`, for mailto forms. Real form submissions require a secure server endpoint and verified delivery.
- No claims of Google rankings or indexing without Search Console evidence.
