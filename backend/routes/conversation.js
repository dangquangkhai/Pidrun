var express = require("express");
var router = express.Router();
var _provider = require("../db/provider/ConversationProvider");
const jwt = require("jsonwebtoken");
const validateUser = require("../lib/auth");

var config = require("../lib/config");
const path = require("path");
const sharp = require("sharp");
const utils = require("../lib/utils");

router.post("/getconv", validateUser.validateUser, (req, res, next) => {
  let userid = req.body.userId;
  let nextid = req.body.nextId;
  let length = 20;
  _provider.getConv(userid, nextid, length, obj => {
    res.json(obj);
  });
});

router.post("/getmess", validateUser.validateUser, (req, res, next) => {
  let conid = req.body.conId;
  let messid = req.body.messId;
  let length = 20;
  _provider
    .getMessage(conid, messid, length)
    .then(val => {
      res.json(val);
    })
    .catch(err => {
      if (err !== undefined && err !== null) {
        console.log(err);
      }
      res.json({ success: false, content: "Something wrong happen" });
    });
});

router.get("/getusrimage/:url", (req, res, next) => {
  let encodedUrl = req.params.url;
  let decodeUrl = utils.decodeUrl(encodedUrl);
  res.sendfile(decodeUrl);
});

router.get("/users/:userId/books/:bookId", function(req, res) {
  res.send(req.params);
});
router.get("/defaultimage", (req, res, next) => {
  res.sendFile(
    path.resolve(__dirname, "../public/images/") + "/default-avatar.jpg"
  );
});

module.exports = router;
