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
app.use(cookieParser());

app.use('/api/users', loginRouter);

app.use('/api/groups');

app.use('/api/itinerary');

module.exports = app;