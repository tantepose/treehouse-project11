var express = require('express');
var router = express.Router(); 
var requiresLogin = require('../middleware/login').requiresLogin;
var User = require('../models/user');

// GET /api/users 200
// Returns the currently authenticated user
router.get('/', requiresLogin, function (req, res, next) {
    User.findOne({
        emailAddress: req.user.emailAddress
    })
    .exec(function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

// POST /api/users 201
// Creates a user, sets the Location header to "/", and returns no content
router.post('/', function (req, res, next) {
    User.create(req.body, function (err, user) {
        if (err) return next(err);
        res.location('/').status(201).end();
        return next();
    });
});

module.exports = router;