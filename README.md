# LAVANER — сайт будівельної компанії (Estonia)

**Статус:** основний `https://lavaner.ee` зараз працює з Lovable. У цьому GitHub-репозиторії підготовлено **незалежну копію коду та медіафайлів** — жоден коміт тут сам по собі не змінює діючий сайт.

## Де код та поточна робота

- [Код усіх мовних версій, сторінок, SEO та Cloudflare-збірки](https://github.com/kovachvisuals-star/Lavaner/tree/direct-seo-2026-10-18/site)
- [Draft PR #5 — увесь пакет змін](https://github.com/kovachvisuals-star/Lavaner/pull/5)
- [Issue #6 — що потрібно перед незалежним запуском](https://github.com/kovachvisuals-star/Lavaner/issues/6)
- [План релізу українською](https://github.com/kovachvisuals-star/Lavaner/blob/direct-seo-2026-10-18/docs/RELEASE-CHECKLIST-UK.md)

## Мета проєкту

Перенести керування кодом, SEO, заявками та розгортанням із платного AI-редактора Lovable у GitHub + Cloudflare Workers, **без споживання кредитів Lovable**. При цьому дизайн, маршрути ET/RU/EN, власні фото об'єктів та SEO повинні зберегтися.

## Запобіжники

- Не перемикати DNS `lavaner.ee` до перевіреного staging та окремого підтвердження власника.
- Не зливати PR #5 до нових успішних тестів на актуальній версії.
- Не вмикати `VITE_DIRECT_QUOTE_ENABLED` і `LEADS_ENABLED`, доки не налаштована база D1, Cloudflare Turnstile, доступ менеджера до заявок і захист даних.
- Не комітити токени, секрети, приватні дані клієнтів чи реальні заявки.

Основний зміст сайту — естонською, російською й англійською; головний ринок Tallinn/Harjumaa.
