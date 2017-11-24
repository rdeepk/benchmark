const mongoose = require('mongoose');

var Grade = mongoose.model('Grade', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    teachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
});

module.exports = {
    Grade
};