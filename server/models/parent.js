const mongoose = require('mongoose');
require('mongoose-type-email');
var Parent = mongoose.model('Parent', {
    children: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    parentId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = {
    Parent
};