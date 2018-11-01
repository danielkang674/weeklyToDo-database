DROP TABLE IF EXISTS "todos" CASCADE;
CREATE TABLE "todos" (
  "id"  SERIAL,
  "item"  VARCHAR(1000),
  "days_id"  INTEGER,
  PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "days" CASCADE;
CREATE TABLE "days" (
  "id"  SERIAL,
  "day"  VARCHAR(255),
  PRIMARY KEY ("id")
);

ALTER TABLE "todos" ADD FOREIGN KEY ("days_id") REFERENCES "days" ("id");
INSERT INTO days (day) VALUES 
('Monday'), ('Tuesday'), ('Wednesday'), ('Thursday'), ('Friday'), ('Saturday'), ('Sunday');