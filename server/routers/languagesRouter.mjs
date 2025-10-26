import express from 'express';
import { db } from '../db/db.mjs';

const router = express.Router();

// GET /api/languages/:cityName
router.get('/:cityName', async (req, res) => {
  try {
    let { cityName } = req.params;
    if (!cityName) {
      return res.status(400).json({ error: 'language router : city name is required!' });
    }else if (cityName.toLowerCase() === 'montreal') {
      // a quixk fix for now => in db montreal has accent
      cityName = 'Montréal';
    }
    // connect to db
    await db.setCollection('languages');

    // $regex => pattern based match instead of exact matching  
    // i => ignore case
    const languages = await db
      .find({ City: { $regex: cityName, $options: 'i' } });

    if (!languages.length) {
      return res.status(404).json({ error: `no language data found for ${cityName}` });
    }
    // return json format langauges for cityName
    res.json(languages);
      
  }catch(error){
    console.error('language router: api/langguages error: ',  error);
    //res.status(500).json({error: 'Internal server error'});
    next(error);
  }
});

export default router;
