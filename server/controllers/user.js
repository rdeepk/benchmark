
var {mongoose} = require('./../db/mongoose');
var {User} = require('./../models/user');

var userController = {};

userController.addUser = [
  function(req,res,next) {
    var todo = new Todo({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  }
];

// userController.getUser = [
//   function(req,res,next) {
//     Todo.find().then((todos) => {
//       res.send({todos})
//     }, (e) => {
//       res.status(400).send(e);
//     });
//   }
// ];

// userController.updateUser = (req, res, next) => {
//   Todo.findOneAndUpdate(req.query.id, req.body, {new: true}, function(err, doc){
//     if (err) return res.status(400).send(err);
//     return res.send(doc);
//   });
// }

// userController.deleteUser = [
//   function(req,res,next) {
//   var id = req.query.id;
//   Todo.findOneAndRemove({
//     _id: id
//   }).then((todo) => {
//     if (!todo) {
//       return res.status(404).send();
//     }
//     res.send({todo});
//   }).catch((e) => {
//     res.status(400).send();
//   });
//   }
// ]

module.exports = userController;