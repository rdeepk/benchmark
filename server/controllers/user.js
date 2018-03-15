
var {mongoose} = require('./../db/mongoose');
var {User} = require('./../models/user');
var {Role} = require('./../models/role');
var request = require("request-promise");
var jwtDecode = require('jwt-decode');

var token;
var userController = {};

 /*
 *  Check if the token for auth0 is valid or expired.
 */
isTokenValid = (token) => {
  if (!token) {
    return false;
  } 
  let decoded = jwtDecode(token);
  let cTs = Math.floor(Date.now() / 1000);
  console.log(decoded.exp>=cTs)
  return (decoded.exp>=cTs);
}

 /*
 *  Get token for auth0.
 */
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

 /*
 *  Saves the user in auth0.
 */
saveUserInAuth0 = (doc) => {
  Role.findOne({_id: doc.role}).then((role) => {
    let options = { method: 'POST',
    url: 'https://bench.auth0.com/api/v2/users',
    headers: { 
      'authorization': `Bearer ${token}`,
      'content-type': 'application/json'
    },
    body: {
      app_metadata: {'role':role.name},
      user_metadata: {id: doc._id,},
      email: doc.email,
      email_verified: false,
      connection: "Initial-Connection",
      password: "12345",
      given_name: doc.name
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
  }, (e) => {
    res.status(400).send(e);
  });
}

 /*
 *  Makes the data for saving user in auth0.
 */
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


 /*
 *  Save new user.
 */
userController.create = (req,res,next) => {
    var newUser = new User({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email
    });

    newUser.save().then((doc) => {
      setUserForAuth0(doc);
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
   }

/*
*	Returns the links to be displayed as per the access level of user to the client.
*/
userController.getLinks = (req,res,next) => {
  let decoded = jwtDecode(req.headers.id_token);
  let role = decoded.bench_app_metadata.role;
  let links;
  switch(role) {
    case 'teacher':
    case 'admin':
      links = {
        role: 'teacher',
        grades: '/teacher/grades',
        students: '/grades/students',
        attendance: '/students/attendance'
      }
      break;
      case 'parent':
      links = {
        role: 'parent',
        students: '/parents/students',
        attendance: '/students/attendance'
      }
      break;
      case 'student':
      links = {
        role: 'student',
        attendance: '/students/attendance'
      }
      break;
  }
    res.send(links);
  
}


 /*
 *  Wrapper to save multiple users in auth0.
 */
userController.SaveAllUsersInAuth0 = (req, res, next) => {
  User.find().then((users) => {
   users.forEach((user, i) => {
      setUserForAuth0(user);
   })
  });
}

 /*
 *  Returns user with the given id.
 */
userController.getUserById = (req, res, next) => {
  User.findOne({_id: req.query.id})
  .then((user) => {
    res.send(user);
  }, (e) => {
    res.status(400).send(e);
  });
}

module.exports = userController;