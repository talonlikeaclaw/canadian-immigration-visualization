import express from 'express';
import { db } from '../db/db.mjs';

const router = express.Router();

/**
 * @swagger
 * /api/immigration/{city}:
 *   get:
 *     tags:
 *       - Immigration
 *     summary: Get immigration statistics for a city
 *     description: >
 *       Returns aggregated immigration data for a given city, including total immigrants and
 *       country-by-country breakdown, grouped and sorted by immigrant count.
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: >
 *           The name of the city. Only letters and accented characters are allowed.
 *           If the city name includes accents, you must include them (e.g., Montréal).
 *     responses:
 *       200:
 *         description: Successfully retrieved immigration data for the specified city.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                   example: "Montréal"
 *                 period:
 *                   type: string
 *                   example: "before 1980 to 2021"
 *                 totalImmigrants:
 *                   type: integer
 *                   example: 1020835
 *                 countries:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   example:
 *                     Haiti: 79720
 *                     Algeria: 66730
 *                     France: 63235
 *       400:
 *         description: Invalid city name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid city name"
 *       404:
 *         description: City not found or data unavailable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "City not found or immigration data non existant."
 *                 hint:
 *                   type: string
 *                   example:
 *                     If the city name contains accents,
 *                     please include them in your request.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/:city', async (req, res, next) => {
  try {
    const { city } = req.params;

    // if contains anything other than letters
    // Regex pattern created by ChatGPT to allow accents on letters
    if (city.match(/[^a-zA-Z\u00C0-\u017F]/g)) {
      return res.status(400).json({ error: 'Invalid city name' });
    }

    await db.setCollection('immigration');

    const pipeline = [
      // Filter the documents
      { $match: { City: new RegExp(city, 'i'), Count: { $gt: 0 } } },
      // Group by country and sum counts
      { $group: { _id: '$Country', totalCount: { $sum: '$Count' } } },
      // Sort by total count
      { $sort: { totalCount: -1 } },
      // Create single document with all countries
      {
        $group: {
          _id: null,
          countries: { $push: { k: '$_id', v: '$totalCount' } },
          totalImmigrants: { $sum: '$totalCount' }
        }
      },
      // Reshape output structure
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
        error: 'City not found or immigration data non existant.',
        hint: 'If the city name contains accents, please include them in your request.'
      });
    }

    res.json({
      city,
      period: 'before 1980 to 2021',
      ...result
    });
  } catch (e) {
    next(e);
  }
});

/* eslint-disable max-len */
/**
 * @swagger
 * /api/immigration/{city}/period/{end}:
 *   get:
 *     tags:
 *       - Immigration
 *     summary: Get immigration statistics for a city before a given year
 *     description: >
 *       Returns aggregated immigration data for a given city for all years **before** the specified ending year.
 *       This route exists because the database includes a period label `"Before 1980"`.
 *       Valid end year values:
 *         - 1980
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: >
 *           The name of the city. Only letters and accented characters are allowed.
 *           If the city name includes accents, you must include them (e.g., Montréal).
 *       - in: path
 *         name: end
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ending year (e.g., 1980) only 1980 is currently supported.
 *     responses:
 *       200:
 *         description: Successfully retrieved immigration data for the specified city and period.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                   example: "Montréal"
 *                 period:
 *                   type: string
 *                   example: "Before 1980"
 *                 totalImmigrants:
 *                   type: integer
 *                   example: 161235
 *                 countries:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   example:
 *                     Italy: 38295
 *                     Greece: 13320
 *                     Haiti: 12090
 *       400:
 *         description: Invalid city name or invalid ending year.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid city name or ending year.
 *       404:
 *         description: No immigration data found for the specified city and period.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No immigration data found for Montréal in period Before 1980."
 *                 hint:
 *                   type: string
 *                   example: If the city name contains accents, please include them.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */
router.get('/:city/period/:end', async (req, res, next) => {
  try {
    const { city, end } = req.params;

    // if contains anything other than letters
    // Regex pattern created by ChatGPT to allow accents on letters
    if (city.match(/[^a-zA-Z\u00C0-\u017F]/g)) {
      return res.status(400).json({ error: 'Invalid city name' });
    }

    // if contains anything other than digits
    if (end.match(/[^\d]/g)) {
      return res.status(400).json({ error: 'Invalid ending year' });
    }

    await db.setCollection('immigration');

    // must match period format in DB
    const periodString = `Before ${end}`;

    const pipeline = [
      // Filter the documents
      {
        $match: {
          City: new RegExp(city, 'i'),
          Period: periodString,
          Count: { $gt: 0 }
        }
      },
      // Group by country and sum counts
      { $group: { _id: '$Country', totalCount: { $sum: '$Count' } } },
      // Sort by total count
      { $sort: { totalCount: -1 } },
      // Create single document with all countries
      {
        $group: {
          _id: null,
          countries: { $push: { k: '$_id', v: '$totalCount' } },
          totalImmigrants: { $sum: '$totalCount' }
        }
      },
      // Reshape output structure
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
        error: `No immigration data found for ${city} in period ${periodString}.`,
        hint: 'If the city name contains accents, please include them.'
      });
    }

    res.json({
      city,
      period: periodString,
      ...result
    });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /api/immigration/{city}/period/{start}/{end}:
 *   get:
 *     tags:
 *       - Immigration
 *     summary: Get immigration statistics for a city during a specific time period
 *     description: >
 *       Returns aggregated immigration data for a given city between two years (inclusive),
 *       grouped by country and sorted by immigrant count. If the period starts at 1980, it
 *       automatically uses the label "Before 1980" to match the database format.
*       Valid period ranges in the dataset are:
*         - Before 1980
*         - 1980 to 1990
*         - 1991 to 2000
*         - 2001 to 2005
*         - 2006 to 2010
*         - 2011 to 2015
*         - 2016 to 2021
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: >
 *           The name of the city. Only letters and accented characters are allowed.
 *           If the city name includes accents, include them (e.g., Montréal).
 *       - in: path
 *         name: start
 *         required: true
 *         schema:
 *           type: integer
 *         description: The starting year of the period (e.g., 1980, 1991, 2001, 2006, 2011, 2016)
 *       - in: path
 *         name: end
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ending year of the period (e.g., 1990, 2000, 2005, 2010, 2015, 2021)
 *     responses:
 *       200:
 *         description: Successfully retrieved immigration data for the specified city and period.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   type: string
 *                   example: "Montréal"
 *                 period:
 *                   type: string
 *                   example: "2001 to 2005"
 *                 totalImmigrants:
 *                   type: integer
 *                   example: 115630
 *                 countries:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   example:
 *                     Algeria: 11800
 *                     Morocco: 11105
 *                     China: 11105
 *       400:
 *         description: Invalid city name or invalid year values.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid starting or ending year.
 *       404:
 *         description: No immigration data found for the specified city and period.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No immigration data found for Montréal in period 1991 to 2000."
 *                 hint:
 *                   type: string
 *                   example: Include accents in the city name if applicable.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error.
 */
router.get('/:city/period/:start/:end', async (req, res, next) => {
  try {
    const { city, start, end } = req.params;

    // if contains anything other than letters
    // Regex pattern created by ChatGPT to allow accents on letters
    if (city.match(/[^a-zA-Z\u00C0-\u017F]/g)) {
      return res.status(400).json({ error: 'Invalid city name' });
    }

    // if contains anything other than digits
    if (start.match(/[^\d]/g)) {
      return res.status(400).json({ error: 'Invalid starting year' });
    }

    // only check ending year if start year is NOT 1980
    if (start !== '1980') {
      // if contains anything other than digits
      if (end.match(/[^\d]/g)) {
        return res.status(400).json({ error: 'Invalid ending year' });
      }
    }

    await db.setCollection('immigration');

    // must match period format in DB
    let periodString = `${start} to ${end}`;

    if (start === '1980') {
      periodString = 'Before 1980';
    }

    const pipeline = [
      // Filter the documents
      {
        $match: {
          City: new RegExp(city, 'i'),
          Period: periodString,
          Count: { $gt: 0 }
        }
      },
      // Group by country and sum counts
      { $group: { _id: '$Country', totalCount: { $sum: '$Count' } } },
      // Sort by total count
      { $sort: { totalCount: -1 } },
      // Create single document with all countries
      {
        $group: {
          _id: null,
          countries: { $push: { k: '$_id', v: '$totalCount' } },
          totalImmigrants: { $sum: '$totalCount' }
        }
      },
      // Reshape output structure
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
        error: `No immigration data found for ${city} in period ${periodString}.`,
        hint: 'If the city name contains accents, please include them.'
      });
    }

    res.json({
      city,
      period: periodString,
      ...result
    });
  } catch (e) {
    next(e);
  }
});

router.get('/:city/country/:country', (req, res) => {
  const { city, country } = req.params;
  if (city) {
    res.json({
      message: `Specific immigration pattern of ${country} into ${city} city`
    });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
  }
});

// Limit to top 5-10 countries that have immigrated the most to given city
router.get('/:city/top-countries', (req, res) => {
  const { city } = req.params;
  if (city) {
    res.json({
      message: `Most countries emmigrating towards ${city} city`
    });
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
