var { mongoose } = require('./../db/mongoose');
var { Bulletin } = require('./../models/bulletin');

var bulletinController = {};

bulletinController.create = (req, res, next) => {
  
  var newMessage = new Bulletin({
    message: req.body.message
    // owner: req.user.body.user_metadata.id
  });
  console.log(req.user);
console.log(newMessage);
  newMessage.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    console.log(e);
    res.status(400).send(e);
  });
}


bulletinController.getMessages = (req, res, next) => {
  Bulletin.find().then((messages) => {
    res.send({messages})
  }, (e) => {
    res.status(400).send(e);
  });
}

module.exports = bulletinController;