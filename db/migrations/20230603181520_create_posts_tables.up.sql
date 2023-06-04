CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title varchar(320) not null,
  body text not null,
  "createdAt" timestamptz not null default NOW(),
  "updatedAt" timestamptz not null default NOW()
);