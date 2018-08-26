var mongoose = require('mongoose');

// Review model:
// _id (ObjectId, auto-generated)
// user (_id from the users collection)
// postedOn (Date, defaults to "now")
// rating (Number, required, must fall between "1" and "5")
// review (String)

var ReviewSchema = new mongoose.Schema({
    user: {
        type: Date,
    },
    postedOn: {
        type: String,
    },
    rating: {
        type: Number,
    },
    rating: {
        type: String,
    }
});

var Review = mongoose.model('User', ReviewSchema);
module.exports = Review;