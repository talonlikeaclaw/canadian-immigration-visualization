import express from 'express';

const router = express.Router();

router.get('/:city_name', (req, res) => {
  const { cityName } = req.params;
  if (cityName) {
    res.json({ message: ` you asked for ${cityName} city` });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
  }
});

export default router;
