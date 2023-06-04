CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email varchar(320) not null,
  password text not null,
  "emailVerified" boolean default false,
  "createdAt" timestamptz not null default NOW(),
  "updatedAt" timestamptz not null default NOW(),
  UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS signup_tokens (
  id SERIAL PRIMARY KEY,
  email varchar(320) not null,
  token varchar(64) not null,
  "expirationAt" timestamptz not null default NOW() + (60 ||' minutes')::interval,
  "createdAt" timestamptz not null default NOW(),
  "updatedAt" timestamptz not null default NOW(),
  UNIQUE (email)
);
