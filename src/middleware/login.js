// Set up permissions to require users to be signed in
// Postman will set an Authorization header with each request when a user is signed in.
// Add a middleware function that attempts to get the user credentials from Authorization header set on the request.
// You can use the basic-auth npm package to parse the `Authorization' header into the user's credentials.
// Use the authenticate static method you built on the user schema to check the credentials against the database
// If the authenticate method returns the user, then set the user document on the request so that each following middleware function has access to it.
// If the authenticate method returns an error, then pass it to the next function
// Use this middleware in the following routes:
// POST /api/courses
// PUT /api/courses/:courseId
// GET /api/users
// POST /api/courses/:courseId/reviews

var auth = require('basic-auth');
var User = require('../models/user');

function requiresLogin (req, res, next) {
    var user = auth(req); //.name, .pass
    
    if (user) {
        console.log('noen prøver å logge på:', user);
        
        User.authenticate(user.name, user.pass, function (error, user) {
            console.log('sjekker i databaaasen');
            if (error || !user) {
              var err = new Error('Wrong email or password');
              console.log('NOPE');
              err.status = 401;
              return next(err);
            } else { // riktig brukernavn og passord
                req.user = user; 
                console.log('YES:', req.user.name);
                return next();
            }
        });

    } else {
        var err = new Error('You must be logged in to view this, dog.');
        err.status = 401;
        return next(err);
    }
}

module.exports.requiresLogin = requiresLogin;
