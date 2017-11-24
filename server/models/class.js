const mongoose = require('mongoose');

var Class = mongoose.model('Class', {
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
    Class
};