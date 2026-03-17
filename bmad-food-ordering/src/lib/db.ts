import postgres from 'postgres';

// Initialize the database connection.
// To use this, create a .env.local file with your DATABASE_URL
// e.g., DATABASE_URL=postgres://user:password@localhost:5432/bmad_food_ordering
const sql = postgres(process.env.DATABASE_URL || 'postgres://localhost:5432/bmad_food_ordering', {
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export default sql;