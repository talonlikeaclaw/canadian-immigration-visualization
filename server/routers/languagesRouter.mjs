import express from 'express';

const router = express.Router();

router.get('/:city_name', (req, res) => {
  const { city_name } = req.params;
  if (city_name) {
    res.json({ message: ` you asked language for ${city_name} city` });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
  }
});

export default router;
