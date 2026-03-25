import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function seed() {
  await sql`
    CREATE TABLE IF NOT EXISTS todos (
      id   SERIAL PRIMARY KEY,
      text TEXT    NOT NULL,
      done BOOLEAN NOT NULL DEFAULT false
    )
  `;

  await sql`
    INSERT INTO todos (text, done) VALUES
      ('Learn Next.js App Router', true),
      ('Build a todos page',       true),
      ('Add navigation header',    false),
      ('Deploy to production',     false)
  `;

  console.log('Done!');
}

seed().catch(console.error);
