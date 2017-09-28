var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('hi');
});

router.post('/', function(req, res, next) {
  const action = req.body.action;
  // if(action.type === 'commentCard') {
  //   console.log(action);
  // }
  console.log(action);
  res.end();
});

module.exports = router;
