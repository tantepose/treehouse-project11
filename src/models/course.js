var mongoose = require('mongoose');

var ReviewSchema = require('./review');

var CourseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId // _id from the users collection
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: Number,
        required: true
    },
    estimatedTime: {
        type: String
    },
    materialsNeeded: {
        type: String
    },
    steps: [{
            stepNumber: {
                type: Number
            }, title: {
                type: String,
                required: true
            }, description: {
                type: String,
                required: true
            }
    }],
    reviews: [{ 
        type: mongoose.Schema.Types.ObjectId // _id values from the reviews collection
    }]
});

var Course = mongoose.model('Course', CourseSchema);
module.exports = Course;