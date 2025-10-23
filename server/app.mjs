import city from './routers/cityRouter.mjs';
import immigration from './routers/immigrationRouter.mjs';
import languages from './routers/languagesRouter.mjs';
import cities from './routers/citiesRouter.mjs';

import express from 'express';
const app = express();

// middlwears
app.use(express.json());
app.use(express.static('public'));

// api routes
// app.use('/', );
app.use('/api/city', city);
app.use('/api/immigration', immigration);
app.use('/api/languages', languages);
app.use('/api/cities', cities);

// 404 handler
// eslint-disable-next-line
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// global handler
// eslint-disable-next-line
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// GET  /api/city/:city_name=> City info
// http://localhost:3000/api/city/Toronto

// GET /api/city/:city_name/profile => City profile
//http://localhost:3000/api/city/Toronto/profile

// GET /api/immigration/:city => Immigration stats
// http://localhost:3000/api/immigration/montreal

// GET  /api/immigration/:city/period/:period => immigration by period
// http://localhost:3000/api/immigration/montreal/period/2010-2022 => Immigration by period

// GET /api/languages/:city => Language stats per city
// http://localhost:3000/api/languages/montreal

// GET /api/cities/comparison?cities=A,B
// http://localhost:3000/api/cities/comparison?cities=Calgary,Montreal

export default app;