// Server-only D1 capture for LAVANER quote requests. Disabled by default.
// Requires configured Cloudflare D1 binding + env.LEADS_ENABLED='true'. This endpoint
// is not connected to the public form until deployment and anti-spam are verified.
import { createFileRoute } from "@tanstack/react-router";

type QuoteDb = {
  prepare(query: string): {
    bind(...values: unknown[]): { run(): Promise<unknown> };
  };
};
type QuoteEnv = { LEADS?: QuoteDb; LEADS_ENABLED?: string };

function reply(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}
const clean = (s: unknown, max: number) =>
  typeof s === "string" ? s.trim().slice(0, max) : "";

export const Route = createFileRoute("/api/quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const siteUrl = new URL(request.url);
        if (!["https:", "http:"].includes(siteUrl.protocol)) return reply({ ok: false }, 400);
        const origin = request.headers.get("origin");
        if (origin && origin !== siteUrl.origin) return reply({ ok: false, error: "origin" }, 403);
        if (!(request.headers.get("content-type") || "").includes("application/json"))
          return reply({ ok: false, error: "content_type" }, 415);
        if (Number(request.headers.get("content-length") || 0) > 8192)
          return reply({ ok: false, error: "too_large" }, 413);
        let payload: Record<string, unknown>;
        try {
          const raw = await request.text();
          if (raw.length > 8192) return reply({ ok: false, error: "too_large" }, 413);
          const value: unknown = JSON.parse(raw);
          if (!value || typeof value !== "object" || Array.isArray(value))
            return reply({ ok: false, error: "invalid" }, 400);
          payload = value as Record<string, unknown>;
        } catch {
          return reply({ ok: false, error: "invalid" }, 400);
        }
        if (clean(payload.company, 100)) return reply({ ok: false, error: "rejected" }, 422);
        const name = clean(payload.name, 100);
        const phone = clean(payload.phone, 40);
        const email = clean(payload.email, 200);
        const project = clean(payload.work, 3000);
        const locale = ["et", "ru", "en"].includes(payload.locale as string)
          ? payload.locale as string : "et";
        const page = clean(payload.source_page, 300);
        if (name.length < 2 || !/^\\+?[0-9 ()-]{6,35}$/.test(phone) ||
            (email.length > 0 && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) ||
            payload.consent !== true)
          return reply({ ok: false, error: "validation" }, 422);

        // Bindings are only supplied by Cloudflare Workers and are intentionally optional
        // until we are ready to enable a secure production form.
        let settings: QuoteEnv;
        try {
          const runtime = await import("cloudflare:workers");
          settings = runtime.env as unknown as QuoteEnv;
        } catch {
          return reply({ ok: false, error: "not_configured" }, 503);
        }
        if (!settings.LEADS || settings.LEADS_ENABLED !== "true")
          return reply({ ok: false, error: "not_configured" }, 503);
        try {
          const id = crypto.randomUUID();
          const now = new Date().toISOString();
          await settings.LEADS
            .prepare(`INSERT INTO quote_enquiries
              (id, name, phone, email, project_description, locale, source_page, consent_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
            .bind(id, name, phone, email || null, project || null, locale, page, now)
            .run();
          // No PII in analytics/logs. Return a receipt only after confirmed DB write.
          return reply({ ok: true, reference: id }, 201);
        } catch (e) {
          console.error("Unable to store quote enquiry", e instanceof Error ? e.name : "unknown");
          return reply({ ok: false, error: "unavailable" }, 503);
        }
      },
    },
  },
});
