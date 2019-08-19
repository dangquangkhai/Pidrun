var express = require('express');
var router = express.Router();
var _provider = require("../db/provider/UserProvider");
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get("/hello", (req, res) => {
  res.json({
    success: "true",
    content: "OK"
  });
})

router.get("/api", (req, res) => {
  res.json({
    success: false
  });
})

router.get("/user", (req, res) => {
  let email = req.query.email;
  var find = _provider.findUsrByEmail(email);
  find.then(val => {
    res.json({
      success: true,
      cotnent: val
    });
  })

})

router.post("/createUser", (req, res) => {
  try {
    var create = _provider.createUser(req.body.user);
  } catch (error) {

  }
})

router.get("/template", (req, res) => {

});

module.exports = router;