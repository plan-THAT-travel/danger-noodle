const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { model } = require('mongoose');

const app = express();
const PORT = 3000;

const loginRouter = require('./routes/login');

// For environement production serve static files from dist
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../dist')));
  }
  
// Base uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serves static files
app.use('/client', express.static(path.resolve(__dirname, '../client'))); 

app.use('/api/users', loginRouter);

app.use('/api/groups');

app.use('/api/itinerary');

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