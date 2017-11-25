
var {mongoose} = require('./../db/mongoose');
var {User} = require('./../models/user');
var request = require("request-promise");
var jwtDecode = require('jwt-decode');

var token;
var userController = {};

isTokenValid = (token) => {
  if (!token) {
    return false;
  } 
  let decoded = jwtDecode(token);
  let cTs = Math.floor(Date.now() / 1000);
  console.log(decoded.exp>=cTs)
  return (decoded.exp>=cTs);
}

getToken = () => {
      var options = { method: 'POST',
      uri: 'https://bench.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: 
      { grant_type: 'client_credentials',
        client_id: '9UEtyOoCazl0pohRwAja0DlV3hfPd6L2',
        client_secret: 'NZxJrJm_rC1JqVy8ZOuL5pzL5Hs-DU5Ae0GUFS5HF-v0qPAXIejiKBQmqNMvql8V',
        audience: 'https://bench.auth0.com/api/v2/' },
      json: true };
    
    return request(options); 
}

saveUserInAuth0 = (doc) => {
  var options = { method: 'POST',
  url: 'https://bench.auth0.com/api/v2/users',
  headers: { 
    'authorization': `Bearer ${token}`,
    'content-type': 'application/json'
  },
  body: {
    app_metadata: {'roles':['teacher']},
    user_metadata: {id: doc._id,},
    email: doc.email,
    email_verified: false,
    connection: "Initial-Connection",
    password: ""
  },
  json: true };
  console.log(options);
  request(options)
    .then((body)=> {
      console.log(body);
    })
    .catch(function (error) {
      console.log(error);
    });
}

setUserForAuth0 = (doc) => {
  if(!isTokenValid(token)) {
    getToken()
    .then((body) => {
      token = body.access_token;
      console.log(token);
      saveUserInAuth0(doc);
    })
    .catch(function (error) {
      console.log(error);
    });
  } else {
    saveUserInAuth0(doc);
  }
}



userController.create = (req,res,next) => {
    var newUser = new User({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email
    });

    let doc = { '__v': 0,
    name: 'Chris',
    role: '5a18653fce51ea1a53173f5b',
    email: 'rdeepk+t4@gmail.com',
    _id: '5a18a26b38051d7d7fa0fc21' }

    newUser.save().then((doc) => {
      setUserForAuth0(doc);
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
   }

module.exports = userController;