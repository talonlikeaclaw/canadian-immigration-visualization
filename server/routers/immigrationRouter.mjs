import express from 'express';
import { db } from '../db/db.mjs';

const router = express.Router();

/**
 * Get total immigration count for given city (all periods, all countries)
 */
router.get('/:city', async (req, res, next) => {
  try {
    const { city } = req.params;

    // if contains anything other than letters
    // Regex pattern created by ChatGPT to allow accents on letters
    if (city.match(/[^a-zA-Z\u00C0-\u017F]/g)) {
      return res.status(400).json({'error': 'Invalid city name'});
    }

    await db.setCollection('immigration');

    const pipeline = [
      { $match: { City: new RegExp(city, 'i'), Count: { $gt: 0 } } },
      { $group: { _id: '$Country', totalCount: { $sum: '$Count' } } },
      { $sort: { totalCount: -1 } },
      {
        $group: {
          _id: null,
          countries: { $push: { k: '$_id', v: '$totalCount' } },
          totalImmigrants: { $sum: '$totalCount' }
        }
      },
      {
        $project: {
          _id: 0,
          totalImmigrants: 1,
          countries: { $arrayToObject: '$countries' }
        }
      }
    ];

    const [result] = await db.aggregate(pipeline);

    // early return
    if (!result) {
      return res.status(404).json({
        'error' : 'City not found or immigration data non existant.',
        'hint': 'If the city name contains accents, please include them in your request.'
      });
    }

    res.json({
      city,
      period: 'before 1980 to 2021',
      ...result
    });
  } catch(e) {
    next(e);
  }
});

/**
 * Gets immigration numbers from ALL countries but only for the end date and before
 * This route was created because one of the possible periods is 'Before 1980', 
 * so there's no specific start year.
 */
router.get('/:city/period/:end', async (req, res, next) => {
  try {
    const { city, end } = req.params;

    // if contains anything other than letters
    // Regex pattern created by ChatGPT to allow accents on letters
    if (city.match(/[^a-zA-Z\u00C0-\u017F]/g)) {
      return res.status(400).json({'error': 'Invalid city name'});
    }

    // if contains anything other than digits
    if (end.match(/[^\d]/g)) {
      return res.status(400).json({'error': 'Invalid ending year'});
    }
    
    await db.setCollection('immigration');
    
    // must match period format in DB
    const periodString = `Before ${end}`;

    const pipeline = [
      { $match: { 
        City: new RegExp(city, 'i'), 
        Period: periodString, 
        Count: { $gt: 0 } 
      }},
      { $group: { _id: '$Country', totalCount: { $sum: '$Count' } }},
      { $sort: { totalCount: -1 }},
      {
        $group: {
          _id: null,
          countries: { $push: { k: '$_id', v: '$totalCount' } },
          totalImmigrants: { $sum: '$totalCount' }
        }
      },
      {
        $project: {
          _id: 0,
          totalImmigrants: 1,
          countries: { $arrayToObject: '$countries' }
        }
      }
    ];

    const [result] = await db.aggregate(pipeline);

    // Early return
    if (!result) {
      return res.status(404).json({
        'error': `No immigration data found for ${city} in period ${periodString}.`,
        'hint': 'If the city name contains accents, please include them.'
      });
    }

    res.json({
      city,
      period: periodString,
      ...result
    });
  } catch(e) {
    next(e);
  }
});

/**
 * Gets immigration numbers from ALL countries but only for given time period
 */
router.get('/:city/period/:start/:end', async (req, res, next) => {
  try {
    const { city, start, end } = req.params;

    // if contains anything other than letters
    // Regex pattern created by ChatGPT to allow accents on letters
    if (city.match(/[^a-zA-Z\u00C0-\u017F]/g)) {
      return res.status(400).json({'error': 'Invalid city name'});
    }

    // if contains anything other than digits
    if (start.match(/[^\d]/g)) {
      return res.status(400).json({'error': 'Invalid starting year'});
    }

    // only check ending year if start year is NOT 1980
    if (start !== '1980') {
      // if contains anything other than digits
      if (end.match(/[^\d]/g)) {
        return res.status(400).json({'error': 'Invalid ending year'});
      }
    }
    
    await db.setCollection('immigration');
    
    // must match period format in DB
    let periodString = `${start} to ${end}`;

    if (start === '1980') {
      periodString = 'Before 1980';
    }

    const pipeline = [
      { $match: { 
        City: new RegExp(city, 'i'), 
        Period: periodString, 
        Count: { $gt: 0 } 
      }},
      { $group: { _id: '$Country', totalCount: { $sum: '$Count' } }},
      { $sort: { totalCount: -1 }},
      {
        $group: {
          _id: null,
          countries: { $push: { k: '$_id', v: '$totalCount' } },
          totalImmigrants: { $sum: '$totalCount' }
        }
      },
      {
        $project: {
          _id: 0,
          totalImmigrants: 1,
          countries: { $arrayToObject: '$countries' }
        }
      }
    ];

    const [result] = await db.aggregate(pipeline);
    
    // Early return
    if (!result) {
      return res.status(404).json({
        'error': `No immigration data found for ${city} in period ${periodString}.`,
        'hint': 'If the city name contains accents, please include them.'
      });
    }

    res.json({
      city,
      period: periodString,
      ...result
    });
  } catch(e) {
    next(e);
  }
});

router.get('/:city/country/:country', (req, res) => {
  const { city, country } = req.params;
  if (city) {
    res.json({ message: `Specific immigration pattern of ${country} into ${city} city` });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
  }
});

// Limit to top 5-10 countries that have immigrated the most to given city
router.get('/:city/top-countries', (req, res) => {
  const { city } = req.params;
  if (city) {
    res.json({ message: `Most countries emmigrating towards ${city} city` });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
  }
});

router.get('/:city/summary', (req, res) => {
  const { city } = req.params;
  if (city) {
    res.json({ message: `Summary of stats for ${city} city` });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
  }
});

export default router;

// Helper functions

/**
 * Groups all entries by country name and adds their count together
 * @param {Array} allEntries i.e [
 * {country: 'country1', count: 10},
 * {country: 'country1', count: 26},
 * {country: 'country2', count: 10}]
 * @returns Object with countries as keys and total counts as values
 * i.e. {country1: 36, country2: 10}
 */
function groupByCountry(allEntries) {
  const results = {};
  
  allEntries.forEach(entry => {
    const country = entry.country;
    const count = entry.count;
    
    // If key with country name already exists, add to its existant count
    if (results[country]) {
      results[country] += count;
    } else {
      // if new country, create new object key/value pair
      results[country] = count;
    }
  });

  const sortedResults = Object.fromEntries(
    Object.entries(results).sort((a, b) => {
      if(a[1] < b[1]) return 1;
      if(a[1] > b[1]) return -1;
      if(a[1] === b[1]) return 0;
    })
  );
  
  return sortedResults;
}
