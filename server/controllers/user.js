
var {mongoose} = require('./../db/mongoose');
var {User} = require('./../models/user');

var userController = {};

userController.create = (req,res,next) => {
console.log(req.body);
    var newUser = new User({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email
    });

    newUser.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
   }


module.exports = userController;