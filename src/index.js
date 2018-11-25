'use strict';

// load modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');

// connect to database
mongoose.connect('mongodb://localhost:27017/course-api', { 
  useNewUrlParser: true 
});
var db = mongoose.connection;

// if connection error
db.on('error', function (err) {
    console.log('Error connecting to database:', err);
});

// if connection sucsess
db.once('open', function () {
    console.log('The database is live!');
});

// set our port
app.set('port', process.env.PORT || 5000);

// set up morgan for http request logging
app.use(morgan('dev'));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up routes
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

// send a friendly greeting for the root route
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API'
  });
});

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