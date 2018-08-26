var mongoose = require('mongoose');

// _id (ObjectId, auto-generated)
// fullName (String, required)
// emailAddress (String, required, must be unique and in correct format)
// password (String, required)

var UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    emailAdress: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true, // kreves
    }
});

var User = mongoose.model('User', UserSchema);
module.exports = User;