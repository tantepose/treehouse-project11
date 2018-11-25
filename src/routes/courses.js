var express = require('express');
var router = express.Router(); 
var requiresLogin = require('../middleware/login').requiresLogin;
var Course = require('../models/course');
var Review = require('../models/review');
var User = require('../models/user');

// GET /api/courses 200 
// Returns the Course "_id" and "title" properties
router.get('/', function (req, res, next) {
    Course.find({}, '_id title')
      .exec(function (err, courses) { 
          if (err) return next(err);
          res.json(courses);
    });
});

// GET /api/course/:courseId 200
// Returns all Course properties and related documents for the provided course ID
router.get('/:courseId', function (req, res, next) {
    Course.findOne({
        _id: req.params.courseId
    })
    .populate('user') // insert related users from IDs
    .populate('reviews') // insert related reviews from IDs
    .exec(function (err, course) {
        if (err) return next(err);
        res.json(course);
    });
});

// POST /api/courses 201
// Creates a course, sets the Location header, and returns no content
router.post('/', requiresLogin, function (req, res, next) {
    Course.create(req.body, function (err, course) {
        if (err) return next(err);
        res.location('/').status(201).end();
    });
});

// PUT /api/courses/:courseId 204
// Updates a course and returns no content
router.put('/:courseID', requiresLogin, function (req, res, next) {
    Course.findByIdAndUpdate(req.params.courseID, req.body, function (err, course) {
        if (err) return next(err);
        res.location('/').status(201).end();
    });
});

// POST /api/courses/:courseId/reviews 201
// Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post('/:courseId/reviews', requiresLogin, function (req, res, next) {
    var review = req.body; // the review needs a user, so set up an object
    review.user = req.user._id; // and attach user

    Review.create(review, function (err, review) {
        if (err) return next(err);
        res.location('/api/courses/' + req.params.courseId).status(201).end();
    });
});

module.exports = router;