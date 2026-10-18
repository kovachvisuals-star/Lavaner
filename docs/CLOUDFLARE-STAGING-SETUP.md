# Cloudflare staging for LAVANER (no Lovable credits)

The LAVANER website source is in `site/` on the GitHub branch `direct-seo-2026-10-18`. GitHub Actions confirms successful standard and Cloudflare builds, sitemap/robots, ET/RU/EN SSR routes and public media smoke tests.

## One-time account connection

Cloudflare Workers Free can be used for a low-volume site within applicable limits. Its **100,000 requests per day** limit is not guaranteed traffic capacity. Keep the production domain unchanged during setup.

1. Open [Cloudflare dashboard](https://dash.cloudflare.com) and sign in/create an account. Copy the account ID from your Cloudflare account overview / Workers & Pages.
2. Under profile > API Tokens, create a scoped token with permission to edit/deploy Workers scripts in the chosen Cloudflare account. Do not paste this token in ChatGPT or commit it to the repository.
3. Open [GitHub repository Actions secrets](https://github.com/kovachvisuals-star/Lavaner/settings/secrets/actions). Add two **repository secrets**:
   - `CLOUDFLARE_API_TOKEN` = scoped deployment token.
   - `CLOUDFLARE_ACCOUNT_ID` = Cloudflare account ID.
4. Open [Actions](https://github.com/kovachvisuals-star/Lavaner/actions/workflows/deploy-cloudflare-staging.yml). Choose **Deploy LAVANER to Cloudflare staging**, select `direct-seo-2026-10-18`, then **Run workflow**. Workflow is manual and deploys `lavaner-staging` only. It does not modify `lavaner.ee` DNS.

## Validate before production

- Obtain the new `*.workers.dev` URL from Cloudflare or the job logs.
- Test /, /ru, /en, /korteri-remont-tallinn, /ru/remont-kvartir-tallinn, /en/apartment-renovation-tallinn, /robots.txt, /sitemap.xml, and media.
- Ensure staging pages aren't indexed as duplicates while the existing `lavaner.ee` site remains live.
- Check analytics, 301 redirects, 404, image integrity and actual form delivery.
- The existing form merely opens a mail app and **is not a server-side lead intake**. Do not start paid ads before replacing it with a tested secure endpoint. Never log contact PII in analytics.
- Only after all tests pass, connect the main domain with a carefully checked DNS update and verify HTTPS + SEO. DNS changes are deliberately not automated by this branch.

## Source integrity

The source contains `src/assets/**/*.asset.json` descriptors with original `/__l5e/assets-v1/...` URLs. The corresponding published binary assets were archived to `site/public/__l5e/assets-v1/...` and validated. The original `src/assets/lavaner-logo.png.asset.json` points to a legacy JPEG binary despite the PNG filename; the archive script correctly validates the content against `content_type: image/jpeg`.

## Current GitHub checks

See [draft pull request #5](https://github.com/kovachvisuals-star/Lavaner/pull/5). Do not merge until live preview and form handling are verified.
