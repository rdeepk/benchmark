var { mongoose } = require('./../db/mongoose');
var { Attendance } = require('./../models/attendance');
var jwtDecode = require('jwt-decode');

var attendanceController = {};

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

attendanceController.create = (req, res, next) => {
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.role;
  if(role === 'admin' || role === 'teacher') {
    let attendance = req.body;
    attendance.owner = decoded.bench_user_metadata.id;
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

attendanceController.getAttendanceForToday = (req, res, next) => {
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.role;
  if(role === 'admin' || role === 'teacher') {
    // Attendance.find({date: _getCurrentDate()}).then((data) => {
      Attendance.find({owner: decoded.bench_user_metadata.id})
      .populate('owner')
      .populate('present')
      .populate('absent')
      .exec(function (err, results) {
           console.log(results);
           res.json(results);
      }, (e) => {
        console.log(e);
        res.status(400).send(e);
      });
      
      
    }
}

  module.exports = attendanceController;