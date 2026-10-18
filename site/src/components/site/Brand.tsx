import { Fragment, type ReactNode } from "react";

/**
 * Название бренда всегда латиницей и без автоперевода Google Translate.
 * Используем translate="no" + класс notranslate.
 */
export function Brand({ suffix = false, className }: { suffix?: boolean; className?: string }) {
  return (
    <span className={`notranslate ${className ?? ""}`.trim()} translate="no">
      {suffix ? "LAVANER OÜ" : "LAVANER"}
    </span>
  );
}

const BRAND_RE = /(LAVANER(?:\s+OÜ)?)/g;

/** Оборачивает все упоминания бренда внутри произвольной строки в notranslate. */
export function BrandText({ children }: { children: ReactNode }) {
  if (typeof children !== "string") return <>{children}</>;
  const parts = children.split(BRAND_RE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="notranslate" translate="no">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Утилита для строк без JSX (alt, aria-label и т.п.) — бренд всегда латиницей. */
export const BRAND = "LAVANER";
export const BRAND_LEGAL = "LAVANER OÜ";