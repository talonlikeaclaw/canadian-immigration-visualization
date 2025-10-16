import city from './routers/city.mjs';
import immigration from './routers/immigration.mjs';
import languages from './routers/languages.mjs'
import express from 'express';
const app = express();

// app.use('/', );
app.use('/api/city', city);
app.use('/api/immigration', immigration);
app.use('/api/languages', languages)

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('server start on port http://localhost:3000'); 
});
