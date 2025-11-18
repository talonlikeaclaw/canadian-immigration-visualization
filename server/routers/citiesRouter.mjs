import express from 'express';

const router = express.Router();

// Stub route for future implementation
router.get('/comparison', (req, res) => {
  const { cities } = req.query;
  if (!cities) {
    return res.status(400).json({ error: 'Missing cities query parameter' });
  }
  const cityList = cities.split(',');
  res.json({ message: ` you asked for comparison between: ${cityList.join(' & ')}` });
});

export default router;