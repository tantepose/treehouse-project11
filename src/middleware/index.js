function requiresLogin (req, res, next) {
    // if (req.session && req.session.userId) {
        console.log('User logged in - CHECK');
        return next();
    // } else {
    //     var err = new Error('You must be logged in to view this, dog.');
    //     err.status = 401;
    //     return next(err);
    // }
}

module.exports.requiresLogin = requiresLogin;