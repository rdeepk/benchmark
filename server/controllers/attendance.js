var { mongoose } = require('./../db/mongoose');
var { Attendance } = require('./../models/attendance');
var {Grade} = require('./../models/grade');
var jwtDecode = require('jwt-decode');

var attendanceController = {};


 /*
 *  Returns current date in yyyy-mm-dd format.
 */
_getCurrentDate = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  
  if(dd<10) {
      dd = '0'+dd
  } 
  
  if(mm<10) {
      mm = '0'+mm
  } 
  return yyyy + '-' + mm + '-' + dd;
}


/*
*  Returns all grades of students.
*/
_getAllGrades = () => {
  return Grade.find()
}

_getGradeForStudent = (grades, studentId) => {
    for(let i = 0; i < grades.length; i++){
      if(grades[i].students.length > 0) {
        for(let k=0; k <grades[i].students.length; k++) {
          if(grades[i].students[k] == studentId) {
            console.log(grades[i])
            return grades[i];
          }
        }
      }
  }
}


attendanceController.create = (req, res, next) => {
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.role;
  if(role === 'admin' || role === 'teacher') {
    let attendance = req.body;
    attendance.owner = decoded.bench_user_metadata.id;
    var newAttendance = new Attendance(attendance);
    newAttendance.save().then((doc) => {
      Attendance.populate(newAttendance, [{path:"owner"},{path: "grade"}, {path: "present"}, {path: "absent"}], function(err, attendance) {
        res.send(attendance);
      }, (e) => {
        console.log(e);
        res.status(400).send(e);
      });
    }, (e) => {
      console.log(e);
      res.status(400).send(e);
    });
  } else {
    res.status(401)
  }
}

attendanceController.getAttendanceForTeacher = (req, res, next) => {
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.role;
  if(role === 'admin' || role === 'teacher') {
   
      Attendance.find({owner: decoded.bench_user_metadata.id})
      .populate('owner')
      .populate('grade')
      .populate('present')
      .populate('absent')
      .exec(function (err, results) {
           console.log("Attendance:   ",results);
           res.json(results);
      }, (e) => {
        console.log(e);
        res.status(400).send(e);
      });
    }
}


attendanceController.getAttendanceForParent = (req, res, next) => {
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.role;
  if(role === 'parent') {
    _getAllGrades().then((resp) => {
      let sudentGrades = _getGradeForStudent(resp, req.query.id)
        Attendance.find({grade: sudentGrades._id})
          .populate('owner')
          .populate('grade')
          .populate('present')
          .populate('absent')
          .exec(function (err, attendance) {
              console.log("Attendance:   ",attendance);
              res.send({attendance});
          }, (e) => {
            console.log(e);
            res.status(400).send(e);
          });
      })
    }
}


attendanceController.getAttendanceForStudent = (req, res, next) => {
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.role;
  if(role === 'student') {
    _getAllGrades().then((resp) => {
    let sudentGrades = _getGradeForStudent(resp, decoded.bench_user_metadata.id)
      Attendance.find({grade: sudentGrades._id})
        .populate('owner')
        .populate('grade')
        .populate('present')
        .populate('absent')
        .exec(function (err, attendance) {
            console.log("Attendance:   ",attendance);
            res.send({attendance});
        }, (e) => {
          console.log(e);
          res.status(400).send(e);
        });
    })
  }
}

  module.exports = attendanceController;