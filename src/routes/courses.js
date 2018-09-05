var express = require('express');
var router = express.Router(); 

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

/* 

{
    "title": "New Course",
    "description": "My course description",
    "user": {
        "_id": "57029ed4795118be119cc437"
    },
    "steps": [
        {
            "title": "Step 1",
            "description": "My first step."
        }
    ]
}

*/

router.post('/', function (req, res, next) {
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
            res.location('/'); 
            return next();
        }
    });
});

// PUT /api/courses/:courseId 204
// Updates a course and returns no content
router.put('/:courseID', function (req, res, next) {
    console.log('updating course:', req.params.courseId);
});

// POST /api/courses/:courseId/reviews 201
// Creates a review for the specified course ID, sets the Location header to the related course, and returns no content
router.post('/:courseId/reviews', function (req, res, next) {
    console.log('creating review');    
});


module.exports = router;