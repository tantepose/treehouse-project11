var express = require('express');
var router = express.Router(); 

var requiresLogin = require('../middleware/login').requiresLogin;
var User = require('../models/user');

// GET /api/users 200
// Returns the currently authenticated user

// POST /api/users 201
// Creates a user, sets the Location header to "/", and returns no content

// TEST: GET /api/users
// return all users
router.get('/', requiresLogin, function (req, res, next) {
    User.find({})
      .exec(function (err, user) { //eksevere når klar
          if (err) return next(err); // sende til express error if error
          res.json(user); // responder med alle questions som json
    });
});



module.exports = router;
