var {mongoose} = require('./../db/mongoose');
var {Role} = require('./../models/role');

var roleController = {};

roleController.create = (req,res,next) => {
console.log(req.body);
    var newRole = new Role({
      name: req.body.name
    });

    newRole.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
   }


module.exports = roleController;