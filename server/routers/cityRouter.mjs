import express from 'express';
import cityData from '../db/utils/data/city_data.mjs';

const router = express.Router();

router.get('/:city/profile', (req, res) => {
  const { city } = req.params;
  if (city) {
    res.json({ message: ` combined profile for ${city} city` });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
  }
});

/**
 * @swagger
 * /api/city/{city}:
 *   get:
 *     tags:
 *       - City
 *     summary: Get general information for a specific city
 *     description: >
 *       Returns basic information about a city, including its province, population,
 *       land area, and geographic coordinates.
 *       City names are matched case-insensitively, and accents must be included if applicable.
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: >
 *           The name of the city. Supported values:
 *           Halifax, Montréal, Toronto, Calgary, Edmonton, Vancouver
 *     responses:
 *       200:
 *         description: Successfully retrieved city information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Province:
 *                   type: string
 *                   example: "Quebec"
 *                 Population:
 *                   type: integer
 *                   example: 1762949
 *                 AreaKm2:
 *                   type: number
 *                   format: float
 *                   example: 364.74
 *                 Geolocation:
 *                   type: array
 *                   items:
 *                     type: number
 *                   example: [45.50169, -73.56725]
 *       400:
 *         description: Missing or invalid city name.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid city name"
 *       404:
 *         description: City not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "City not found"
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
router.get('/:city', (req, res) => {
  const cityKey = req.params.city.toLowerCase();

  if (!cityKey || cityKey.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid city name' });
  }

  const city = cityData[cityKey];

  if (!city) {
    return res.status(404).json({ error: 'City not found' });
  }

  res.json(city);
});

export default router;
