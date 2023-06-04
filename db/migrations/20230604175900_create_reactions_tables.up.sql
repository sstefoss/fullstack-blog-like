CREATE TYPE reaction_type AS ENUM ('LIKE', 'DISLIKE');

CREATE TABLE IF NOT EXISTS reactions (
  "userId" integer not null REFERENCES users(id),
  "postId" integer not null REFERENCES posts(id),
  "type" reaction_type not null,
  "createdAt" timestamptz not null default NOW(),
  "updatedAt" timestamptz not null default NOW(),
  
  PRIMARY KEY ("userId", "postId")
);