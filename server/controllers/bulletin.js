var { mongoose } = require('./../db/mongoose');
var { Bulletin } = require('./../models/bulletin');
var jwtDecode = require('jwt-decode');

var bulletinController = {};

let _hasWriteAccess = (role) => {
  switch(role) {
    case 'admin':
    case 'teacher':
      return true;
    case 'student':
    case 'parent':
      return false;
  }
}

bulletinController.create = (req, res, next) => {
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.roles[0];
  if(role === 'admin' || role === 'teacher') {
    var newMessage = new Bulletin({
      message: req.body.message,
      owner: decoded.bench_user_metadata.id
    });
    newMessage.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      console.log(e);
      res.status(400).send(e);
    });
  } else {
    res.status(401)
  }
}

bulletinController.getMessages = (req, res, next) => {
  let decoded = jwtDecode(req.headers.id_token);
  console.log(decoded);
  let role = decoded.bench_app_metadata.roles[0];
  Bulletin.find().then((messages) => {
    let response = {
      writeAccess:  _hasWriteAccess(role),
      messages: messages
    }
    console.log(response);
    res.json(response)
  }, (e) => {
    console.log(e);
    res.status(400).send(e);
  });
}

bulletinController.update = (req, res, next) => {
  console.log("update");
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.roles[0];
  if(role === 'admin' || role === 'teacher') {
    var newMessage = {
      message: req.body.message,
      owner: decoded.bench_user_metadata.id
    };

    Bulletin.findOneAndUpdate(req.query.id, newMessage, {new: true}, function(err, doc){
      console.log(err);
      if (err) return res.status(400).send(err);
      return res.send(doc);
    });
  } else {
    res.status(401)
  }
}

bulletinController.delete = (req, res, next) => {
  console.log("delete");
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.roles[0];
  if(role === 'admin' || role === 'teacher') {
    Bulletin.findOneAndRemove({_id: req.query.id}).then((message) => {
      if (!message) {
        return res.status(404).send();
      }
      res.send({message});
      }, (e) => {
        res.status(400).send(e);
      });
  } else {
    res.status(401)
  }
}
module.exports = bulletinController;