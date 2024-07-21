const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')

// App creation
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// CORS configuration
const whiteList = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options));

// Main route
app.get('/api', (req, res) => {
  res.send('Hola mi server en express');
});

// Router
routerApi(app)

// Error middleware
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler)
app.use(errorHandler);

// Server initialization
app.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}`);
});
