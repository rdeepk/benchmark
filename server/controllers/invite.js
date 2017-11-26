var {mongoose} = require('./../db/mongoose');
var {Invite} = require('./../models/invite');
require('mongoose-type-email');

var inviteController = {};

inviteController.create = (req,res,next) => {
console.log(req.body);
    var newInvite = new Invite({
      name: req.body.name,
      email: req.body.email
    });

    newInvite.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
   }

module.exports = inviteController;