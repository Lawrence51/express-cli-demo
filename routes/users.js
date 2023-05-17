var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/show', function(req, res, next) {
  res.send('show respond with a resource');
});

router.post('/add', function(req, res, next) {
  const str = JSON.stringify({
    res: 'ok'
  })
  res.send(str);
});

module.exports = router;
