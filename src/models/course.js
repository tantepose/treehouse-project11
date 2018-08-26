var mongoose = require('mongoose');

// Course model:
// _id (ObjectId, auto-generated)
// user (_id from the users collection)
// title (String, required)
// description (String, required)
// estimatedTime (String)
// materialsNeeded (String)
// steps (Array of objects that include 
    // stepNumber (Number), 
    // title (String, required) 
    // description (String, required) properties)
// reviews (Array of ObjectId values, _id values from the reviews collection)

var CourseSchema = new mongoose.Schema({
    user: {
        type: Date,
    },
    title: {
        type: String,
    },
    description: {
        type: Number,
    },
    estimatedTime: {
        type: String,
    },
    materialsNeeded: {
        type: Number,
    },
    steps: {
            stepNumber: {
                type: Number
            }, title: {
                type: String
            }, description: {
                type: String
            }
    },
    reviews: {
        type: Number,
    }
});

var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;