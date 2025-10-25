import express from 'express';
import { db } from '../db/db.mjs';

const router = express.Router();

/**
 * Get total immigration count for given city (all periods, all countries)
 */
router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;

    // if contains anything other than letters
    if (city.match(/[^a-zA-Z]/g)) {
      return res.status(400).json({'error': 'Invalid city name'});
    }

    await db.setCollection('immigration');

    // get all entries with a count higher than 0
    const results = await db.find({ 
      City: new RegExp(city, 'i'),
      Count: { $gt: 0 }
    });

    // early return
    if (results.length === 0) {
      return res.status(404).json({
        'error' : 'City not found or immigration data non existant.',
        'hint': 'If the city name contains accents, please include them in your request.'
      });
    }

    const allEntriesArray = [];
    let totalImmigrants = 0;
    // Add all entries, only with country and count info
    results.forEach(result => {
      const country = result.Country;
      const count = result.Count;

      const newObj = {
        country: country,
        count: count
      };

      allEntriesArray.push(newObj);
      totalImmigrants += count;
    });

    const endData = groupByCountry(allEntriesArray);

    res.json({city, period: 'before 1980 to 2021', totalImmigrants, countries: endData});

  } catch(e) {
    console.error(`Error from immigration router: api/:city`, e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:city/period/:start/:end', async (req, res) => {
  try {
    const { city, start, end } = req.params;
    
    await db.setCollection('immigration');
    
    // must match period format in DB
    const periodString = `${start} to ${end}`;
    
    const results = await db.find({
      City: new RegExp(city, 'i'),
      Period: periodString,
      Count: { $gt: 0 }
    });
    
    // Early return
    if (results.length === 0) {
      return res.status(404).json({
        'error': `No immigration data found for ${city} in period ${periodString}.`,
        'hint': 'If the city name contains accents, please include them.'
      });
    }
    
    const allEntriesArray = [];
    let totalImmigrants = 0;
    // Add all entries, only with country and count info
    results.forEach(result => {
      const country = result.Country;
      const count = result.Count;

      const newObj = {
        country: country,
        count: count
      };

      allEntriesArray.push(newObj);
      totalImmigrants += count;
    });

    const endData = groupByCountry(allEntriesArray);

    res.json({city, period: periodString, totalImmigrants, countries: endData});
  } catch(e) {
    console.error(`Error from immigration router: /:city/period/:start/:end`, e);
    res.status(500).json({ error: 'Internal server error' });
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
