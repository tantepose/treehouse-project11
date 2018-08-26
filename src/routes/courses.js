var express = require('express');
var router = express.Router(); 
const Course = require('../models/course');

// GET /api/courses - return _id and title of all courses
router.get('/', function (req, res, next) {
    Course.find({}, '_id title')
      .exec(function (err, courses) { //eksevere når klar
          if (err) return next(err); // sende til express error if error
          res.json(courses); // responder med alle questions som json
    });
});

// GET /api/courses/:courseId - return the spesified course
router.get('/:courseId', function (req, res, next) {
    Course.find({
        _id: req.params.courseId
    })
      .exec(function (err, course) { //eksevere når klar
          if (err) return next(err); // sende til express error if error
          res.json(course); // responder med alle questions som json
    });
});

module.exports = router;