const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const loginRouter = require('./routers/loginRouter');
const cors = require('cors')
const itineraryRouter = require(path.join(
  __dirname,
  'routers/itineraryRouter'
));
const groupsRouter = require('./routers/groupsRouter');

const app = express();
const PORT = 3000;

// For environment production serve static files from dist
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

// Base uses
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', loginRouter);

app.use('/api/groups', groupsRouter);

app.use('/api/itinerary', itineraryRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Unknown Route'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
