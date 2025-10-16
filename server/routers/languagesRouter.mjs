import express from 'express';

const router = express.Router();

router.get('/:cityName', (req, res) => {
  const { cityName } = req.params;
  if (cityName) {
    res.json({ message: ` you asked language for ${cityName} city` });
  } else {
    res.status(404).json({ error: 'Router: city not found ' });
  }
});

export default router;
