import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Sources:
// - https://nodejs.org/api/esm.html#modules-ecmascript-modules
// - https://bobbyhadz.com/blog/javascript-dirname-is-not-defined-in-es-module-scope
// This enables our ES Module to safely obtain absolute path to current file.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Regex patterns created by ChatGPT
// For labels like "Halifax (CMA), N.S. i12" or "Saint Pierre and Miquelon 5"
const cleanImmigrationLabel = s =>
  (s || '')
    // remove a trailing space + 'i' + digits (" i12")
    .replace(/\si\d+$/i, '')
    // remove a trailing space + digits (" ... 7")
    .replace(/\s+\d+$/g, '')
    .trim();

// For period values like "2016 to 2021 7"
const cleanImmigrationPeriod = s =>
  (s || '')
    .replace(/\si\d+$/i, '')
    .replace(/\s+(\d+)$/, (_, d) => (Number(d) < 10 ? '' : ` ${d}`))
    .trim();

/**
 * Parse and normalize StatsCan immigration CSV rows into typed records.
 * ESM path handling: __filename/__dirname are derived from import.meta.url so
 * the CSV can be located regardless of process working directory.
 *
 * @returns Promise<Array<{ City: string, Country: string, Period: string, Count: number|null }>>
 */
export async function parseImmigrationCSV() {
  const fileName = 'immigration_data.csv';
  const filePath = path.join(__dirname, 'data', fileName);

  // Line and column indices constants for this dataset
  const startLine = 9;
  const geographyColumn = 0;
  const placeOfBirthColumn = 4;
  const periodColumn = 5;
  const countColumn = 6;

  // Load file
  const csv = await readFile(filePath, 'utf-8');

  // Parse into rows
  const rows = parse(csv, {
    skipEmptyLines: true,
    bom: true,
    fromLine: startLine,
    relaxColumnCount: true
  });

  // Iterate over the rows, carrying forward the last Geography/Place of Birth
  const out = [];
  let city = '';
  let country = '';

  for (const row of rows) {
    // The StatsCan export is messy, so this is a safe guard (for thee)
    if (row.length < 2) continue;

    // Get the values from the columns
    const geography = row[geographyColumn]?.trim();
    const placeOfBirth = row[placeOfBirthColumn]?.trim();
    const periodRaw = row[periodColumn]?.trim();
    const countRaw = row[countColumn]?.trim();

    // Update the Geography or Place of Birth if exists
    if (geography) city = cleanImmigrationLabel(geography);
    if (placeOfBirth) country = cleanImmigrationLabel(placeOfBirth);

    // Skipping totals for object consistency (we can calculate the total later)
    if (!periodRaw || periodRaw.includes('Total')) continue;
    if (city === 'Geography' || periodRaw === 'Period of immigration (8)')
      continue;

    // Clean/normalize the remaining fields
    const period = cleanImmigrationPeriod(periodRaw);

    // Fancy ChatGPT regex for normalizing "1,234" style numbers
    const count =
      countRaw && /^[\d,]+$/.test(countRaw)
        ? Number(countRaw.replace(/,/g, ''))
        : null;

    out.push({
      City: city,
      Country: country,
      Period: period,
      Count: count
    });
  }

  return out;
}

// Testing
const data = await parseImmigrationCSV();
console.log(data.slice(14, 25));
console.log(`Parsed ${data.length} records`);

// Results
/*
[
  {
    City: 'Montréal (CMA), Que.',
    Country: 'Somalia',
    Period: '1980 to 1990',
    Count: 25
  },
  {
    City: 'Montréal (CMA), Que.',
    Country: 'Somalia',
    Period: '1991 to 2000',
    Count: 255
  },
  {
    City: 'Montréal (CMA), Que.',
    Country: 'Somalia',
    Period: '2001 to 2005',
    Count: 80
  },
  {
    City: 'Montréal (CMA), Que.',
    Country: 'Somalia',
    Period: '2006 to 2010',
    Count: 25
  },
  {
    City: 'Montréal (CMA), Que.',
    Country: 'Somalia',
    Period: '2011 to 2015',
    Count: 45
  }
]
*/
