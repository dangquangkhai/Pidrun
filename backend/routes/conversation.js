var express = require("express");
var router = express.Router();
var _provider = require("../db/provider/ConversationProvider");
const jwt = require("jsonwebtoken");
const validateUser = require("../lib/auth");

module.exports = router;
