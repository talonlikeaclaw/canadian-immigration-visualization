import express from 'express';
import { db } from '../db/db.mjs';

const router = express.Router();

/**
 * @swagger
 * /api/languages/{city}:
 *   get:
 *     tags:
 *       - Language
 *     summary: Get language statistics for a given city
 *     description: >
 *       Returns the top spoken languages in a given city,
 *       sorted by count in descending order.
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the city (e.g., Montréal, Toronto)
 *     responses:
 *       200:
 *         description: Successfully retrieved language data for the specified city.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   City:
 *                     type: string
 *                     example: Montréal (CMA), Que.
 *                   Language:
 *                     type: string
 *                     example: English
 *                   Count:
 *                     type: integer
 *                     example: 693340
 *       400:
 *         description: Missing city name in request path.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid city name"
 *       404:
 *         description: No language data found for the specified city.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No language data found for Montréal"
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
router.get('/:city', async (req, res, next) => {
  try {
    let { city } = req.params;
    if (!city) {
      return res
        .status(400)
        .json({ error: 'Invalid city name' });
    } else if (city.toLowerCase() === 'montreal') {
      // a quick fix for now => in db montreal has accent
      city = 'Montréal';
    }
    // connect to db
    await db.setCollection('languages');

    // $regex => pattern based match instead of exact matching
    // i => ignore case
    const pipeline = [
      // Filter the documents
      { $match: { City: new RegExp(city, 'i'), Count: { $gt: 0 } } },
      // Sort by count
      { $sort: { Count: -1 } }
    ];

    const languages = await db.aggregate(pipeline);

    if (!languages.length) {
      return res
        .status(404)
        .json({ error: `No language data found for ${city}` });
    }
    // return json format langauges for city
    res.json(languages);
  } catch (error) {
    console.error('language router: api/langguages error: ', error);
    next(error);
  }
});

export default router;
