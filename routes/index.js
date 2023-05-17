var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET redirect. */
router.get('/redir', function(req, res, next) {
  res.redirect('http://baidu.com')
});


module.exports = router;
