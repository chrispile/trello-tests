var express = require('express');
var request = require('request');
var router = express.Router();

const API_KEY = "e0cc36f6242b224670b1fd34f84ad3a7";
const TOKEN = "07caf9ef1fc1d0f49efc25726e14c95fd8bce098f516cb7dbd705045088c4208";

router.post('/webhook', function(req, res, next) {
  var url = "https://api.trello.com/1/tokens/" + TOKEN + '/webhooks/?key=' + API_KEY;
  var callbackURL = 'http://c480c6c8.ngrok.io/trelloCallback' //CHANGE THIS
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
  });
});

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

router.put('/')

module.exports = router;
