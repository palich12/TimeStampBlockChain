// This router is just a simple proxy between application and node's public API
const HOST = "http://167.99.130.47:8064"
var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/*', function(req, res, next) {
  var query = req.params[0];

  request.get({
    qs: req.query,
    url: HOST + '/api/' + query,
  }, function(err, response, body) {
    if (err) {
      return next(err);
    }
    try {
      res.json(JSON.parse(body));
    } catch (e) {
      res.json({});
    }
  });
});

router.post('/*', function(req, res, next) {
  var query = req.params[0];

  request.post({
      json: req.body,
      url: HOST + '/api/' + query,
    },
    function(err, response, body) {
      if (err) {
        return next(err);
      }
      res.json(body);
    });
});

module.exports = router;
