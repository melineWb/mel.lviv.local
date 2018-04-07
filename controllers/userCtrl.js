// var Users = require('../models/users');
// var crypto = require('crypto');
// var flash = require('connect-flash');

exports.registration = function(req, res, next) {
  // var userNew = {
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: crypto.createHash('md5').update(req.body.password).digest('hex'),
  //   name: req.body.userfullname,
  //   role: 'user',
  //   img: '/img/user.png',
  //   results: [],
  //   certif: []
  // }
  //
  // var saveUser = true;
  //
  // Users.find().exec(
  //   function(err, _data) {
  //     for (var usItem in _data) {
  //       var itemCurnt = _data[usItem];
  //       if (userNew.username == itemCurnt.username) {
  //         saveUser = false;
  //         break;
  //       }
  //     }
  //     if (saveUser) {
  //       var dbUserCreate = new Users(userNew);
  //       dbUserCreate.save(function(err, user) {
  //         req.session.currentUser = user;
  //         res.redirect('/');
  //       });
  //     } else {
  //       req.flash('info', 'User with this login already exists');
  //       res.redirect('back');
  //     }
  //   }
  // );
};

// exports.login = function(req, res, next) {
//   var usernamel = req.body.username;
//   var password = req.body.password;
//
//   Users.findOne({
//     'username': usernamel
//   }).exec(
//     function(err, user) {
//       if (err || !user) {
//         return res.redirect('/login');
//         console.log(err);
//       }
//       if (user.password == crypto.createHash('md5').update(password).digest('hex')) {
//         req.session.currentUser = user;
//         res.redirect('/');
//       } else{
//         req.flash('info', 'User password or login incorrect');
//         res.redirect('back');
//       }
//     }
//   );
// };
//
// exports.getUsers = function(req, res, next) {
//   if (!req.session.currentUser) {
//     res.redirect('/login');
//   } else {
//     Users.find().exec(
//       function(err, _data) {
//         res.render('users', {
//           users: _data,
//           currentUser: req.session.currentUser
//         });
//       }
//     );
//   }
// };
//
// exports.userEdit = function(req, res, next) {
//   var currentUser = req.session.currentUser;
//
//   Users.findById(currentUser._id, function(err, user) {
//     user.username = req.body.username;
//     user.email = req.body.email;
//     user.name = req.body.userfullname;
//
//     if (req.body.password2 != '' && req.body.password3 != '') {
//       if (user.password == crypto.createHash('md5').update(req.body.password1).digest('hex')) {
//         if (req.body.password2 == req.body.password3) {
//           user.password = crypto.createHash('md5').update(req.body.password2).digest('hex');
//         }
//       }
//     }
//     // console.log(user);
//
//     user.save(function(err, _data) {
//       if (err) {
//         res.status(500).send(err);
//       }
//       req.session.currentUser = _data;
//       res.redirect('back');
//     });
//
//   });
// };
//
// exports.userRole = function(req, res, next) {
//   Users.findById(req.params.idUser, function(err, user) {
//     user.role = req.body.roleselect;
//     user.save(function(err, _data) {
//       if (err) {
//         res.status(500).send(err)
//       }
//       res.redirect('back');
//     });
//   })
// };
