var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hi');
});
router.post('/', function(req, res, next) {
  const action = req.body.action;
  console.log(action);
  // const data = JSON.parse(req);
  // console.log(data.action);
  res.send('hi');
});

module.exports = router;
