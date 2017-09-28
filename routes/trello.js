var express = require('express');
var request = require('request');
var router = express.Router();

const API_KEY = "1a0ad5b2cd7f611bc17fde490ebb6fc8";
const TOKEN = "f92f74e3497e65aee207a0e60538eb558717d20cf08a0b8f6a4943338c471745";

router.post('/webhook', function(req, res, next) {
  var url = "https://api.trello.com/1/tokens/" + TOKEN + '/webhooks/?key=' + API_KEY;
  var callbackURL = 'http://8c164596.ngrok.io/trelloCallback'
  var form = {
    description: 'My first webhook',
    callbackURL: callbackURL,
    idModel: req.body.id
  }
  request.post(url, {form: form}, function(err, res2, body) {
    if(err) {
      console.log(err);
    } else {
      console.log(res2);
      if(res2.statusCode === 200) {
        res.sendStatus(200);
      } else {
        console.log('error');
        res.json({error: res2});
      }
    }
  })
})

router.get('/boards', function(req, res, next) {
  var url = "https://api.trello.com/1/members/my/boards?fields=name,url&closed=true&key=" + API_KEY + "&token=" + TOKEN;
  request.get(url, function(err, res2, body) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(JSON.parse(body));
    }
  })
})

router.get('/board/:bid/cards', function(req, res, next) {
  var url = "https://api.trello.com/1/boards/" + req.params.bid + "/cards?fields=name,desc,due,url,labels,idChecklists&members=true&key=" + API_KEY + "&token=" + TOKEN;
  request.get(url, function(err, res2, body) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(JSON.parse(body));
    }
  })
})

router.get('/checklist/:cid', function(req, res, next) {
  var url = "https://api.trello.com/1/checklists/" + req.params.cid + "?fields=checkItems&key=" + API_KEY + "&token=" + TOKEN;
  request.get(url, function(err, res2, body) {
    if(err) {
      console.log(err);
    } else {
      res.json(JSON.parse(body));
    }
  })
})


module.exports = router;
