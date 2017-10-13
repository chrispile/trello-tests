var express = require('express');
var router = express.Router();
var handler = require('../WebhookHandler');

router.get('/', function(req, res, next) {
  res.send('hi');
});

router.post('/', function(req, res, next) {
  const action = req.body.action;
  console.log(handler(action));
  res.end();
});

module.exports = router;
