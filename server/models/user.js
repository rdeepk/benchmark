const mongoose = require('mongoose');
require('mongoose-type-email');

var User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: { 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Role'
    },
    email:{
        type: mongoose.SchemaTypes.Email,
        required: true
    }
});

module.exports = {
    User
};