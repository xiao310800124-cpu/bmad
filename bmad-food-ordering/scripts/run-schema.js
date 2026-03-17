const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Load .env.development.local if present
try { require('dotenv').config({ path: path.resolve(process.cwd(), '.env.development.local') }); } catch (e) {}

async function run() {
  const conn = process.env.DATABASE_URL || process.env.DATABASE_URL_UNPOOLED || process.env.POSTGRES_URL;
  if (!conn) {
    console.error('No DATABASE_URL found in environment or .env.development.local');
    process.exit(1);
  }

  const sqlPath = path.resolve(process.cwd(), 'src', 'db', 'schema.sql');
  if (!fs.existsSync(sqlPath)) {
    console.error('Schema file not found at', sqlPath);
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlPath, 'utf8');
  const client = new Client({ connectionString: conn });
  try {
    await client.connect();
    // Split on semicolon followed by newline to roughly separate statements
    // and execute sequentially to avoid very large single-query issues.
    const stmts = sql.split(/;\s*\n/).map(s=>s.trim()).filter(Boolean);
    for (const s of stmts) {
      await client.query(s);
    }
    console.log('Schema applied successfully');
  } catch (err) {
    console.error('Error applying schema:', err.message || err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
