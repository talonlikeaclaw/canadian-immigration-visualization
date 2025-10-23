/**
 * Database Seeder Script
 * -----------------------
 * Seeds MongoDB collections with data parsed from CSV files.
 *
 * - Immigration CSV data → "immigration" collection
 * - Language CSV data → "languages" collection
 *
 * Run manually with:
 *    node seed.mjs
 *
 * Notes:
 * - Requires .env file with DB_NAME and ATLAS_URI_DEV/PROD.
 *   - Temporarily move your .env to the db/ directory when running.
 * - Clears each collection before inserting fresh data.
 */
import { db } from './db.mjs';
import { parseImmigrationCSV, parseLanguageCSV } from './csvParser.mjs';

const DB_NAME = process.env.DB_NAME;

if (!DB_NAME) {
  console.error('[DB] Missing DB_NAME environment variable.');
  process.exit(1);
}

try {
  console.log('[DB] Starting database seeding...');
  await db.connect(DB_NAME);

  // Immigration data
  await db.setCollection('immigration');
  console.log('[DB] Parsing immigration CSV...');
  const immigrationData = await parseImmigrationCSV();
  await db.dropAndSeed(immigrationData);

  // Language data
  await db.setCollection('languages');
  console.log('[DB] Parsing language CSV...');
  const languageData = await parseLanguageCSV();
  await db.dropAndSeed(languageData);

  console.log('[DB] Seeding complete. Closing connection...');
  await db.close();
  console.log('[DB] Connection closed');
  process.exit(0);
} catch (e) {
  console.error('[DB] Seeding failed:', e);
  process.exit(1);
}
