var express = require('express');
var router = express.Router(); 

var requiresLogin = require('../middleware/login').requiresLogin;
var Course = require('../models/course');

// GET /api/courses 200 
// Returns the Course "_id" and "title" properties
router.get('/', function (req, res, next) {
    Course.find({}, '_id title')
      .exec(function (err, courses) { //eksevere når klar
          if (err) return next(err); // sende til express error if error
          res.json(courses); // responder med alle questions som json
    });
});

// GET /api/course/:courseId 200
// Returns all Course properties and related documents for the provided course ID
// (use Mongoose population to load the related user and reviews documents)
router.get('/:courseId', function (req, res, next) {
    Course.find({
        _id: req.params.courseId
    })
      .exec(function (err, course) { //eksevere når klar
          if (err) return next(err); // sende til express error if error
          res.json(course); // responder med alle questions som json
    });
});

// POST /api/courses 201
// Creates a course, sets the Location header, and returns no content
router.post('/', requiresLogin, function (req, res, next) {
    console.log('Creating course:', req.body);

    // create user object
    var courseData = {
        title: req.body.title,
        description: req.body.description,
        user: {
            _id: req.body.user._id
        },
        steps: [
            req.body.steps 
        ]
    }

    // save object in database
    Course.create(courseData, function (error, course) {
        if (error) {
            return next(error);
        } else {
            res.location('/').status(201).end();
            return next();
        }
    });
});

// PUT /api/courses/:courseId 204
// Updates a course and returns no content
router.put('/:courseID', requiresLogin, function (req, res, next) {
    console.log('updating course:', req.params.courseId);

    res.location('/').status(204).end();
    return next();
});

// POST /api/courses/:courseId/reviews 201
// Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post('/:courseId/reviews', requiresLogin, function (req, res, next) {
    console.log('creating review');
    
    res.location('/api/courses/' + req.params.courseId).status(201).end();
    return next();
});


module.exports = router;