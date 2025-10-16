import  from './routes/api.js';
import from './routes/pirate.js';

import express from 'express';
const app = express();

app.use('/', );
app.use('/api', );


app.use(express.static('public'));

app.listen(3000, function() {
  console.log('server start on port http://localhost:3000'); 
});
