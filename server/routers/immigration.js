import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  
  } else {
    res.status(404).json({ error: 'Router: immigration data not found' });
  }
});

export default router;
