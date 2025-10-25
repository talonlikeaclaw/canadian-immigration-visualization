import express from 'express';
import { db } from '../db/db.mjs';

const router = express.Router();

/**
 * Get total immigration count for given city (all periods, all countries)
 */
router.get('/:city', async (req, res) => {
  try {
    const { city } = req.params;
    await db.setCollection('immigration');

    // get all entries with a count higher than 0
    const results = await db.find({ 
      City: new RegExp(city, 'i'),
      Count: { $gt: 0 }
    });

    // early return
    if (results.length === 0) {
      return res.status(404).json({'error' : 'City not found or immigration data non existant.'});
    }

    const allEntriesArray = [];
    // Add all entries, only with country and count info
    results.forEach(result => {
      const country = result.Country;
      const count = result.Count;

      const newObj = {
        country: country,
        count: count
      };

      allEntriesArray.push(newObj);
    });

    const endData = groupByCountry(allEntriesArray);

    res.json({data: endData});

  } catch(e) {
    console.error(`Error from immigration router: api/:city`, e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:city/period/:period', (req, res) => {
  const { city, period } = req.params;
  if (city) {
    res.json({ message: ` you asked for ${city} specific period ${period} data` });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
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
