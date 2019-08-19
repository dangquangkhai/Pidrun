var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/movie", (req, res, next) => {
  res.json({success: true, content: "OK WORLd"});
})

module.exports = router;
