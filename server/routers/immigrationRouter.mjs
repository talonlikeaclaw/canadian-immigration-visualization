import express from 'express';

const router = express.Router();

router.get('/:city', (req, res) => {
  const { city } = req.params;
  if (city) {
    res.json({ message: ` you asked for ${city} city immigration data` });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
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
router.get('/:city/topCountries', (req, res) => {
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
