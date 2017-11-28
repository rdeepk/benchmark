const mongoose = require('mongoose');
var Attendance = mongoose.model('Attendance', {
    date: {
        type: Date,
        required: true
    },
    present: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    absent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    subject: {
        type: String,
        required: true,
        trim: true
    },
    timeFrom: {
        type: Date
    },
    timeTo: {
        type: Date
    },
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = {
    Attendance
};