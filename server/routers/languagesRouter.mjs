import express from 'express';
import {db} from '../db/db.mjs'

const router = express.Router();

// GET /api/languages/:cityName
router.get('/:cityName', async (req, res) => {
  try {
    const { cityName } = req.params;
    if (!cityName) {
      res.status(404).json({ error: 'language router : city name is required!' });
    }
    // connect to db
    await db.setCollection('languages');

    // $regex => pattern based match instead of exact matching  
    // i => ignore case
    const languages = await db
    .find({ City : { $regex: 'montreal', $options: 'i'}});

    if (!languages.length){
      return res.status(404).json({ error: `no language data found for ${cityName}`});
    }
    
  }

export default router;
