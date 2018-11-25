var auth = require('basic-auth');
var User = require('../models/user');

// middleware attached to routes requiring a logged in user
function requiresLogin (req, res, next) {
    // get user credentials from authorization header set on the request, using bacic-auth
    var user = auth(req); 

    // authorization header present
    if (user) {
        // using the authenticate static method on the user schema to check the credentials against the database
        User.authenticate(user.name, user.pass, function (error, user) {
            // authenticate method returns an error (user not found or wrong password)
            if (error || !user) {
                var err = new Error('Wrong email or password!');
                err.status = 401;
                return next(err);
            } 
            // no errors, user authenticated
            else { 
                // set the user document on the request so that each following middleware function has access to it
                req.user = user; 
                return next();
            }
        });
    } else { // no authorization header present
        var err = new Error('Sorry, you must be logged in to view this!');
        err.status = 401;
        return next(err);
    }
}

module.exports.requiresLogin = requiresLogin;