/**
 * Database Seeder Script
 * -----------------------
 * Seeds MongoDB collections with data parsed from CSV files.
 *
 * - Immigration CSV data -> "immigration" collection
 * - Language CSV data -> "languages" collection
 *
 * Run manually in this directory with:
 *    node seed.mjs
 *
 * Notes:
 * - Requires .env file with DB_NAME and ATLAS_URI_DEV/PROD.
 *   - Temporarily move your .env to the db/utils directory when running.
 * - Clears each collection before inserting fresh data.
 */
import { pathToFileURL } from 'url';
import { db } from '../db.mjs';
import { parseImmigrationCSV, parseLanguageCSV } from './csvParser.mjs';

/**
 * Seeds the MongoDB database with immigration and language data.
 * To enable testing of this script, I added optional dependencies
 * to allow dependency injection. Without these, I would get
 * "TypeError: ES Modules cannot be stubbed" because I was trying to
 * stub the read-only bindings imported into this module.
 * Source: https://stackoverflow.com/questions/75843342/typeerror-es-modules-cannot-be-stubbed-sinon
 *
 * @param {Object} deps - Optional dependencies for dependency injection/testing.
 * @param {Object} deps.db - Database manager.
 * @param {Function} deps.parseImmigrationCSV - Function that returns parsed immigration data.
 * @param {Function} deps.parseLanguageCSV - Function that returns parsed language data.
 * @returns {Promise<void>} Resolves when the seed operation completes.
 */
export async function seedDatabase(
  deps = { db, parseImmigrationCSV, parseLanguageCSV }
) {
  const { db, parseImmigrationCSV, parseLanguageCSV} = deps;
  const DB_NAME = process.env.DB_NAME;

  if (!DB_NAME) {
    throw new Error('Missing DB_NAME environment variable.');
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
    console.log('[DB] Seeding complete.');
  } catch (error) {
    console.error('[DB] Seeding failed:', error);
    throw error;
  } finally {
    console.log('[DB] Closing connection...');
    await db.close();
    console.log('[DB] Connection closed');
  }
}

// This ensures this script only executes itself when called by Node directly.
// I needed to find a way to do this to export the function for testing.
// Source: https://stackoverflow.com/
// questions/57838022/detect-whether-es-module-is-run-from-command-line-in-node
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  seedDatabase()
    .then(() => {
      console.log('[DB] Process completed successfully');
      process.exit(0);
    })
    .catch(e => {
      console.error('[DB] Process failed:', e);
      process.exit(1);
    });
}
