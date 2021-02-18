const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;

  // Username
  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      return res.json({
        status: 400,
        message: err,
        data: null,
      });
    }
    if (user) {
      return res.json({
        status: 200,
        message: "username đã tồn tại",
        data: null,
      });
    }
  });

  // Email
  User.findOne({ email: email }).exec((err, user) => {
    if (err) {
      return res.json({
        status: 400,
        message: err,
        data: null,
      });
    }

    if (user) {
      return res.json({
        status: 200,
        message: "email đã tồn tại",
        data: null,
      });
    }

    next();
  });
};

const checkRolesExited = (req, res, next) => {
  if (req.body.roles) {
    req.body.roles.map((role) => {
      if (!ROLES.includes(role)) {
        return res.json({
          status: 400,
          message: `Role ${role} does not existed`,
          data: null,
        });
      }
    });
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExited,
};

module.exports = verifySignUp;
