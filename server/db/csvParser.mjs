import { readFile } from 'fs/promises';
import { parse } from 'csv-parse/sync';

// --- HELPER FUNCTIONS ---

// Regex patterns created by ChatGPT

// For labels like "Halifax (CMA), N.S. i12" or "Saint Pierre and Miquelon 5"
const cleanLabel = s =>
  (s || '').
    // remove a trailing space + 'i' + digits (" i12")
    replace(/\si\d+$/i, '').
    // remove a trailing space + digits (" ... 7")
    replace(/\s+\d+$/g, '').
    trim();

// For period values like "2016 to 2021 7"
const cleanImmigrationPeriod = s =>
  (s || '').
    replace(/\si\d+$/i, '').
    replace(/\s+(\d+)$/, (_, d) => Number(d) < 10 ? '' : ` ${d}`).
    trim();

// For parsing number values
const parseCount = s => {
  if (!s) return null;
  const cleaned = s.replace(/[\u00A0\u202F, ]/g, '');
  return /^\d+$/.test(cleaned) ? Number(cleaned) : null;
};

// --- IMMIGRATION ---

/**
 * Parse and normalize StatsCan immigration CSV rows into typed records.
 * ESM path handling: __filename/__dirname are derived from import.meta.url so
 * the CSV can be located regardless of process working directory.
 *
 * @returns Promise<Array<{ City: string, Country: string, Period: string, Count: number|null }>>
 */
export async function parseImmigrationCSV() {
  const filePath = './data/immigration_data.csv';

  // Line and column indices constants
  const START_LINE = 9;

  const GEO_COL = 0;
  const POB_COL = 4;
  const PERIOD_COL = 5;
  const COUNT_COL = 6;

  // Load file
  const csv = await readFile(filePath, 'utf-8');

  // Parse into rows
  const rows = parse(csv, {
    skipEmptyLines: true,
    bom: true,
    fromLine: START_LINE,
    relaxColumnCount: true
  });

  // Iterate over the rows, carrying forward the last Geography/Place of Birth
  const out = [];
  let city = '';
  let country = '';

  for (const row of rows) {
    // The StatsCan export is messy, so this is a safe guard (for thee)
    if (!row || row.length < 2) continue;

    // Get the values from the columns
    const geography = row[GEO_COL]?.trim();
    const placeOfBirth = row[POB_COL]?.trim();
    const periodRaw = row[PERIOD_COL]?.trim();
    const countRaw = row[COUNT_COL]?.trim();

    // Update the Geography or Place of Birth if exists
    if (geography) city = cleanLabel(geography);
    if (placeOfBirth) country = cleanLabel(placeOfBirth);

    // Skipping totals for object consistency (we can calculate the total later)
    if (!periodRaw || periodRaw.includes('Total')) continue;
    if (
      city === 'Geography' ||
      periodRaw === 'Period of immigration (8)'
    ) {
      continue;
    }

    // Clean + parse
    const period = cleanImmigrationPeriod(periodRaw);
    const count = parseCount(countRaw);

    out.push({
      City: city,
      Country: country,
      Period: period,
      Count: count
    });
  }

  return out;
}

// Testing - Immigration
// const immigrationData = await parseImmigrationCSV();
// console.log(JSON.stringify(immigrationData.slice(4300, 4540), null, 2));
// console.log(`Parsed ${immigrationData.length} records`);

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
  },
  ...
]
*/

// --- LANGUAGE ---

/**
 * Parse and normalize StatsCan language CSV rows into typed records.
 *
 * @returns Promise<Array<{ City: city, Language: language, Count: count| }>>
 */
export async function parseLanguageCSV() {
  const filePath = './data/language_data.csv';

  // Line number and inidices constants
  const START_LINE = 10;

  const GEO_COL = 0;
  const LANGUAGE_COL = 3;
  const COUNT_COL = 5;

  // Load file
  const csv = await readFile(filePath, 'utf-8');

  // Parse into rows
  const rows = parse(csv, {
    skipEmptyLines: true,
    bom: true,
    fromLine: START_LINE,
    relaxQuotes: true,
    relaxColumnCount: true
  });

  // Iterate over the rows, carrying forward the last City
  const out = [];
  let city = '';

  for (const row of rows) {
    if (!row || row.length < 2) continue;

    const geography = row[GEO_COL]?.trim();
    const languageRaw = row[LANGUAGE_COL]?.trim();
    const countRaw = row[COUNT_COL]?.trim();

    // Update the City if exists
    if (geography) city = cleanLabel(geography);
    if (!city || !languageRaw) continue;

    // Clean + parse
    const language = cleanLabel(languageRaw);
    const count = parseCount(countRaw);

    out.push({ City: city, Language: language, Count: count });
  }

  return out;
}

// Testing - Languages
// const languageData = await parseLanguageCSV();
// console.log(JSON.stringify(languageData.slice(810, 835), null, 2));
// console.log(`Parsed ${languageData.length} records`);

/*
[
  {
    "City": "Montréal (CMA), Que.",
    "Language": "English",
    "Count": 693340
  },
  {
    "City": "Montréal (CMA), Que.",
    "Language": "French",
    "Count": 2708435
  },
  {
    "City": "Montréal (CMA), Que.",
    "Language": "Indigenous languages",
    "Count": 215
  },
  {
    "City": "Montréal (CMA), Que.",
    "Language": "Arabic",
    "Count": 89800
  },
  {
    "City": "Montréal (CMA), Que.",
    "Language": "Vietnamese",
    "Count": 18435
  },
  {
    "City": "Montréal (CMA), Que.",
    "Language": "Tagalog (Pilipino, Filipino)",
    "Count": 9245
  },
  {
    "City": "Montréal (CMA), Que.",
    "Language": "Haitian Creole",
    "Count": 18580
  },
  ...
]
Parsed 4321 records
*/
