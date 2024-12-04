-- Safely alter the "budget" column to change its type
ALTER TABLE "Movie"
ALTER COLUMN "budget" TYPE INTEGER USING ("budget"::INTEGER);

-- Alter the "duration" column to set its default and change its type
ALTER TABLE "Movie"
ALTER COLUMN "duration" SET DEFAULT '0',
ALTER COLUMN "duration" TYPE TEXT;
