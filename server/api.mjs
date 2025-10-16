import city from './routers/city.mjs';
import immigration from './routers/immigration.mjs';
import languages from './routers/languages.mjs'
import cities from './routers/cities.mjs'

import express from 'express';
const app = express();

// app.use('/', );
app.use('/api/city', city);
app.use('/api/immigration', immigration);
app.use('/api/languages', languages)
app.use('/api/cities', cities)
app.use(express.static('public'));

app.listen(3000, function() {
  console.log('server start on port http://localhost:3000'); 
});

// GET  /api/city/:city_name	=> City info
// http://localhost:3000/api/city/Toronto

// GET	/api/city/:city_name/profile => City profile
//http://localhost:3000/api/city/Toronto/profile

// GET	/api/immigration/:city	=> Immigration stats
// http://localhost:3000/api/immigration/montreal

// GET	http://localhost:3000/api/immigration/montreal/period/2010-2022 => Immigration by period
// GET	/api/languages/:city	=> Language stats
// GET	/api/cities/comparison?cities=A,B