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

router.get('/:cityName', (req, res) => {
  const cityKey = req.params.cityName.toLowerCase();
  const city = cityData[cityKey];

  if (!city) {
    return res.status(404).json({ error: 'City not found '});
  }

  res.json(city);
});

export default router;
