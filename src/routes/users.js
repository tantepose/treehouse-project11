var express = require('express');
var router = express.Router(); 

var requiresLogin = require('../middleware/login').requiresLogin;
var User = require('../models/user');

// GET /api/users 200
// Returns the currently authenticated user
router.get('/', requiresLogin, function (req, res, next) {
    User.find({emailAddress: req.user.name})
      .exec(function (err, user) { //eksevere når klar
          if (err) return next(err); // sende til express error if error
          res.json(user); // responder med alle questions som json
    });
});

// POST /api/users 201
// Creates a user, sets the Location header to "/", and returns no content
router.post('/', function (req, res, next) {
    console.log('Creating user', req.body);

    // create user object
    var userData = {
        fullName: req.body.fullName,
        emailAddress: req.body.emailAddress,
        password: req.body.password
    }

    // save object in database
    User.create(userData, function (error, user) {
        if (error) {
            return next(error);
        } else {
            res.location('/'); 
            return next();
        }
    });
});

// TEST: GET /api/users
// return all users
// router.get('/', function (req, res, next) {
//     User.find({})
//       .exec(function (err, user) { //eksevere når klar
//           if (err) return next(err); // sende til express error if error
//           res.json(user); // responder med alle questions som json
//     });
// });

module.exports = router;
