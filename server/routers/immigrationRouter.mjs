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

export default router;
