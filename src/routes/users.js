var express = require('express');
var router = express.Router(); 

var requiresLogin = require('../middleware').requiresLogin;
const User = require('../models/user');

// GET /api/users - return all users TEST
router.get('/', requiresLogin, function (req, res, next) {
    User.find({})
      .exec(function (err, user) { //eksevere når klar
          if (err) return next(err); // sende til express error if error
          res.json(user); // responder med alle questions som json
    });
});

module.exports = router;
