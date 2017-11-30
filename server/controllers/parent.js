var {mongoose} = require('./../db/mongoose');
var {Parent} = require('./../models/parent');
var jwtDecode = require('jwt-decode');

var parentController = {};

parentController.create = (req,res,next) => {
    console.log("here");
    var newParent = new Parent({
      parentId: req.body.parentId,
      children: req.body.children
    });
    console.log(newParent);

    newParent.save().then((doc) => {
        console.log(doc);
      res.send(doc);
    }, (e) => {
      console.log(e);
      res.status(400).send(e);
    });
   }

parentController.getChildren = (req,res,next) => {
    let decoded = jwtDecode(req.headers.id_token);
    let role = decoded.bench_app_metadata.role;
    if(role === 'parent') {
        Parent.findOne({parentId: decoded.bench_user_metadata.id})
        .populate('children')
        .exec(function (err, parent) {
            res.send(parent);
        }, (e) => {
          console.log(e);
          res.status(400).send(e);
        });
    }
}

parentController.getAttendance = (req,res,next) => {
    // let decoded = jwtDecode(req.headers.id_token);
    // let role = decoded.bench_app_metadata.role;
    // if(role === 'parent') {
    //     Parent.find({parentId: decoded.bench_user_metadata.id})
    //     .populate('children')
    //     .exec(function (err, parent) {
    //         res.send({parent});
    //     }, (e) => {
    //       console.log(e);
    //       res.status(400).send(e);
    //     });
    // }
}

module.exports = parentController;