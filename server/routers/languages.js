import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  
  } else {
    res.status(404).json({ error: 'Router: languages data not found' });
  }
});

export default router;
