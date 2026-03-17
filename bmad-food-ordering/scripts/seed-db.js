const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.development.local') });

async function run() {
  const conn = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!conn) {
    console.error('No DATABASE_URL found');
    process.exit(1);
  }

  const client = new Client({ connectionString: conn });
  await client.connect();

  try {
    // Insert two restaurants
    const r1 = await client.query(
      `INSERT INTO restaurants (name, description, hero_image) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING RETURNING id`,
      ['Green Bowl', 'Healthy salads and bowls', '/public/restaurant-salad.jpg']
    );
    const r2 = await client.query(
      `INSERT INTO restaurants (name, description, hero_image) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING RETURNING id`,
      ['Noodle House', 'Comforting noodle soups', '/public/restaurant-noodles.jpg']
    );

    const restaurantId1 = r1.rows[0]?.id;
    const restaurantId2 = r2.rows[0]?.id;

    // Insert menu items (use RETURNING to avoid duplicates check in example)
    if (restaurantId1) {
      await client.query(`INSERT INTO menu_items (restaurant_id, name, description, price) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`, [restaurantId1, 'Chicken Bowl', 'Grilled chicken with rice and greens', 7.50]);
      await client.query(`INSERT INTO menu_items (restaurant_id, name, description, price) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`, [restaurantId1, 'Vegan Bowl', 'Tofu, quinoa, seasonal veg', 8.00]);
    }
    if (restaurantId2) {
      await client.query(`INSERT INTO menu_items (restaurant_id, name, description, price) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`, [restaurantId2, 'Pork Ramen', 'Slow-cooked pork, soft egg', 9.50]);
      await client.query(`INSERT INTO menu_items (restaurant_id, name, description, price) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`, [restaurantId2, 'Veggie Udon', 'Thick noodles with seasonal veg', 8.25]);
    }

    console.log('Seed complete');
  } catch (err) {
    console.error('Seed error', err);
  } finally {
    await client.end();
  }
}

run();
