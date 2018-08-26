'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const User = require('../models/user');

const app = express();

// Mongoose
// connect to database
mongoose.connect('mongodb://localhost:27017/course-api',
  { useNewUrlParser: true });
var db = mongoose.connection;

// connection error
db.on('error', function (err) {
    console.log('Error connecting to database:', err);
});

// connection sucsess
db.once('open', function () {
    console.log('The database is live!');
});

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// TODO add additional routes here

// GET /api/users - return all users TEST
app.get('/api/users', function (req, res, next) {
  User.find({})
    .exec(function (err, user) { //eksevere når klar
        if (err) return next(err); // sende til express error if error
        res.json(user); // responder med alle questions som json
  });
});

// send a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API'
  });
});

// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  })
})

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
