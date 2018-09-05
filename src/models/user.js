var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

// email validation
// source: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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

// Update the User model to store the user's password as a hashed value.
// For security reasons, we don't want to store the password property in the database as clear text.
// Create a pre save hook on the user schema that uses the bcrypt npm package to hash the user's password.
// See https://github.com/ncb000gt/node.bcrypt.js/ for more information.

UserSchema.pre('save', function (next) {
    var user = this; 
    bcrypt.hash(user.password, 10, function (err, hash) { // kjør 10 ganger
        if (err) {
            return next(err);
        }
        user.password = hash; // bytte plaintext med hash
        next();
    });
});

// Create an authentication method on the user model to return the user document based on their credentials
// Create a static method on the user schema that takes an email, password, and callback
// The method should attempt to get the user from the database that matches the email address given.
// If a user was found for the provided email address, then check that user's password against the password given using bcrypt.
// If they match, then return the user document that matched the email address
// If they don't match or a user with the email given isn’t found, then pass an error object to the callback

UserSchema.statics.authenticate = function (emailAddress, password, callback) {
    User.findOne({emailAdress: emailAddress})
        .exec(function (error, user) { // kjør søk
            if (error) {
                return callback(error);
            } else if ( !user ) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(error, result) { // plaintext mot hash
                if (result === true) { // jepp, passord er samme
                    return callback(null, user); // null er ingen errors
                } else { // niks, ikke match
                    return callback(); //var ingenting her, men burde vel være error?
                }
            });
        });
}

var User = mongoose.model('User', UserSchema);
module.exports = User;