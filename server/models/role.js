const mongoose = require('mongoose');
var Role = mongoose.model('Role', {
    name: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = {
    Role
};