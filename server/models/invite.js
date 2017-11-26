const mongoose = require('mongoose');
var Invite = mongoose.model('Invite', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: mongoose.SchemaTypes.Email,
        required: true
    }
});

module.exports = {
    Invite
};