'use strict';

// load modules
const express = require('express');
const bodyParser = require('body-parser');

const morgan = require('morgan');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const app = express();

// Mongoose
// connect to database
mongoose.connect('mongodb://localhost:27017/course-api', { 
  useNewUrlParser: true 
});
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

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);



// Update any POST and PUT routes to return Mongoose validation errors.
// Use the next function in each route to pass any Mongoose validation errors to Express’s global error handler
// Send the Mongoose validation error with a400 status code to the user

// send a friendly greeting for the root route
app.get('/api', (req, res) => {
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
