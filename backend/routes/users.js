var express = require('express');
var router = express.Router();

var _provider = require("../db/provider/UserProvider");
var fs = require('fs');
var config = require("../lib/config");
const path = require("path");


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get("/movie", (req, res, next) => {
  res.json({
    success: true,
    content: "OK WORLd"
  });
})

router.post("/userinfo", (req, res, next) => {
  var userid = req.body.userId;
  _provider.findUsrById(userid).then(val => {
    val.password = "";
    return res.json({
      success: true,
      content: val
    });
  }).catch(err => {
    return res.json({
      success: false,
      content: err
    });
  });
});

router.get("/getusrimage", (req, res, next) => {
  var userid = req.body.userId;
  _provider.findUsrById(userid).then(val => {
    if (val !== null && val !== undefined ) {
      if (val.image !== null && val.image !== undefined) {
        console.log("User");
        fs.readFile(config.server_path.Img_Att + val.image,(err, data) => {
          return data;
        }).then(val => {
          res.sendFile(val);
        }).catch(err => {
          res.send("");

          
        })
      }
      else{
        res.sendFile(path.resolve(__dirname, "../public/images/") + "/default-avatar.jpg");
      }
    }
    else
    {
      res.send("");
    }
  }).catch(err => {
    res.send("");
  });
});

module.exports = router;
