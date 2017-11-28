
var {mongoose} = require('./../db/mongoose');
var {Grade} = require('./../models/grade');
var jwtDecode = require('jwt-decode');

var teacherController = {};

teacherController.getGrades = (req, res, next ) => {
    let decoded = jwtDecode(req.headers.id_token);
    let id = decoded.bench_user_metadata.id;

    Grade.find()
    .populate("students")
    .exec(function(err,grades) {
        let gradesForTeacher = grades.filter((grade, i) => {
            return grade.teachers.indexOf(id) >= 0               
       })
       res.send(gradesForTeacher);
    }, (e) => {
        console.log(e);
        res.status(400).send(e);
      })
   }


module.exports = teacherController;