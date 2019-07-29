var express = require('express');
var router = express.Router();

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

module.exports = router;