#!/usr/bin/env bash
set -euo pipefail
bunx vite preview --config vite.cloudflare.config.ts --host 127.0.0.1 --port 4173 > /tmp/lavaner-cloudflare-preview.log 2>&1 &
server_pid=$!
trap 'kill "$server_pid" 2>/dev/null || true' EXIT

for attempt in $(seq 1 40); do
  if curl --silent --fail "http://127.0.0.1:4173/" -o /tmp/lavaner-root.html; then break; fi
  sleep 1
done
if [[ ! -s /tmp/lavaner-root.html ]]; then
  cat /tmp/lavaner-cloudflare-preview.log
  echo "Failed to start Cloudflare preview"
  exit 1
fi

for path in / /ru /en /korteri-remont-tallinn /ru/remont-kvartir-tallinn /en/apartment-renovation-tallinn /robots.txt /sitemap.xml /__l5e/assets-v1/f875efee-d7e4-49fd-84bc-be75f5265ded/hero-01.jpg /lavaner-logo-exact.webp; do
  code=$(curl -s -o /tmp/lavaner-response -w '%{http_code}' "http://127.0.0.1:4173$path")
  echo "$path $code $(wc -c </tmp/lavaner-response) bytes"
  if [[ "$code" != "200" ]]; then
    echo "Failed path $path ($code)"
    cat /tmp/lavaner-cloudflare-preview.log
    exit 1
  fi
done

curl -fsS http://127.0.0.1:4173/sitemap.xml | grep -q 'https://lavaner.ee/'
curl -fsS http://127.0.0.1:4173/robots.txt | grep -q 'Sitemap:'
redirect_code=$(curl --silent --output /dev/null --write-out '%{http_code}' --header 'Host: www.lavaner.ee' "http://127.0.0.1:4173/ru/")
echo "www.lavaner.ee -> canonical HTTPS: $redirect_code"
if [[ "$redirect_code" != "301" ]]; then
  echo "Canonical redirect did not return 301"
  exit 1
fi
# Quote storage must not pretend to accept enquiries without a configured D1 binding.
quote_status=$(curl -s -o /tmp/lavaner-quote.json -w '%{http_code}' \
  -X POST 'http://127.0.0.1:4173/api/quote' \
  -H 'Content-Type: application/json' \
  --data '{"name":"Test Client","phone":"+37255555555","email":"test@example.invalid","work":"CI only","locale":"et","source_page":"/","consent":true}')
echo "/api/quote (disabled without D1 binding) => $quote_status"
if [[ "$quote_status" != "503" ]]; then
  echo "Quote endpoint unexpectedly accepted or mishandled enquiry without D1"
  cat /tmp/lavaner-quote.json
  exit 1
fi
# Cloudflare staging must NOT expose its 78 canonical URLs to crawlers.
staging_robots=$(curl -fsS --header 'Host: lavaner-staging.example.workers.dev' 'http://127.0.0.1:4173/robots.txt')
echo "$staging_robots"
echo "$staging_robots" | grep -q '^Disallow: /

if echo "$staging_robots" | grep -q '^Sitemap:'; then
  echo "Staging robots.txt must not advertise the production sitemap"
  exit 1
fi
staging_header=$(curl -s -D - -o /dev/null --header 'Host: lavaner-staging.example.workers.dev' 'http://127.0.0.1:4173/robots.txt')
echo "$staging_header" | tr -d '\r' | grep -qi '^X-Robots-Tag: noindex, nofollow

# In addition to robots.txt, protect SSR HTML from accidental duplicate indexing.
staging_html_headers=$(curl -s -D - -o /dev/null --header 'Host: lavaner-staging.example.workers.dev' 'http://127.0.0.1:4173/')
echo "$staging_html_headers" | tr -d '\r' | grep -qi '^X-Robots-Tag: noindex, nofollow

production_html_headers=$(curl -s -D - -o /dev/null --header 'Host: lavaner.ee' --header 'X-Forwarded-Proto: https' 'http://127.0.0.1:4173/')
if echo "$production_html_headers" | tr -d '\r' | grep -qi '^X-Robots-Tag: noindex'; then
  echo "Production HTML must stay indexable"
  exit 1
fi
echo "Cloudflare local SSR, routes, SEO XML and media smoke checks passed"
