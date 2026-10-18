-- Private LAVANER quote enquiries: no public read route; insert only through validated server endpoint.
CREATE TABLE IF NOT EXISTS quote_enquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  project_description TEXT,
  locale TEXT NOT NULL DEFAULT 'et',
  source_page TEXT,
  consent_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
);
CREATE INDEX IF NOT EXISTS quote_enquiries_created_at ON quote_enquiries(created_at);
