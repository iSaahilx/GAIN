"use strict";

var express = require('express');

var passport = require('../Auth/googleAuth'); // Adjust the path as needed


var router = express.Router();
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), function (req, res) {
  res.redirect('/login/success'); // Redirect to login success route
});
router.get("/login/success", function (req, res) {
  if (req.user) {
    res.status(200).json({
      message: "User logged in",
      user: req.user
    });
  } else {
    res.status(400).json({
      message: "Not authorized"
    });
  }
});
module.exports = router;