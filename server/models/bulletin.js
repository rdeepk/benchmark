const mongoose = require('mongoose');
var Bulletin = mongoose.model('Bulletin', {
    message: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    expiry_date: {
        type: Date,
        expires: 0
    }
});

module.exports = {
    Bulletin
};