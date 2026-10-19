import { useEffect, useRef, useState } from "react";

type WidgetConfig = {
  sitekey: string;
  theme: "auto";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};
type TurnstileApi = {
  render: (element: HTMLElement, options: WidgetConfig) => string;
  remove: (id: string) => void;
};
type TurnstileWindow = Window & { turnstile?: TurnstileApi };

let pendingLoader: Promise<TurnstileApi> | null = null;

function ensureTurnstile(): Promise<TurnstileApi> {
  const current = (window as TurnstileWindow).turnstile;
  if (current) return Promise.resolve(current);
  if (pendingLoader) return pendingLoader;
  pendingLoader = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const loaded = (window as TurnstileWindow).turnstile;
      if (loaded) resolve(loaded);
      else reject(new Error("Turnstile script not ready"));
    };
    script.onerror = () => {
      pendingLoader = null;
      script.remove();
      reject(new Error("Turnstile script unavailable"));
    };
    document.head.appendChild(script);
  });
  return pendingLoader;
}

/** Shown only for opt-in, server-backed quote delivery. Does not transmit user data. */
export function TurnstileChallenge({
  siteKey,
  onToken,
}: {
  siteKey: string;
  onToken: (token: string | null) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    let alive = true;
    let widgetId: string | null = null;
    let api: TurnstileApi | null = null;
    onToken(null);
    ensureTurnstile()
      .then((instance) => {
        if (!alive || !host.current) return;
        api = instance;
        widgetId = instance.render(host.current, {
          sitekey: siteKey,
          theme: "auto",
          callback: (token) => { if (alive) onToken(token); },
          "expired-callback": () => { if (alive) onToken(null); },
          "error-callback": () => { if (alive) { onToken(null); setUnavailable(true); } },
        });
      })
      .catch(() => { if (alive) { onToken(null); setUnavailable(true); } });
    return () => {
      alive = false;
      if (widgetId && api) {
        try { api.remove(widgetId); } catch { /* already detached */ }
      }
    };
  }, [siteKey, onToken]);

  return (
    <div className="sm:col-span-2">
      <div ref={host} aria-label="Spam protection" />
      {unavailable ? (
        <p role="alert" className="mt-2 text-xs text-destructive">
          The spam check is unavailable. Please contact info@lavaner.ee.
        </p>
      ) : null}
    </div>
  );
}
