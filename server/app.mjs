import compression from 'compression';
import city from './routers/cityRouter.mjs';
import immigration from './routers/immigrationRouter.mjs';
import languages from './routers/languagesRouter.mjs';
import cities from './routers/citiesRouter.mjs';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import express from 'express';

// Helpful Docmentation:
// https://expressjs.com/en/5x/api.html

// - Browser Caching:
//   https://dawsoncollege.gitlab.io/520JS/520-Web/lectures/10_2_browser_cache.html
//   https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control

const app = express();
const theme = new SwaggerTheme();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Canada Immigration and Language Stats API',
    version: '1.0.0'
  }
};

const jsdocOptions = {
  swaggerDefinition,
  apis: ['./routers/*.mjs']
};

const swaggerSpec = swaggerJSDoc(jsdocOptions);

// The dafault theme was not my favorite
const uiOptions = {
  customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA)
};

// middlewares
app.use(compression());

// Source provided in lecture notes:
// https://web.dev/articles/codelab-http-cache
app.use(
  express.static('../client/dist', {
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      // Regex for vite hash created by ChatGPT.
      const hashRegExp = /-[A-Za-z0-9_-]{6,}\./;

      if (path.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache');
      } else if (hashRegExp.test(path)) {
        // If the RegExp matched, then we have a versioned URL.
        res.setHeader('Cache-Control', 'max-age=31536000, immutable');
      }
    }
  })
);

// api routes
// app.use('/', );
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, uiOptions));
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
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
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
