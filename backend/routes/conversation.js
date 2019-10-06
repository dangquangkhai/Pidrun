var express = require("express");
var router = express.Router();
var _provider = require("../db/provider/ConversationProvider");
const jwt = require("jsonwebtoken");
const validateUser = require("../lib/auth");

var config = require("../lib/config");
const path = require("path");
const sharp = require("sharp");

router.get("/getconv", validateUser.validateUser, (req, res, next) => {
  let userid = req.body.userId;
  let nextid = req.query.nextId;
  let length = 20;
  _provider.getConv(userid, nextid, length, obj => {
    res.json(obj);
  });
});

router.get("/defaultimage", (req, res, next) => {
  res.sendFile(
    path.resolve(__dirname, "../public/images/") + "/default-avatar.jpg"
  );
});

module.exports = router;
