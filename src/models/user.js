var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// email validation
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// mongoose model for User
var UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Invalid email adress.']
    },
    password: {
        type: String,
        required: true
    }
});


// pre save hook using bcrypt to hash the user's password before saving it in database
UserSchema.pre('save', function (next) {
    var user = this; 
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

// authentication method to return the user document based on their credentials
UserSchema.statics.authenticate = function (emailAddress, password, callback) {
    // get user from the database that matches the email address given
    this.findOne({emailAddress: emailAddress})
    .exec(function (error, user) {
        if (error) { // database error
            return callback(error);
        } else if ( !user ) { // user not found
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }

        // user found, check user's password against the password given using bcrypt    
        bcrypt.compare(password, user.password, function(error, result) {
            if (result === true) { // passwords match
                return callback(null, user);
            } else { // passwords don't match
                return callback(error, null);
            }
        });
    });
}
    
var User = mongoose.model('User', UserSchema);
module.exports = User;