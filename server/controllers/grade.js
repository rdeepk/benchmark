
var {mongoose} = require('./../db/mongoose');
var {Grade} = require('./../models/grade');

var gradeController = {};

gradeController.create = (req,res,next) => {
    var newGrade = new Grade({
      name: req.body.name,
      students: req.body.students,
      teachers: req.body.teachers
    });

newGrade.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      console.log(e);
      res.status(400).send(e);
    });
   }


module.exports = gradeController;