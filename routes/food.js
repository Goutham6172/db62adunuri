var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('food', { title: "food Search Results" });
});

module.exports = router;
