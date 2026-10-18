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
echo "Cloudflare local SSR, routes, SEO XML and media smoke checks passed"
