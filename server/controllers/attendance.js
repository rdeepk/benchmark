var { mongoose } = require('./../db/mongoose');
var { Attendance } = require('./../models/attendance');
var jwtDecode = require('jwt-decode');

var attendanceController = {};

attendanceController.create = (req, res, next) => {
  console.log(":create attendance");
  // console.log(req.body);
  let decoded = jwtDecode(req.headers.id_token);
  console.log(decoded.bench_user_metadata.id)
  let role = decoded.bench_app_metadata.role;
  if(role === 'admin' || role === 'teacher') {
    let attendance = req.body;
    attendance.owner = decoded.bench_user_metadata.id;
    console.log(attendance);
    var newAttendance = new Attendance(attendance);
    newAttendance.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      console.log(e);
      res.status(400).send(e);
    });
  } else {
    res.status(401)
  }
}

  module.exports = attendanceController;