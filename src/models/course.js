var mongoose = require('mongoose');

// mongoose model for Course
var CourseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // _id from the users collection
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    estimatedTime: {
        type: String
    },
    materialsNeeded: {
        type: String
    },
    steps: [
        {
            stepNumber: {
                type: Number
            }, title: {
                type: String,
                required: true
            }, description: {
                type: String,
                required: true
            }
        }
    ],
    reviews: [{ // _id values from the reviews collection
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }]
});

var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;