import express from 'express';

const router = express.Router();

router.get('/:city_name', (req, res) => {
  
  } else {
    res.status(404).json({ error: 'name required' });
  }
});

export default router;
